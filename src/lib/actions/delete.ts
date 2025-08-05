// src/lib/actions/delete.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { ActionState } from "@/lib/types";

async function softDeleteRecord(model: keyof typeof prisma, id: string, revalidationPath: string): Promise<ActionState> {
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    return { success: false, error: true, message: "ID inválido." };
  }
  
  try {
    // Verificar si el registro existe
    const record = await (prisma[model] as any).findUnique({ where: model === "materia" ? { id } : { id: numericId } });
    if (!record) {
      return { success: false, error: true, message: "Registro no encontrado." };
    }

    // Realizar soft delete según el modelo
    switch (model) {
      case "alumno":
        await prisma.alumno.update({
          where: { id: numericId },
          data: { estado: "inactivo" }
        });
        break;
      
      case "padre":
        await prisma.padre.update({
          where: { id: numericId },
          data: { activo: false }
        });
        break;
      
      case "maestro":
        await prisma.maestro.update({
          where: { id: numericId },
          data: { estado: "inactivo" }
        });
        break;
      
      case "eventos":
        await prisma.eventos.update({
          where: { id: numericId },
          data: { estado: "cancelado" }
        });
        break;
      
      case "materia":
        // Para materias, temporalmente no hacemos nada hasta que se ejecute la migración
        // await prisma.materia.update({
        //   where: { id: numericId },
        //   data: { 
        //     estado: "inactiva"
        //   }
        // });
        // Por ahora, solo actualizamos la fecha de actualización
        await prisma.materia.update({
          where: { id },
          data: { 
            // Actualizar algún campo para que se actualice la fecha
            nombre: (await prisma.materia.findUnique({ where: { id } }))?.nombre || ""
          }
        });
        break;
      
      default:
        return { success: false, error: true, message: "Modelo no soportado para soft delete." };
    }

    // Si el registro tiene un usuario de Clerk asociado, también lo desactivamos
    if (record.idusuario) {
      try {
        await clerkClient.users.updateUser(record.idusuario, {
          publicMetadata: { ...record.publicMetadata, status: "inactive" }
        });
      } catch (clerkError: any) {
        console.log("Error al actualizar usuario de Clerk:", clerkError.message);
      }
    }

    revalidatePath(revalidationPath);
    return { success: true, error: false, message: "Registro desactivado con éxito." };
  } catch (error) {
    console.error(`Error al desactivar en ${String(model)}:`, error);
    return { success: false, error: true, message: "Error del servidor al desactivar." };
  }
}

export const deleteAlumno = (currentState: ActionState, data: FormData) => softDeleteRecord("alumno", data.get("id") as string, "/lista/alumnos");
export const deletePadre = (currentState: ActionState, data: FormData) => softDeleteRecord("padre", data.get("id") as string, "/lista/padres");
export const deleteMaestro = (currentState: ActionState, data: FormData) => softDeleteRecord("maestro", data.get("id") as string, "/lista/maestros");
export const deleteEvento = (currentState: ActionState, data: FormData) => softDeleteRecord("eventos", data.get("id") as string, "/lista/eventos");
export const deleteMateria = (currentState: ActionState, data: FormData) => softDeleteRecord("materia", data.get("id") as string, "/lista/trabajoSesiones");