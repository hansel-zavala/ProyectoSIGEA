// src/lib/actions/create.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/lib/types";
// Importa TODOS los esquemas de validación que necesitarás
import { 
    AlumnoValidationSchema, 
    MaestroValidationSchema, 
    PadreValidationSchema,
    // Asegúrate de crear estos esquemas en tu archivo de validación si no existen
    // EventoValidationSchema, 
    // MateriaValidationSchema 
} from "../formValidationSchemas";

// --- ACCIÓN PARA CREAR ALUMNO ---
export const createAlumno = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
  const data = Object.fromEntries(formData.entries());

  const preparedData = {
    ...data,
    a_o_de_ingreso: data.a_o_de_ingreso ? Number(data.a_o_de_ingreso) : undefined,
    maestro_actual_id: data.maestro_actual_id ? Number(data.maestro_actual_id) : undefined,
    recibio_evaluacion: data.recibio_evaluacion === 'on',
    usa_medicamentos: data.usa_medicamentos === 'on',
    alergias: data.alergias === 'on',
  };

  const validatedFields = AlumnoValidationSchema.safeParse(preparedData);

  if (!validatedFields.success) {
    console.error("Error de validación:", validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true, message: "Datos inválidos. Por favor, revisa el formulario." };
  }

  const { id, ...dataToCreate } = validatedFields.data;

  try {
    await prisma.alumno.create({ data: dataToCreate });
    revalidatePath("/lista/alumnos");
    return { success: true, error: false, message: "Alumno creado con éxito." };
  } catch (error) {
    console.error("Error de Prisma:", error);
    return { success: false, error: true, message: "Error del servidor al crear el alumno." };
  }
};

// --- ACCIÓN PARA CREAR MAESTRO (CORREGIDA Y FUNCIONAL) ---
export const createMaestro = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
  const data = Object.fromEntries(formData.entries());
  
  const validatedFields = MaestroValidationSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Error de validación (Maestro):", validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true, message: "Datos inválidos. Por favor, revisa el formulario." };
  }

  const { id, ...dataToCreate } = validatedFields.data;

  try {
    await prisma.maestro.create({ data: dataToCreate });
    revalidatePath("/lista/maestros");
    return { success: true, error: false, message: "Maestro creado con éxito." };
  } catch (error) {
    console.error("Error de Prisma (Maestro):", error);
    return { success: false, error: true, message: "Error del servidor al crear el maestro." };
  }
};

// --- ACCIÓN PARA CREAR PADRE (IMPLEMENTADA) ---
export const createPadre = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
    const data = Object.fromEntries(formData.entries());
    const preparedData = {
        ...data,
        activo: data.activo === 'on'
    };

    const validatedFields = PadreValidationSchema.safeParse(preparedData);

    if (!validatedFields.success) {
        console.error("Error de validación (Padre):", validatedFields.error.flatten().fieldErrors);
        return { success: false, error: true, message: "Datos inválidos. Por favor, revisa el formulario." };
    }

    const { id, ...dataToCreate } = validatedFields.data;

    try {
        await prisma.padre.create({ data: dataToCreate });
        revalidatePath("/lista/padres");
        return { success: true, error: false, message: "Padre/Tutor creado con éxito." };
    } catch (error) {
        console.error("Error de Prisma (Padre):", error);
        return { success: false, error: true, message: "Error del servidor al crear el Padre/Tutor." };
    }
};


// --- OTRAS ACCIONES (PUEDES IMPLEMENTARLAS DE LA MISMA FORMA) ---

export const createEvento = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
    // Aquí iría la validación con EventoValidationSchema
    return { success: false, error: true, message: "Función para crear evento no implementada" };
};
export const createMateria = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
    // Aquí iría la validación con MateriaValidationSchema
    return { success: false, error: true, message: "Función para crear materia no implementada" };
};