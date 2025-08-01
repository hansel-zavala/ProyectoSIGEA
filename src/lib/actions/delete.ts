// src/lib/actions/delete.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { ActionState } from "@/lib/types"; // <-- Importa el tipo unificado

async function deleteRecord(model: keyof typeof prisma, id: string, revalidationPath: string): Promise<ActionState> {
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
          console.log("Usuario de Clerk no encontrado:", clerkError.message);
        }
      }
    }
    
    await (prisma[model] as any).delete({ where: { id: numericId } });

    revalidatePath(revalidationPath);
    return { success: true, error: false, message: "Registro eliminado con éxito." };
  } catch (error) {
    console.error(`Error al eliminar en ${String(model)}:`, error);
    return { success: false, error: true, message: "Error del servidor al eliminar." };
  }
}

export const deleteAlumno = (currentState: ActionState, data: FormData) => deleteRecord("alumno", data.get("id") as string, "/lista/alumnos");
export const deletePadre = (currentState: ActionState, data: FormData) => deleteRecord("padre", data.get("id") as string, "/lista/padres");
export const deleteMaestro = (currentState: ActionState, data: FormData) => deleteRecord("maestro", data.get("id") as string, "/lista/maestros");
export const deleteEvento = (currentState: ActionState, data: FormData) => deleteRecord("eventos", data.get("id") as string, "/lista/eventos");
export const deleteMateria = (currentState: ActionState, data: FormData) => deleteRecord("materia", data.get("id") as string, "/lista/trabajoSesiones");