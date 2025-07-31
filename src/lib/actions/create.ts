// src/lib/actions/create.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- FUNCIÓN GENÉRICA PARA CREAR ---
async function createRecord(model: keyof typeof prisma, data: any, revalidationPath: string) {
  try {
    await (prisma[model] as any).create({ data });
    revalidatePath(revalidationPath);
    return { success: true, error: false };
  } catch (error) {
    console.error(`Error al crear en ${String(model)}:`, error);
    return { success: false, error: true };
  }
}

// --- ACCIONES ESPECIALIZADAS ---

export const createAlumno = (currentState: any, data: any) => {
  return createRecord("alumno", data, "/lista/alumnos");
};

export const createPadre = (currentState: any, data: any) => {
  return createRecord("padre", data, "/lista/padres");
};

export const createMaestro = (currentState: any, data: any) => {
  return createRecord("maestro", data, "/lista/maestros");
};

export const createEvento = (currentState: any, data: any) => {
  return createRecord("eventos", data, "/lista/eventos");
};

export const createMateria = (currentState: any, data: any) => {
  return createRecord("materia", data, "/lista/trabajoSesiones");
};