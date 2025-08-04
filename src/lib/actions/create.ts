// src/lib/actions/create.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/lib/types";
import { 
    MatriculaValidationSchema,
    // ... otros esquemas que puedas necesitar ...
} from "../formValidationSchemas";

// --- ACCIÓN PARA MATRÍCULA INTEGRADA (VERSIÓN FINAL) ---
export const createMatricula = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
  const data = Object.fromEntries(formData.entries());

  // Convierte los campos necesarios antes de validar
  const preparedData = {
    ...data,
    terapeutaPrincipalId: data.terapeutaPrincipalId ? Number(data.terapeutaPrincipalId) : undefined,
    // Convierte checkboxes
    recibio_evaluacion: data.recibio_evaluacion === 'on',
    usa_medicamentos: data.usa_medicamentos === 'on',
    alergias: data.alergias === 'on',
  };

  const validatedFields = MatriculaValidationSchema.safeParse(preparedData);

  if (!validatedFields.success) {
    console.error("Error de validación:", validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true, message: "Datos inválidos. Revisa los campos marcados en rojo." };
  }

  const {
    // Campos del Alumno
    nombreAlumno, apellidoAlumno, fecha_de_nacimiento, lugar_de_nacimiento, direccion,
    telefono_fijo, telefono_movil, institucion_procedencia, recibio_evaluacion,
    usa_medicamentos, medicamentos_detalle, alergias, alergias_detalle, observaciones_medicas,
    
    // Campos del Padre
    nombrePadre, apellidoPadre, direccionPadre, telefono_movil_padre, tipo_parentesco,
    
    // Asignación
    terapeutaPrincipalId,
    
    // Campo que nos faltaba
    genero
  } = validatedFields.data;

  try {
    // Usamos una transacción para asegurar que todo se guarde correctamente
    await prisma.$transaction(async (tx) => {
      // 1. Crea el padre
      const nuevoPadre = await tx.padre.create({
        data: {
          nombre: nombrePadre,
          apellido: apellidoPadre,
          direccion: direccionPadre,
          telefono_movil: telefono_movil_padre,
          tipo_parentesco: tipo_parentesco,
        }
      });

      // 2. Crea el alumno y lo vincula a todo
      await tx.alumno.create({
        data: {
          nombre: nombreAlumno,
          apellido: apellidoAlumno,
          fecha_de_nacimiento: fecha_de_nacimiento,
          lugar_de_nacimiento: lugar_de_nacimiento,
          institucion_procedencia: institucion_procedencia,
          direccion: direccion,
          telefono_fijo: telefono_fijo,
          telefono_movil: telefono_movil,
          recibio_evaluacion: recibio_evaluacion,
          usa_medicamentos: usa_medicamentos,
          medicamentos_detalle: medicamentos_detalle,
          alergias: alergias,
          alergias_detalle: alergias_detalle,
          observaciones_medicas: observaciones_medicas,
          genero: genero,
          padreId: nuevoPadre.id,
          terapeutaPrincipalId: terapeutaPrincipalId,
        }
      });
    });

    revalidatePath("/lista/alumnos");
    revalidatePath("/lista/padres");
    return { success: true, error: false, message: "Matrícula completada con éxito." };
  } catch (error) {
    console.error("Error de Prisma en matrícula:", error);
    return { success: false, error: true, message: "Error del servidor al procesar la matrícula." };
  }
};


// --- OTRAS ACCIONES DE CREACIÓN (Mantenemos las que ya tenías) ---
export const createAlumno = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
    return { success: false, error: true, message: "Usar el formulario de Matrícula" };
};
export const createPadre = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
    return { success: false, error: true, message: "Función no implementada" };
};
export const createMaestro = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
    return { success: false, error: true, message: "Función no implementada" };
};
export const createEvento = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
    return { success: false, error: true, message: "Función no implementada" };
};
export const createMateria = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
    return { success: false, error: true, message: "Función no implementada" };
};