// Indicamos que este código se ejecuta en el servidor (Next.js)
"use server";

// Importamos función para forzar recarga de página y actualizar datos
import { revalidatePath } from "next/cache";
// Importamos Zod para validación de datos
import { z } from "zod";
// Importamos instancia de Prisma para la base de datos
import prisma from "./prisma";
// Importamos cliente de Clerk para manejo de usuarios
import { clerkClient } from "@clerk/nextjs/server";

// Definimos tipo para manejar estados de éxito o error
type CurrentState = { success: boolean; error: boolean };

// Definimos esquema de validación para Alumno usando Zod
export const alumnoSchema = z.object({
    // ID opcional (para update)
    id: z.number().optional(),
    // ID de usuario Clerk opcional
    idusuario: z.string().optional(),
    // Nombre obligatorio, mínimo 1 carácter
    nombre: z.string().min(1, { message: "Nombre es requerido!" }),
    // Apellido obligatorio, mínimo 1 carácter
    apellido: z.string().min(1, { message: "Apellido es requerido!" }),
    // Fecha de nacimiento obligatoria, convertida a Date
    fechaDeNacimiento: z.coerce.date({ message: "Fecha de nacimiento es requerida!" }),
    // Género opcional
    genero: z.string().optional(),
    // Documento de identidad opcional
    documentoIdentidad: z.string().optional(),
    // Lugar de nacimiento obligatorio, mínimo 1 carácter
    lugarDeNacimiento: z.string().min(1, { message: "Lugar de nacimiento es requerido!" }),
    // Teléfono móvil opcional
    // telefonoMovil: z.string().optional(),
    // Email opcional, debe ser válido o vacío
    // email: z.string().email({ message: "Email inválido!" }).optional().or(z.literal("")),
    // Estado civil opcional
    // estadoCivil: z.string().optional(),
    // Institución de procedencia obligatoria, mínimo 1 carácter
    institucionProcedencia: z.string().min(1, { message: "Institución de procedencia es requerida!" }),
    // Año de ingreso opcional
    a_o_de_ingreso: z.number().optional(),
    // Carrera opcional
    // carrera: z.string().optional(),
    // Estado del alumno opcional, debe ser uno de los valores permitidos
    estado: z.enum(["activo", "inactivo", "graduado", "retirado"]).optional(),
    // Jornada actual opcional, uno de los valores permitidos
    jornadaActual: z.enum(["matutina", "vespertina"]).optional(),
    // Nombre contacto emergencia opcional
    // nombreContactoEmergencia: z.string().optional(),
    // Teléfono emergencia opcional
    // telefonoEmergencia: z.string().optional(),
    // Booleano si recibió evaluación, opcional
    recibioEvaluacion: z.boolean().optional(),
    // Fecha de evaluación opcional, convertida a Date
    fechaEvaluacion: z.coerce.date().optional(),
    // Booleano si usa medicamentos, opcional
    usaMedicamentos: z.boolean().optional(),
    // Detalles de medicamentos opcional
    medicamentosDetalle: z.string().optional(),
    // Booleano si tiene alergias, opcional
    alergias: z.boolean().optional(),
    // Detalles de alergias opcional
    alergiasDetalle: z.string().optional(),
    // Observaciones médicas opcional
    observacionesMedicas: z.string().optional(),
    // ID de dirección opcional
    direccionId: z.number().optional(),
    // ID del maestro actual opcional
    // maestroActualId: z.number().optional(),
});

// Definimos un tipo TypeScript basado en el esquema de Zod
export type AlumnoSchema = z.infer<typeof alumnoSchema>;

// Función para crear un alumno nuevo, recibe estado y datos del alumno más username y password
export const createAlumno = async (
    currentState: CurrentState,
    data: AlumnoSchema
    // & { username: string; password: string }
) => {
    try {
        // Creamos un usuario en Clerk con username, password, nombre y apellido
        // const user = await clerkClient.users.createUser({
        //     username: data.username,
        //     password: data.password,
        //     firstName: data.nombre,
        //     lastName: data.apellido,
        //     publicMetadata: { role: "alumno" } // Asignamos rol público "alumno"
        // });

        // Guardamos el ID de dirección si existe (en este código no se crea dirección nueva)
        let direccionId = data.direccionId;

        // Creamos el registro del alumno en la base de datos Prisma
        await prisma.alumno.create({
            data: {
                // Asociamos el idusuario de Clerk creado arriba
                // idusuario: user.id,
                // Resto de campos que vienen del formulario / data
                nombre: data.nombre,
                apellido: data.apellido,
                fechaDeNacimiento: data.fechaDeNacimiento,
                genero: data.genero,
                documentoIdentidad: data.documentoIdentidad,
                lugarDeNacimiento: data.lugarDeNacimiento,
                // telefonoMovil: data.telefonoMovil,
                // email: data.email || null, // Email o null si vacío
                // estadoCivil: data.estadoCivil,
                institucionProcedencia: data.institucionProcedencia,
                a_o_de_ingreso: data.a_o_de_ingreso,
                // carrera: data.carrera,
                // Estado por defecto "activo" si no se manda
                estado: data.estado || "activo",
                // Jornada por defecto "matutina" si no se manda
                jornadaActual: data.jornadaActual || "matutina",
                // nombreContactoEmergencia: data.nombreContactoEmergencia,
                // telefonoEmergencia: data.telefonoEmergencia,
                // Booleanos que default a false si no vienen
                recibioEvaluacion: data.recibioEvaluacion || false,
                fechaEvaluacion: data.fechaEvaluacion,
                usaMedicamentos: data.usaMedicamentos || false,
                medicamentosDetalle: data.medicamentosDetalle,
                alergias: data.alergias || false,
                alergiasDetalle: data.alergiasDetalle,
                observacionesMedicas: data.observacionesMedicas,
                direccionId: direccionId,
                // maestroActualId: data.maestroActualId,
            },
        });

        // Indicamos a Next.js que vuelva a generar la página con la lista actualizada
        revalidatePath("/lista/alumnos");
        // Retornamos que fue exitoso
        return { success: true, error: false };
    } catch (err) {
        // Si algo falla, lo mostramos en consola
        console.log(err);
        // Indicamos error
        return { success: false, error: true };
    }
};

// Función para actualizar un alumno existente, recibe estado y datos del alumno (id requerido)
export const updateAlumno = async (
    currentState: CurrentState,
    data: AlumnoSchema
    // & { username?: string; password?: string }
) => {
    // Si no envían ID, no podemos actualizar
    if (!data.id) {
        return { success: false, error: true };
    }

    try {
        // Buscamos el alumno existente en la base de datos
        const existingAlumno = await prisma.alumno.findUnique({
            where: { id: data.id }
        });

        // Si no existe alumno con ese id, retornamos error
        if (!existingAlumno) {
            return { success: false, error: true };
        }

        // Si existe usuario en Clerk y mandan username o password, actualizamos usuario en Clerk
        // if (existingAlumno.idusuario && (data.username || data.password)) {
        //     await clerkClient.users.updateUser(existingAlumno.idusuario, {
        //         ...(data.username && { username: data.username }), // Solo si mandan username
        //         ...(data.password && data.password !== "" && { password: data.password }), // Solo si mandan password no vacío
        //         firstName: data.nombre,
        //         lastName: data.apellido,
        //     });
        // }

        // Actualizamos datos del alumno en Prisma DB
        await prisma.alumno.update({
            where: {
                id: data.id,
            },
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                fechaDeNacimiento: data.fechaDeNacimiento,
                genero: data.genero,
                documentoIdentidad: data.documentoIdentidad,
                lugarDeNacimiento: data.lugarDeNacimiento,
                // telefonoMovil: data.telefonoMovil,
                // email: data.email || null,
                // estadoCivil: data.estadoCivil,
                institucionProcedencia: data.institucionProcedencia,
                a_o_de_ingreso: data.a_o_de_ingreso,
                // carrera: data.carrera,
                estado: data.estado,
                jornadaActual: data.jornadaActual,
                // nombreContactoEmergencia: data.nombreContactoEmergencia,
                // telefonoEmergencia: data.telefonoEmergencia,
                recibioEvaluacion: data.recibioEvaluacion,
                fechaEvaluacion: data.fechaEvaluacion,
                usaMedicamentos: data.usaMedicamentos,
                medicamentosDetalle: data.medicamentosDetalle,
                alergias: data.alergias,
                alergiasDetalle: data.alergiasDetalle,
                observacionesMedicas: data.observacionesMedicas,
                direccionId: data.direccionId,
                // maestroActualId: data.maestroActualId,
            },
        });

        // Forzamos que la página con la lista se actualice para reflejar cambios
        revalidatePath("/lista/alumnos");
        // Retornamos éxito
        return { success: true, error: false };
    } catch (err) {
        // Mostramos error si algo falla
        console.log(err);
        return { success: false, error: true };
    }
};

// Función para eliminar un alumno, recibe estado y un FormData con el id del alumno a borrar
export const deleteAlumno = async (
    currentState: CurrentState,
    data: FormData
) => {
    // Sacamos el id de alumno del FormData
    const id = data.get("id") as string;
    try {
        // Buscamos alumno para obtener el idusuario
        const alumno = await prisma.alumno.findUnique({
            where: { id: parseInt(id) }
        });

        // Si no existe alumno con ese id, retornamos error
        if (!alumno) {
            return { success: false, error: true };
        }

        // Si tiene usuario asociado en Clerk, lo borramos también
        if (alumno.idusuario) {
            await clerkClient.users.deleteUser(alumno.idusuario);
        }

        // Borramos el alumno de la base de datos
        await prisma.alumno.delete({
            where: {
                id: parseInt(id),
            },
        });

        // Forzamos que la página con la lista se actualice
        revalidatePath("/lista/alumnos");
        // Retornamos éxito
        return { success: true, error: false };
    } catch (err) {
        // Mostramos error si falla algo
        console.log(err);
        return { success: false, error: true };
    }
};
