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

import { AlumnoSchema, PadreSchema, MaestroSchema } from "./formValidationSchemas";

// Definimos tipo para manejar estados de éxito o error
type CurrentState = { success: boolean; error: boolean };

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
                fechaDeNacimiento: new Date(data.fechaDeNacimiento),
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

export const createPadre = async (
    currentState: CurrentState,
    data: PadreSchema
) => {
    try {
        // Guardamos el ID de dirección si existe (en este código no se crea dirección nueva)
        // let direccionId = data.direccion_casa_id || data.direccion_trabajo_id;
        await prisma.padre.create({
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                documentoIdentidad: data.documento_identidad,
                tipoParentesco: data.tipo_parentesco,
                fechaDeNacimiento: data.fecha_de_nacimiento,
                genero: data.genero,
                lugarDeNacimiento: data.lugar_de_nacimiento,
                telefonoMovil: data.telefono_movil,
                // telefonoTrabajo: data.telefono_trabajo,
                email: data.email,
                ocupacion: data.ocupacion,
                lugarTrabajo: data.lugar_trabajo,
                estadoCivil: data.estado_civil,
                // nivelEducativo: data.nivel_educativo,
                // ingresosMensuales: data.ingresos_mensuales,
                esResponsableFinanciero: data.es_responsable_financiero,
                esContactoEmergencia: data.es_contacto_emergencia,
                direccionCasaId: data.direccion_casa_id,
                direccionTrabajoId: data.direccion_trabajo_id,
                activo: data.activo
            },
        });

        // Indicamos a Next.js que vuelva a generar la página con la lista actualizada
        revalidatePath("/lista/padres");
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
export const updatePadre = async (
    currentState: CurrentState,
    data: PadreSchema
    // & { username?: string; password?: string }
) => {
    // Si no envían ID, no podemos actualizar
    if (!data.id) {
        return { success: false, error: true };
    }

    try {
        // Buscamos el alumno existente en la base de datos
        const existingPadre = await prisma.padre.findUnique({
            where: { id: data.id }
        });

        // Si no existe alumno con ese id, retornamos error
        if (!existingPadre) {
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
        await prisma.padre.update({
            where: {
                id: data.id,
            },
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                documentoIdentidad: data.documento_identidad,
                tipoParentesco: data.tipo_parentesco,
                fechaDeNacimiento: data.fecha_de_nacimiento,
                genero: data.genero,
                lugarDeNacimiento: data.lugar_de_nacimiento,
                telefonoMovil: data.telefono_movil,
                // telefonoTrabajo: data.telefono_trabajo,
                email: data.email,
                ocupacion: data.ocupacion,
                lugarTrabajo: data.lugar_trabajo,
                estadoCivil: data.estado_civil,
                // nivelEducativo: data.nivel_educativo,
                // ingresosMensuales: data.ingresos_mensuales,
                esResponsableFinanciero: data.es_responsable_financiero,
                esContactoEmergencia: data.es_contacto_emergencia,
                direccionCasaId: data.direccion_casa_id,
                direccionTrabajoId: data.direccion_trabajo_id,
                activo: data.activo,
            },
        });

        // Forzamos que la página con la lista se actualice para reflejar cambios
        revalidatePath("/lista/padres");
        // Retornamos éxito
        return { success: true, error: false };
    } catch (err) {
        // Mostramos error si algo falla
        console.log(err);
        return { success: false, error: true };
    }
};

// Función para eliminar un alumno, recibe estado y un FormData con el id del alumno a borrar
export const deletePadre = async (
    currentState: CurrentState,
    data: FormData
) => {
    // Sacamos el id de alumno del FormData
    const id = data.get("id") as string;
    try {
        // Buscamos alumno para obtener el idusuario
        const padre = await prisma.padre.findUnique({
            where: { id: parseInt(id) }
        });

        // Si no existe alumno con ese id, retornamos error
        if (!padre) {
            return { success: false, error: true };
        }

        // Si tiene usuario asociado en Clerk, lo borramos también
        if (padre.idusuario) {
            await clerkClient.users.deleteUser(padre.idusuario);
        }

        // Borramos el alumno de la base de datos
        await prisma.padre.delete({
            where: {
                id: parseInt(id),
            },
        });

        // Forzamos que la página con la lista se actualice
        revalidatePath("/lista/padres");
        // Retornamos éxito
        return { success: true, error: false };
    } catch (err) {
        // Mostramos error si falla algo
        console.log(err);
        return { success: false, error: true };
    }
};

export const createMaestro = async (
    currentState: CurrentState,
    data: MaestroSchema
) => {
    try {
        await prisma.maestro.create({
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                documentoIdentidad: data.documento_identidad || "",
                fechaDeNacimiento: data.fecha_de_nacimiento,
                genero: data.genero,
                telefonoMovil: data.telefono_movil || "",
                email: data.email || "",
                tipoProfesional: "ambos",
                numeroLicencia: data.numero_licencia || "",
                // direccionId: data.direccion_id,
                estado: "activo",
                fechaIngreso: data.fecha_ingreso || "",
                // imagen: data.imagen
            },
        });

        revalidatePath("/lista/maestros");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateMaestro = async (
    currentState: CurrentState,
    data: MaestroSchema
) => {
    if (!data.id) {
        return { success: false, error: true };
    }
    try {
        const existingMaestro = await prisma.maestro.findUnique({
            where: { id: data.id },
        });

        if (!existingMaestro) {
            return { success: false, error: true };
        }

        await prisma.maestro.update({
            where: { id: data.id },
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                documentoIdentidad: data.documento_identidad || "",
                fechaDeNacimiento: data.fecha_de_nacimiento,
                genero: data.genero,
                telefonoMovil: data.telefono_movil || "",
                email: data.email || "",
                tipoProfesional: "ambos",
                numeroLicencia: data.numero_licencia || "",
                // direccionId: data.direccion_id,
                estado: "activo",
                fechaIngreso: data.fecha_ingreso || "",
                // imagen: data.imagen
            },
        });

        revalidatePath("/lista/maestros");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteMaestro = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        const maestro = await prisma.maestro.findUnique({
            where: { id: parseInt(id) },
        });

        if (!maestro) {
            return { success: false, error: true };
        }

        if (maestro.idusuario) {
            await clerkClient.users.deleteUser(maestro.idusuario);
        }

        await prisma.maestro.delete({
            where: { id: parseInt(id) },
        });

        revalidatePath("/lista/maestros");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};