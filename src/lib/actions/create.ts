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

// --- ACCIONES DE CREACIÓN MEJORADAS ---
export const createAlumno = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
  try {
    const data = Object.fromEntries(formData.entries());
    
    // Convierte campos booleanos y numéricos
    const preparedData = {
      nombre: data.nombre as string,
      apellido: data.apellido as string,
      lugar_de_nacimiento: data.lugar_de_nacimiento as string,
      fecha_de_nacimiento: new Date(data.fecha_de_nacimiento as string),
      direccion: data.direccion as string,
      telefono_fijo: data.telefono_fijo as string,
      telefono_movil: data.telefono_movil as string,
      institucion_procedencia: data.institucion_procedencia as string,
      recibio_evaluacion: data.recibio_evaluacion === 'on',
      usa_medicamentos: data.usa_medicamentos === 'on',
      medicamentos_detalle: data.medicamentos_detalle as string,
      alergias: data.alergias === 'on',
      alergias_detalle: data.alergias_detalle as string,
      observaciones_medicas: data.observaciones_medicas as string,
      genero: data.genero as any,
      documento_identidad: data.documento_identidad as string,
      jornada_actual: data.jornada_actual as any,
      atencion_grupal: data.atencion_grupal === 'on',
      atencion_individual: data.atencion_individual === 'on',
      atencion_distancia: data.atencion_distancia === 'on',
      atencion_pre_vocacional: data.atencion_pre_vocacional === 'on',
      atencion_vocacional: data.atencion_vocacional === 'on',
      terapia_domicilio: data.terapia_domicilio === 'on',
      inclusion_escolar: data.inclusion_escolar === 'on',
      educacion_fisica: data.educacion_fisica === 'on',
      terapeutaPrincipalId: data.terapeutaPrincipalId ? Number(data.terapeutaPrincipalId) : undefined,
      padreId: data.padreId ? Number(data.padreId) : undefined,
    };

    await prisma.alumno.create({
      data: preparedData
    });

    revalidatePath("/lista/alumnos");
    return { success: true, error: false, message: "Alumno creado con éxito." };
  } catch (error) {
    console.error("Error al crear alumno:", error);
    return { success: false, error: true, message: "Error del servidor al crear alumno." };
  }
};

export const createPadre = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
  try {
    const data = Object.fromEntries(formData.entries());
    
    await prisma.padre.create({
      data: {
        nombre: data.nombre as string,
        apellido: data.apellido as string,
        documento_identidad: data.documento_identidad as string,
        tipo_parentesco: data.tipo_parentesco as any,
        direccion: data.direccion as string,
        profesion: data.profesion as string,
        lugar_trabajo: data.lugar_trabajo as string,
        telefono_fijo: data.telefono_fijo as string,
        telefono_movil: data.telefono_movil as string,
        email: data.email as string,
        fecha_de_nacimiento: data.fecha_de_nacimiento ? new Date(data.fecha_de_nacimiento as string) : undefined,
        genero: data.genero as any,
      }
    });

    revalidatePath("/lista/padres");
    return { success: true, error: false, message: "Padre creado con éxito." };
  } catch (error) {
    console.error("Error al crear padre:", error);
    return { success: false, error: true, message: "Error del servidor al crear padre." };
  }
};

export const createMaestro = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
  try {
    const data = Object.fromEntries(formData.entries());
    
    await prisma.maestro.create({
      data: {
        nombre: data.nombre as string,
        apellido: data.apellido as string,
        documento_identidad: data.documento_identidad as string,
        fecha_de_nacimiento: data.fecha_de_nacimiento ? new Date(data.fecha_de_nacimiento as string) : undefined,
        genero: data.genero as any,
        telefono_movil: data.telefono_movil as string,
        email: data.email as string,
        tipo_profesional: data.tipo_profesional as any,
        fecha_ingreso: data.fecha_ingreso ? new Date(data.fecha_ingreso as string) : undefined,
      }
    });

    revalidatePath("/lista/maestros");
    return { success: true, error: false, message: "Maestro creado con éxito." };
  } catch (error) {
    console.error("Error al crear maestro:", error);
    return { success: false, error: true, message: "Error del servidor al crear maestro." };
  }
};

export const createEvento = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
  try {
    const data = Object.fromEntries(formData.entries());
    
    await prisma.eventos.create({
      data: {
        titulo: data.titulo as string,
        descripcion: data.descripcion as string,
        tipo_evento: data.tipo_evento as any,
        fecha_inicio: new Date(data.fecha_inicio as string),
        fecha_fin: new Date(data.fecha_fin as string),
        lugar: data.lugar as string,
        es_publico: data.es_publico === 'on',
        observaciones: data.observaciones as string,
      }
    });

    revalidatePath("/lista/eventos");
    return { success: true, error: false, message: "Evento creado con éxito." };
  } catch (error) {
    console.error("Error al crear evento:", error);
    return { success: false, error: true, message: "Error del servidor al crear evento." };
  }
};

export const createMateria = async (currentState: ActionState, formData: FormData): Promise<ActionState> => {
  try {
    const data = Object.fromEntries(formData.entries());
    
    await prisma.materia.create({
      data: {
        nombre: data.nombre as string,
        descripcion: data.descripcion as string,
        maestroId: Number(data.maestroId),
      }
    });

    revalidatePath("/lista/trabajoSesiones");
    return { success: true, error: false, message: "Materia creada con éxito." };
  } catch (error) {
    console.error("Error al crear materia:", error);
    return { success: false, error: true, message: "Error del servidor al crear materia." };
  }
};