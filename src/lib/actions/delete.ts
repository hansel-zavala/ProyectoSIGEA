// src/lib/actions/delete.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";

// --- FUNCIÓN GENÉRICA PARA ELIMINAR ---
async function deleteRecord(model: keyof typeof prisma, id: string, revalidationPath: string) {
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    return { success: false, error: true, message: "ID inválido." };
  }
  
  try {
    if (model === "alumno" || model === "padre" || model === "maestro") {
      const record = await (prisma[model] as any).findUnique({ where: { id: numericId } });
      if (record && record.idusuario) {
        try {
          await clerkClient.users.deleteUser(record.idusuario);
        } catch (clerkError: any) {
          console.log("Usuario de Clerk no encontrado o ya eliminado:", clerkError.message);
        }
      }
    }
    
    await (prisma[model] as any).delete({ where: { id: numericId } });

    revalidatePath(revalidationPath);
    return { success: true, error: false };
  } catch (error) {
    console.error(`Error al eliminar en ${String(model)}:`, error);
    return { success: false, error: true };
  }
}

// --- ACCIONES ESPECIALIZADAS ---

export const deleteAlumno = (currentState: any, data: FormData) => {
  return deleteRecord("alumno", data.get("id") as string, "/lista/alumnos");
};

export const deletePadre = (currentState: any, data: FormData) => {
  return deleteRecord("padre", data.get("id") as string, "/lista/padres");
};

export const deleteMaestro = (currentState: any, data: FormData) => {
  return deleteRecord("maestro", data.get("id") as string, "/lista/maestros");
};

export const deleteEvento = (currentState: any, data: FormData) => {
  return deleteRecord("eventos", data.get("id") as string, "/lista/eventos");
};

export const deleteMateria = (currentState: any, data: FormData) => {
  const id = data.get("id") as string;
  // El ID de Materia es un UUID (string), no un número, así que lo manejamos diferente.
  try {
    prisma.materia.delete({ where: { id } });
    revalidatePath("/lista/trabajoSesiones");
    return { success: true, error: false };
  } catch(error) {
    console.error(`Error al eliminar en materia:`, error);
    return { success: false, error: true };
  }
};