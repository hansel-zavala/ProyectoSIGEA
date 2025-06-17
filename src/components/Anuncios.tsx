import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Anuncios = async () => {
    const { userId, sessionClaims } = auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    // // Define role-based conditions that match your database structure
    // const roleConditions = {
    //     // Teachers see events related to students they work with
    //     teacher: {
    //         OR: [
    //             // Students where they are the current teacher
    //             { alumno: { some: { maestro_actual_id: userId! } } },
    //             // Students they have sessions with
    //             { sesiones: { some: { maestro_id: userId! } } },
    //             // Students they have scheduled sessions with
    //             { horario_sesiones: { some: { maestro_id: userId! } } }
    //         ]
    //     },
    //     // Students see events where they might be involved
    //     student: {
    //         OR: [
    //             // Events related to their sessions
    //             { sesiones: { some: { alumno_id: userId! } } },
    //             // Events related to their scheduled sessions
    //             { horario_sesiones: { some: { alumno_id: userId! } } }
    //         ]
    //     },
    //     // Parents see events related to their children
    //     parent: {
    //         alumno_padre: {
    //             some: {
    //                 padre_id: userId!
    //             }
    //         }
    //     }
    // };

    // Fetch events instead of announcements
    // const data = await prisma.eventos.findMany({
    //     take: 3,
    //     orderBy: { fecha_inicio: "desc" },
    //     where: {
    //         // Only show confirmed or completed events, not cancelled ones
    //         estado: { in: ["confirmado", "en_progreso", "completado"] },
    //         // Apply role-based filtering for non-admins
    //         ...(role !== "admin" && {
    //             OR: [
    //                 // Public events visible to everyone
    //                 { es_publico: true },
    //                 // Role-specific events based on the conditions above
    //                 ...(roleConditions[role as keyof typeof roleConditions] ? [roleConditions[role as keyof typeof roleConditions]] : [])
    //             ]
    //         })
    //     },
    //     // Include the admin who created the event
    //     include: {
    //         creado_por_admin: {
    //             select: {
    //                 nombre: true,
    //                 apellido: true
    //             }
    //         }
    //     }
    // });

    const data = await prisma.eventos.findMany()

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Eventos Proximos</h1>
                <span className="text-xs text-gray-400">Ver Todos</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                {data[0] && (
                    <div className="bg-lamaSkyLight rounded-md p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-medium">{data[0].titulo}</h2>
                            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                                {new Intl.DateTimeFormat("en-GB").format(data[0].fecha_inicio)}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{data[0].descripcion}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            Type: {data[0].tipo_evento.replace(/_/g, ' ')}
                        </p>
                        {data[0].lugar && (
                            <p className="text-xs text-gray-500">Location: {data[0].lugar}</p>
                        )}
                    </div>
                )}
                {data[1] && (
                    <div className="bg-lamaPurpleLight rounded-md p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-medium">{data[1].titulo}</h2>
                            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                                {new Intl.DateTimeFormat("en-GB").format(data[1].fecha_inicio)}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{data[1].descripcion}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            Type: {data[1].tipo_evento.replace(/_/g, ' ')}
                        </p>
                        {data[1].lugar && (
                            <p className="text-xs text-gray-500">Location: {data[1].lugar}</p>
                        )}
                    </div>
                )}
                {data[2] && (
                    <div className="bg-lamaYellowLight rounded-md p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-medium">{data[2].titulo}</h2>
                            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                                {new Intl.DateTimeFormat("en-GB").format(data[2].fecha_inicio)}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{data[2].descripcion}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            Type: {data[2].tipo_evento.replace(/_/g, ' ')}
                        </p>
                        {data[2].lugar && (
                            <p className="text-xs text-gray-500">Location: {data[2].lugar}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Anuncios;