import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Paginacion";
import Table from "@/components/Tabla";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { padre, Prisma } from "@prisma/client";
import Image from "next/image";

import { auth } from "@clerk/nextjs/server";

type ListaPadre = padre

const PaginaListaPadre = async ({
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
            header: "Telefono",
            accessor: "telefono",
            className: "hidden md:table-cell",
        },
        {
            header: "Documento de ID",
            accessor: "documentoId",
            className: "hidden lg:table-cell",
        },
        {
            header: "Estado",
            accessor: "estado",
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

    const renderRow = (item: ListaPadre) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            {/* {Mostrar informacion general del padre} */}
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.nombre} {item.apellido}</h3>
                    {item.email && (
                        <p className="text-xs text-gray-500">{item.email}</p>
                    )}
                    {/* {item.tipo_parentesco && (
                        <p className="text-xs text-gray-400 capitalize">{item.tipoParentesco}</p>
                    )} */}
                </div>
            </td>

            {/* Mostar telefonos */}
            <td className="hidden lg:table-cell">
                <div className="flex flex-col gap-1 text-xs">
                    <span className="font-medium">Telefono Movil: </span>
                    <span>{item.telefono_movil}</span>
                </div>
            </td>
            <td className="hidden lg:table-cell">
                <div className="flex flex-col gap-1 text-xs">
                    <span>{item.documento_identidad}</span>
                </div>
            </td>
            <td className="hidden lg:table-cell">
                <div className="flex flex-col gap-1 text-xs">
                    <span>{item.activo === true ? "Activo" : "Inactivo"}</span>
                </div>
            </td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" && (
                        <>
                            <FormContainer table="padre" type="update" data={item} />
                            <FormContainer table="padre" type="delete" id={item.id} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    // URL PARAMS CONDITION

    const query: Prisma.padreWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        query.OR = [
                            { nombre: { contains: value } },
                            { apellido: { contains: value } },
                            { email: { contains: value } }
                        ];
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [data, count] = await prisma.$transaction([
        prisma.padre.findMany({
            where: query,
            // include: {
            //     alumnoPadreRelaciones: {
            //         include: {
            //             alumno: true,
            //         },
            //     },
            //     direccionCasa: true,    // Fixed: Include home address
            //     direccionTrabajo: true, // Fixed: Include work address
            // },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.padre.count({ where: query }),
    ]);

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Todos los padres</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                        {role === "admin" && <FormContainer table="padre" type="create" />}
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

export default PaginaListaPadre;