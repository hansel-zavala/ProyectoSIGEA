import prisma from "@/lib/prisma";

// Importa el componente FormModal para mostrar formularios modales
import FormModal from "./FormModal";

// Importa la función de autenticación del servidor con Clerk
import { auth } from "@clerk/nextjs/server";

// Define el tipo de las props que recibe el componente FormContainer
export type FormContainerProps = {
    // Define las tablas permitidas para el formulario
    table:
    | "maestro"
    | "alumno"
    | "padre"
    | "evento"
    // Define los tipos de operación permitidos
    type: "create" | "update" | "delete";
    // Datos opcionales para prellenar el formulario
    data?: any;
    // ID opcional (para update o delete)
    id?: number | string;
};

// Componente asíncrono que maneja datos y muestra el FormModal
const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {

    // Objeto para guardar datos relacionados necesarios para formularios
    let relatedData = {};

    // Obtiene información del usuario autenticado (id y claims)
    const { userId, sessionClaims } = auth();

    // Extrae el rol del usuario desde los metadata del sessionClaims
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    // Guarda el id actual del usuario
    const currentUserId = userId;

    // Si la operación NO es eliminar, busca datos relacionados según la tabla
    if (type !== "delete") {
        switch (table) {
            // Si la tabla es alumno, busca maestros activos para el formulario
            case "alumno":
                // Consulta a Prisma para obtener maestros con estado "activo"
                const maestros = await prisma.maestro.findMany({
                    where: { estado: "activo" },
                    select: {
                        id: true,
                        nombre: true,
                        apellido: true,
                        tipo_profesional: true
                    },
                });
                // Guarda los maestros en relatedData para pasarlos al formulario
                relatedData = { maestros };
                break;

            // Para maestro no se agrega data relacionada (por ahora)
            case "maestro":
                // Se puede agregar data relacionada si es necesario
                break;

            // Para padre no se agrega data relacionada (por ahora)
            case "padre":
                // Se puede agregar data relacionada si es necesario
                // const alumno = await prisma.alumno.findMany({
                //     select:{
                //         id: true,
                //         nombre: true,
                //         apellido: true
                //     }
                // })
                // relatedData = { alumno }
                break;

            // Default en caso de tabla no contemplada
            default:
                break;
        }
    }

    // Retorna el componente FormModal con los props recibidos y los datos relacionados
    return (
        <div className="">
            <FormModal
                table={table}
                type={type}
                data={data}
                id={id}
                relatedData={relatedData}
            />
        </div>
    );
};

// Exporta el componente para usarlo en otras partes
export default FormContainer;