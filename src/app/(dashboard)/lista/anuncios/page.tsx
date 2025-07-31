import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Paginacion";
import Table from "@/components/Tabla";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { eventos, Prisma } from "@prisma/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

type ListaAnuncios = eventos;

const ListaAnunciosPage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    // Get user authentication info - we only need the role for admin actions
    const { sessionClaims } = auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    // Define table columns
    const columns = [
        {
            header: "Título",
            accessor: "titulo",
        },
        {
            header: "Descripción",
            accessor: "descripcion",
            className: "hidden md:table-cell",
        },
        {
            header: "Fecha Inicio",
            accessor: "fecha_inicio",
            className: "hidden md:table-cell",
        },
        {
            header: "Fecha Fin",
            accessor: "fecha_fin",
            className: "hidden lg:table-cell",
        },
        // Only show actions column for admins
        ...(role === "admin"
            ? [
                {
                    header: "Acciones",
                    accessor: "action",
                },
            ]
            : []),
    ];

    // Define how each row should be rendered
    const renderRow = (item: ListaAnuncios) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className="p-4 font-medium">{item.titulo}</td>
            <td className="hidden md:table-cell p-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                    {item.descripcion || "Sin descripción"}
                </p>
            </td>
            <td className="hidden md:table-cell p-4">
                {new Intl.DateTimeFormat("es-HN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }).format(item.fecha_inicio)}
            </td>
            <td className="hidden lg:table-cell p-4">
                {item.fecha_fin ? (
                    new Intl.DateTimeFormat("es-HN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    }).format(item.fecha_fin)
                ) : (
                    <span className="text-gray-400">Sin fecha fin</span>
                )}
            </td>
            <td className="p-4">
                <div className="flex items-center gap-2">
                    {role === "admin" && (
                        <>
                            <FormContainer table="evento" type="update" data={item} />
                            <FormContainer table="evento" type="delete" id={item.id} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    // Extract page number and other query parameters
    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    // Build the query object for filtering
    const query: Prisma.eventosWhereInput  = {};

    // Apply search filter if provided
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        // Search in both title and description
                        query.OR = [
                            { titulo: { contains: value } },
                            { descripcion: { contains: value} }
                        ];
                        break;
                    default:
                        break;
                }
            }
        }
    }

    // Fetch announcements and count in a single transaction
    const [data, count] = await prisma.$transaction([
        prisma.eventos.findMany({
            where: query,
            orderBy: { fecha_inicio: "desc" }, // Show newest announcements first
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.eventos.count({ where: query }),
    ]);

    console.log(data)

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">
                    Todos los Anuncios
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                        {role === "admin" && (
                            <FormContainer table="evento" type="create" />
                        )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/* PAGINATION */}
            <Pagination page={p} count={count} />
        </div>
    );
};

export default ListaAnunciosPage;