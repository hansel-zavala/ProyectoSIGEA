"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { AlumnoSchema, PadreSchema, MaestroSchema } from "./formValidationSchemas";

type CurrentState = { success: boolean; error: boolean };

// ALUMNO ACTIONS
export const createAlumno = async (
    currentState: CurrentState,
    data: AlumnoSchema
) => {
    try {
        await prisma.alumno.create({
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                fecha_de_nacimiento: data.fecha_de_nacimiento,
                genero: data.genero,
                documento_identidad: data.documento_identidad,
                lugar_de_nacimiento: data.lugar_de_nacimiento,
                institucion_procedencia: data.institucion_procedencia,
                a_o_de_ingreso: data.a_o_de_ingreso,
                estado: data.estado || "activo",
                jornada_actual: data.jornada_actual || "matutina",
                recibio_evaluacion: data.recibio_evaluacion || false,
                fecha_evaluacion: data.fecha_evaluacion,
                usa_medicamentos: data.usa_medicamentos || false,
                medicamentos_detalle: data.medicamentos_detalle,
                alergias: data.alergias || false,
                alergias_detalle: data.alergias_detalle,
                observaciones_medicas: data.observaciones_medicas,
                maestro_actual_id: data.maestro_actual_id,
            },
        });

        revalidatePath("/lista/alumnos");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateAlumno = async (
    currentState: CurrentState,
    data: AlumnoSchema
) => {
    if (!data.id) {
        return { success: false, error: true };
    }

    try {
        const existingAlumno = await prisma.alumno.findUnique({
            where: { id: data.id }
        });

        if (!existingAlumno) {
            return { success: false, error: true };
        }

        await prisma.alumno.update({
            where: { id: data.id },
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                fecha_de_nacimiento: data.fecha_de_nacimiento,
                genero: data.genero,
                documento_identidad: data.documento_identidad,
                lugar_de_nacimiento: data.lugar_de_nacimiento,
                institucion_procedencia: data.institucion_procedencia,
                a_o_de_ingreso: data.a_o_de_ingreso,
                estado: data.estado,
                jornada_actual: data.jornada_actual,
                recibio_evaluacion: data.recibio_evaluacion,
                fecha_evaluacion: data.fecha_evaluacion,
                usa_medicamentos: data.usa_medicamentos,
                medicamentos_detalle: data.medicamentos_detalle,
                alergias: data.alergias,
                alergias_detalle: data.alergias_detalle,
                observaciones_medicas: data.observaciones_medicas,
                maestro_actual_id: data.maestro_actual_id,
            },
        });

        revalidatePath("/lista/alumnos");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteAlumno = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        const alumno = await prisma.alumno.findUnique({
            where: { id: parseInt(id) }
        });

        if (!alumno) {
            return { success: false, error: true };
        }

        if (alumno.idusuario) {
            try {
                await clerkClient.users.deleteUser(alumno.idusuario);
            } catch (clerkError: any) {
                // If user doesn't exist in Clerk, continue with database deletion
                console.log("Clerk user not found or already deleted:", clerkError.message);
            }
        }

        await prisma.alumno.delete({
            where: { id: parseInt(id) },
        });

        revalidatePath("/lista/alumnos");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

// PADRE ACTIONS
export const createPadre = async (
    currentState: CurrentState,
    data: PadreSchema
) => {
    try {
        await prisma.padre.create({
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                documento_identidad: data.documento_identidad,
                tipo_parentesco: data.tipo_parentesco,
                fecha_de_nacimiento: data.fecha_de_nacimiento,
                genero: data.genero,
                telefono_movil: data.telefono_movil,
                email: data.email,
                activo: data.activo !== undefined ? data.activo : true,
            },
        });

        revalidatePath("/lista/padres");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updatePadre = async (
    currentState: CurrentState,
    data: PadreSchema
) => {
    if (!data.id) {
        return { success: false, error: true };
    }

    try {
        const existingPadre = await prisma.padre.findUnique({
            where: { id: data.id }
        });

        if (!existingPadre) {
            return { success: false, error: true };
        }

        await prisma.padre.update({
            where: { id: data.id },
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                documento_identidad: data.documento_identidad,
                tipo_parentesco: data.tipo_parentesco,
                fecha_de_nacimiento: data.fecha_de_nacimiento,
                genero: data.genero,
                telefono_movil: data.telefono_movil,
                email: data.email,
                activo: data.activo,
            },
        });

        revalidatePath("/lista/padres");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deletePadre = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        const padre = await prisma.padre.findUnique({
            where: { id: parseInt(id) }
        });

        if (!padre) {
            return { success: false, error: true };
        }

        if (padre.idusuario) {
            try {
                await clerkClient.users.deleteUser(padre.idusuario);
            } catch (clerkError: any) {
                // If user doesn't exist in Clerk, continue with database deletion
                console.log("Clerk user not found or already deleted:", clerkError.message);
            }
        }

        await prisma.padre.delete({
            where: { id: parseInt(id) },
        });

        revalidatePath("/lista/padres");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

// MAESTRO ACTIONS
export const createMaestro = async (
    currentState: CurrentState,
    data: MaestroSchema
) => {
    try {
        await prisma.maestro.create({
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                documento_identidad: data.documento_identidad,
                fecha_de_nacimiento: data.fecha_de_nacimiento,
                genero: data.genero,
                telefono_movil: data.telefono_movil,
                email: data.email,
                tipo_profesional: data.tipo_profesional,
                estado: data.estado || "activo",
                fecha_ingreso: data.fecha_ingreso,
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
                documento_identidad: data.documento_identidad,
                fecha_de_nacimiento: data.fecha_de_nacimiento,
                genero: data.genero,
                telefono_movil: data.telefono_movil,
                email: data.email,
                tipo_profesional: data.tipo_profesional,
                estado: data.estado,
                fecha_ingreso: data.fecha_ingreso,
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
            try {
                await clerkClient.users.deleteUser(maestro.idusuario);
            } catch (clerkError: any) {
                // If user doesn't exist in Clerk, continue with database deletion
                console.log("Clerk user not found or already deleted:", clerkError.message);
            }
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