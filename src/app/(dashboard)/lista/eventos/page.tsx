import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Paginacion";
import Table from "@/components/Tabla";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { eventos, Prisma } from "@prisma/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

// Change the type to match your actual table
type ListaEventos = eventos & {
    creado_por_admin: {
        nombre: string;
        apellido: string;
    } | null;
};

const PaginaListaEventos = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    // Get user authentication info - we only need the role for admin actions
    const { sessionClaims } = auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    // Define table columns to match your eventos table structure
    const columns = [
        {
            header: "Título",
            accessor: "titulo",
        },
        {
            header: "Tipo",
            accessor: "tipo_evento",
            className: "hidden md:table-cell",
        },
        {
            header: "Fecha Inicio",
            accessor: "fecha_inicio",
            className: "hidden md:table-cell",
        },
        {
            header: "Estado",
            accessor: "estado",
            className: "hidden lg:table-cell",
        },
        {
            header: "Lugar",
            accessor: "lugar",
            className: "hidden xl:table-cell",
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

    // Helper function to format event type for display
    const formatEventType = (tipo: string) => {
        const typeMap: { [key: string]: string } = {
            'reunion_padres': 'Reunión de Padres',
            'capacitacion_maestros': 'Capacitación',
            'evaluacion_grupal': 'Evaluación Grupal',
            'actividad_recreativa': 'Actividad Recreativa',
            'conferencia': 'Conferencia',
            'taller': 'Taller',
            'otro': 'Otro'
        };
        return typeMap[tipo] || tipo;
    };

    // Helper function to get status color
    const getStatusColor = (estado: string) => {
        const colors: { [key: string]: string } = {
            'planificado': 'bg-blue-100 text-blue-800',
            'confirmado': 'bg-green-100 text-green-800',
            'en_progreso': 'bg-yellow-100 text-yellow-800',
            'completado': 'bg-gray-100 text-gray-800',
            'cancelado': 'bg-red-100 text-red-800'
        };
        return colors[estado] || 'bg-gray-100 text-gray-800';
    };

    // Define how each row should be rendered
    const renderRow = (item: ListaEventos) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className="p-4">
                <div>
                    <p className="font-medium">{item.titulo}</p>
                    {item.descripcion && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                            {item.descripcion}
                        </p>
                    )}
                </div>
            </td>
            <td className="hidden md:table-cell p-4">
                <span className="text-sm">
                    {formatEventType(item.tipo_evento)}
                </span>
            </td>
            <td className="hidden md:table-cell p-4">
                <div>
                    <p className="text-sm">
                        {new Intl.DateTimeFormat("es-HN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }).format(item.fecha_inicio)}
                    </p>
                    <p className="text-xs text-gray-500">
                        {new Intl.DateTimeFormat("es-HN", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }).format(item.fecha_inicio)}
                    </p>
                </div>
            </td>
            <td className="hidden lg:table-cell p-4">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.estado!)}`}>
                    {(item.estado ?? "")
                        ? (item.estado ?? "").charAt(0).toUpperCase() + (item.estado ?? "").slice(1).replace(/_/g, ' ')
                        : ""}
                </span>
            </td>
            <td className="hidden xl:table-cell p-4">
                <p className="text-sm text-gray-600">
                    {item.lugar || <span className="text-gray-400">Sin definir</span>}
                </p>
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
    const query: Prisma.eventosWhereInput = {
        // Only show public events to non-admins
        ...(role !== "admin" && { es_publico: true }),
        // Don't show cancelled events unless user is admin
        ...(role !== "admin" && {
            estado: {
                not: "cancelado"
            }
        })
    };

    // Apply search filter if provided
    if (queryParams.search) {
        query.AND = [
            {
                OR: [
                    { titulo: { contains: queryParams.search} },
                    { descripcion: { contains: queryParams.search} },
                    { lugar: { contains: queryParams.search} }
                ]
            }
        ];
    }

    try {
        // Fetch events and count in a single transaction
        const [data, count] = await prisma.$transaction([
            prisma.eventos.findMany({
                where: query,
                
                orderBy: { fecha_inicio: "desc" }, // Show newest events first
                take: ITEM_PER_PAGE,
                skip: ITEM_PER_PAGE * (p - 1),
            }),
            prisma.eventos.count({ where: query }),
        ]);

        console.log(`Found ${count} events, displaying ${data.length} on page ${p}`);

        return (
            <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
                {/* TOP */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="hidden md:block text-lg font-semibold">
                        Eventos y Anuncios
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

                {/* Show message if no data */}
                {data.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No hay eventos disponibles en este momento.</p>
                        {role === "admin" && (
                            <p className="text-sm text-gray-400 mt-2">
                                Crea un nuevo evento usando el botón de arriba.
                            </p>
                        )}
                    </div>
                ) : (
                    <>
                        {/* LIST */}
                        <Table columns={columns} renderRow={renderRow} data={data} />
                        {/* PAGINATION */}
                        <Pagination page={p} count={count} />
                    </>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error fetching eventos:", error);

        return (
            <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
                <div className="text-center py-8">
                    <p className="text-red-500">Error al cargar los eventos.</p>
                    <p className="text-sm text-gray-400 mt-2">
                        Por favor, verifica la conexión a la base de datos.
                    </p>
                </div>
            </div>
        );
    }
};

export default PaginaListaEventos;