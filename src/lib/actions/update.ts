// src/lib/actions/update.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/lib/types"; // <-- Importa el tipo unificado

async function updateRecord(model: keyof typeof prisma, data: any, revalidationPath: string): Promise<ActionState> {
  if (!data.id) {
    return { success: false, error: true, message: "ID no proporcionado." };
  }

  try {
    const { id, ...updateData } = data;
    await (prisma[model] as any).update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    revalidatePath(revalidationPath);
    return { success: true, error: false, message: "Registro actualizado con éxito." };
  } catch (error) {
    console.error(`Error al actualizar en ${String(model)}:`, error);
    return { success: false, error: true, message: "Error del servidor al actualizar." };
  }
}

export const updateAlumno = (currentState: ActionState, data: any) => updateRecord("alumno", data, "/lista/alumnos");
export const updatePadre = (currentState: ActionState, data: any) => updateRecord("padre", data, "/lista/padres");
export const updateMaestro = (currentState: ActionState, data: any) => updateRecord("maestro", data, "/lista/maestros");
export const updateEvento = (currentState: ActionState, data: any) => updateRecord("eventos", data, "/lista/eventos");
export const updateMateria = (currentState: ActionState, data: any) => updateRecord("materia", data, "/lista/trabajoSesiones");