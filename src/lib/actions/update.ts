// src/lib/actions/update.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/lib/types";

async function updateRecord(model: keyof typeof prisma, data: any, revalidationPath: string): Promise<ActionState> {
  const id = data.get("id") || data.id;
  if (!id) {
    return { success: false, error: true, message: "ID no proporcionado." };
  }

  const parsedId = model === "materia" ? id : parseInt(id);
  if (model !== "materia" && isNaN(parsedId)) {
    return { success: false, error: true, message: "ID inválido." };
  }

  try {
    const updateData: { [key: string]: any } = {};
    for (const [key, value] of data.entries()) {
      if (key !== "id") {
        updateData[key] = value;
      }
    }

    // Procesar campos especiales según el modelo
    // Convertir campos booleanos si existen
    if (updateData.recibio_evaluacion !== undefined) {
      updateData.recibio_evaluacion = updateData.recibio_evaluacion === 'on' || updateData.recibio_evaluacion === true;
    }
    if (updateData.usa_medicamentos !== undefined) {
      updateData.usa_medicamentos = updateData.usa_medicamentos === 'on' || updateData.usa_medicamentos === true;
    }
    if (updateData.alergias !== undefined) {
      updateData.alergias = updateData.alergias === 'on' || updateData.alergias === true;
    }
    if (updateData.es_publico !== undefined) {
      updateData.es_publico = updateData.es_publico === 'on' || updateData.es_publico === true;
    }
    if (updateData.activo !== undefined) {
      updateData.activo = updateData.activo === 'on' || updateData.activo === true;
    }

    // Convertir campos numéricos
    if (updateData.terapeutaPrincipalId) {
      updateData.terapeutaPrincipalId = Number(updateData.terapeutaPrincipalId);
    }
    if (updateData.padreId) {
      updateData.padreId = Number(updateData.padreId);
    }
    if (updateData.maestroId) {
      updateData.maestroId = Number(updateData.maestroId);
    }

    // Convertir fechas
    if (updateData.fecha_de_nacimiento) {
      updateData.fecha_de_nacimiento = new Date(updateData.fecha_de_nacimiento);
    }
    if (updateData.fecha_ingreso) {
      updateData.fecha_ingreso = new Date(updateData.fecha_ingreso);
    }
    if (updateData.fecha_inicio) {
      updateData.fecha_inicio = new Date(updateData.fecha_inicio);
    }
    if (updateData.fecha_fin) {
      updateData.fecha_fin = new Date(updateData.fecha_fin);
    }

    console.log(`Updating ${String(model)} with data:`, updateData);

    await (prisma[model] as any).update({
      where: { id: parsedId },
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