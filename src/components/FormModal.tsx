// Declara que este componente se ejecuta del lado del cliente en Next.js
"use client";
// Importa la función para eliminar un alumno desde las acciones personalizadas
import {
    deleteAlumno,
    deletePadre,
    deleteMaestro, // Add this import
} from "@/lib/actions";
// Importa el método para carga dinámica de componentes (lazy loading)
import dynamic from "next/dynamic";
// Importa el componente de imagen optimizada de Next.js
import Image from "next/image";
// Importa el enrutador de Next.js para navegación y refresco
import { useRouter } from "next/navigation";
// Importa hooks de React para manejar estado y efectos
import { Dispatch, SetStateAction, useEffect, useState } from "react";
// Hook de React para manejar el estado del formulario con actions de servidor
import { useFormState } from "react-dom";
// Importa la librería de notificaciones tipo toast
import { toast } from "react-toastify";
// Importa los tipos de props desde el componente FormContainer
import { FormContainerProps } from "./FormContainer";

// Mapea los tipos de tabla con su acción de eliminación correspondiente
const deleteActionMap = {
    alumno: deleteAlumno,
    maestro: deleteMaestro, // Fixed: use deleteMaestro instead of deleteAlumno
    padre: deletePadre,
    evento: deleteAlumno,
};

// Carga dinámica (lazy loading) del formulario del alumno
const AlumnoForm = dynamic(() => import("./forms/AlumnoForm"), {
    // Mientras carga, muestra este mensaje
    loading: () => <h1>Loading...</h1>,
});
const PadreForm = dynamic(() => import("./forms/PadreForm"), {
    // Mientras carga, muestra este mensaje
    loading: () => <h1>Loading...</h1>,
});
const MaestroForm = dynamic(() => import("./forms/MaestroForm"), { // Add MaestroForm import
    // Mientras carga, muestra este mensaje
    loading: () => <h1>Loading...</h1>,
});

// Objeto que contiene las funciones para renderizar los formularios por tipo de entidad
const forms: {
    [key: string]: (
        setOpen: Dispatch<SetStateAction<boolean>>,
        type: "create" | "update",
        data?: any,
        relatedData?: any
    ) => JSX.Element;
} = {
    alumno: (setOpen, type, data, relatedData) => (
        <AlumnoForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    padre: (setOpen, type, data, relatedData) => (
        <PadreForm
            type={type}
            data={data}
            setOpen={setOpen}
            // relatedData={relatedData}
        />
    ),
    maestro: (setOpen, type, data, relatedData) => ( // Add maestro form configuration
        <MaestroForm
            type={type}
            data={data}
            setOpen={setOpen}
            // relatedData={relatedData}
        />
    ),
};


// Componente principal del modal de formulario
const FormModal = ({
    table,
    type,
    data,
    id,
    relatedData,
}: FormContainerProps & { relatedData?: any }) => {
    // Determina el tamaño del botón según el tipo (create o update)
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";

    // Determina el color de fondo del botón según el tipo
    const bgColor =
        type === "create"
            ? "bg-lamaYellow"
            : type === "update"
                ? "bg-lamaSky"
                : "bg-lamaPurple";

    // Estado para abrir o cerrar el modal
    const [open, setOpen] = useState(false);

    // Componente interno que renderiza el contenido del formulario o confirmación
    const Form = () => {
        // Hook que maneja el estado y acción del formulario de eliminación
        const [state, formAction] = useFormState(deleteActionMap[table], {
            success: false,
            error: false,
        });

        // Instancia del enrutador
        const router = useRouter();

        // Efecto que escucha si la eliminación fue exitosa
        useEffect(() => {
            if (state.success) {
                // Muestra un toast de éxito
                toast(`${table} ha sido eliminado!`);
                // Cierra el modal
                setOpen(false);
                // Refresca la página
                router.refresh();
            }
        }, [state, router]);

        // Si es una eliminación y hay un id, renderiza el formulario de confirmación
        return type === "delete" && id ? (
            <form action={formAction} className="p-4 flex flex-col gap-4">
                {/* Campo oculto con el ID del registro a eliminar */}
                <input type="text | number" name="id" value={id} hidden />
                {/* Mensaje de confirmación */}
                <span className="text-center font-medium">
                    Todos los datos serán eliminados. ¿Está seguro de que desea eliminar este {table}?
                </span>
                {/* Botón para confirmar eliminación */}
                <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
                    Eliminar
                </button>
            </form>
        ) : type === "create" || type === "update" ? (
            // Si es creación o edición, busca el formulario correspondiente
            forms[table] ? forms[table](setOpen, type, data, relatedData) : "Form not found!"
        ) : (
            // Si no coincide ningún tipo, muestra mensaje de error
            "Form not found!"
        );
    };

    // Renderiza el botón y el modal (si open es true)
    return (
        <>
            {/* Botón que abre el modal */}
            <button
                className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
                onClick={() => setOpen(true)}
            >
                {/* Icono dentro del botón, depende del tipo (create, update, delete) */}
                <Image src={`/${type}.png`} alt="" width={16} height={16} />
            </button>

            {/* Modal si está abierto */}
            {open && (
                <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                    {/* Contenedor del formulario */}
                    <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] max-h-[90vh] overflow-y-auto">
                        <Form />
                        {/* Botón de cerrar modal */}
                        <div
                            className="absolute top-4 right-4 cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <Image src="/close.png" alt="" width={14} height={14} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Exporta el componente para usarlo en otras partes
export default FormModal;