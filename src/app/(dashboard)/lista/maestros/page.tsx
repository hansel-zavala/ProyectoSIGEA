import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Paginacion";
import Table from "@/components/Tabla";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import {maestro, Prisma,} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";

// Fixed type definition
type ListaMaestro = maestro

const PaginaListaMaestro = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const { sessionClaims } = auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    const columns = [
        {
            header: "Info",
            accessor: "info",
        },
        {
            header: "Teacher ID",
            accessor: "teacherId",
            className: "hidden md:table-cell",
        },
        {
            header: "Tipo Profesional",
            accessor: "tipoProfesional",
            className: "hidden md:table-cell",
        },
        {
            header: "Licencia",
            accessor: "licencia",
            className: "hidden md:table-cell",
        },
        {
            header: "Phone",
            accessor: "phone",
            className: "hidden lg:table-cell",
        },
        {
            header: "Address",
            accessor: "address",
            className: "hidden lg:table-cell",
        },
        ...(role === "admin"
            ? [
                {
                    header: "Actions",
                    accessor: "action",
                },
            ]
            : []),
    ];

    const renderRow = (item: ListaMaestro) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className="flex items-center gap-4 p-4">
                {/* <Image
                    src={item.imagen || "/noAvatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
                /> */}
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.nombre} {item.apellido}</h3>
                    <p className="text-xs text-gray-500">{item?.email}</p>
                    <p className="text-xs text-gray-400 capitalize">{item.estado}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.idusuario}</td>
            <td className="hidden md:table-cell">
                <span className="capitalize">{item.tipo_profesional}</span>
            </td>
            {/* <td className="hidden md:table-cell">
                {item.num || (
                    <span className="text-gray-400 italic text-xs">No license</span>
                )}
            </td> */}
            {/* Fixed phone display */}
            {/* <td className="hidden lg:table-cell">
                <div className="flex flex-col gap-1 text-xs">
                    {item.telefonoMovil && (
                        <div>
                            <span className="font-medium">Mobile:</span> {item.telefonoMovil}
                        </div>
                    )}
                    {item.telefonoTrabajo && (
                        <div>
                            <span className="font-medium">Work:</span> {item.telefonoTrabajo}
                        </div>
                    )}
                    {!item.telefonoMovil && !item.telefonoTrabajo && (
                        <span className="text-gray-400 italic">No phone</span>
                    )}
                </div>
            </td> */}
            {/* Fixed address display */}
            {/* <td className="hidden lg:table-cell">
                <div className="text-xs">
                    {item.direccion ? (
                        <div>
                            <p>{item.direccion.direccionCompleta}</p>
                            {item.direccion.ciudad && item.direccion.departamento && (
                                <p className="text-gray-500">
                                    {item.direccion.ciudad}, {item.direccion.departamento}
                                </p>
                            )}
                            {item.direccion.tipoDireccion && (
                                <p className="text-gray-400 capitalize">
                                    {item.direccion.tipoDireccion}
                                </p>
                            )}
                        </div>
                    ) : (
                        <span className="text-gray-400 italic">No address</span>
                    )}
                </div>
            </td> */}
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/lista/maestros/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                            <Image src="/view.png" alt="" width={16} height={16} />
                        </button>
                    </Link>
                    {role === "admin" && (
                        <>
                            <FormContainer table="maestro" type="update" data={item} />
                            <FormContainer table="maestro" type="delete" id={item.id} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    // URL PARAMS CONDITION
    const query: Prisma.maestroWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        query.OR = [
                            { nombre: { contains: value } },
                            { apellido: { contains: value } },
                            { email: { contains: value } },
                            { idusuario: { contains: value } }
                        ];
                        break;
                    case "tipoProfesional":
                        query.tipo_profesional = value as any;
                        break;
                    case "estado":
                        query.estado = value as any;
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [data, count] = await prisma.$transaction([
        prisma.maestro.findMany({
            where: query,
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.maestro.count({ where: query }),
    ]);

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
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
                            <FormContainer table="maestro" type="create" />
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

export default PaginaListaMaestro;