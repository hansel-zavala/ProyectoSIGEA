// src/lib/actions/update.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- FUNCIÓN GENÉRICA PARA ACTUALIZAR ---
async function updateRecord(model: keyof typeof prisma, data: any, revalidationPath: string) {
  if (!data.id) {
    return { success: false, error: true, message: "ID no proporcionado." };
  }

  try {
    const { id, ...updateData } = data;
    await (prisma[model] as any).update({
      where: { id: parseInt(id) }, // Asegurarse de que el ID sea un número si es necesario
      data: updateData,
    });
    revalidatePath(revalidationPath);
    return { success: true, error: false };
  } catch (error) {
    console.error(`Error al actualizar en ${String(model)}:`, error);
    return { success: false, error: true };
  }
}

// --- ACCIONES ESPECIALIZADAS ---

export const updateAlumno = (currentState: any, data: any) => {
  return updateRecord("alumno", data, "/lista/alumnos");
};

export const updatePadre = (currentState: any, data: any) => {
  return updateRecord("padre", data, "/lista/padres");
};

export const updateMaestro = (currentState: any, data: any) => {
  return updateRecord("maestro", data, "/lista/maestros");
};

export const updateEvento = (currentState: any, data: any) => {
  return updateRecord("eventos", data, "/lista/eventos");
};

export const updateMateria = (currentState: any, data: any) => {
  return updateRecord("materia", data, "/lista/trabajoSesiones");
};