// src/lib/formValidationSchemas.ts

import { z } from "zod";
import {
  alumno_estado,
  alumno_jornada_actual,
  genero,
  padre_tipo_parentesco,
  maestros_tipo_profesional,
  maestros_estado
} from "@prisma/client";

// --- ESQUEMA DE VALIDACIÓN PARA ALUMNO ---
export const AlumnoValidationSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  fecha_de_nacimiento: z.coerce.date(),
  lugar_de_nacimiento: z.string().min(1, "El lugar de nacimiento es obligatorio"),
  
  // --- NUEVOS CAMPOS Y REGLAS DE VALIDACIÓN ---
  direccion: z.string().optional().nullable(),
  telefono_fijo: z.string().regex(/^[0-9]*$/, "Solo se permiten números").optional().nullable(),
  telefono_movil: z.string().regex(/^[0-9]*$/, "Solo se permiten números").optional().nullable(),
  documento_identidad: z.string().regex(/^[0-9]*$/, "Solo se permiten números").optional().nullable(),
  
  institucion_procedencia: z.string().min(1, "La institución es obligatoria"),
  jornada_actual: z.nativeEnum(alumno_jornada_actual).optional(),
  recibio_evaluacion: z.boolean().optional(),
  
  // Tipos de atención
  atencion_grupal: z.boolean().optional(),
  atencion_individual: z.boolean().optional(),
  atencion_distancia: z.boolean().optional(),
  atencion_pre_vocacional: z.boolean().optional(),
  atencion_vocacional: z.boolean().optional(),
  terapia_domicilio: z.boolean().optional(),
  inclusion_escolar: z.boolean().optional(),
  educacion_fisica: z.boolean().optional(),

  // Información Médica
  usa_medicamentos: z.boolean().optional(),
  medicamentos_detalle: z.string().optional().nullable(),
  alergias: z.boolean().optional(),
  alergias_detalle: z.string().optional().nullable(),
  observaciones_medicas: z.string().optional().nullable(),
  
  // Otros campos (se mantienen por consistencia del tipo)
  genero: z.nativeEnum(genero),
  estado: z.nativeEnum(alumno_estado).optional(),
  fecha_evaluacion: z.coerce.date().optional().nullable(),
  maestro_actual_id: z.coerce.number().optional().nullable(),
  padreId: z.number().optional().nullable(),
});

export type AlumnoSchema = z.infer<typeof AlumnoValidationSchema>;

// --- ESQUEMA DE VALIDACIÓN PARA PADRE ---
export const PadreValidationSchema = z.object({
  id: z.number().optional(),
  idusuario: z.string().max(100).optional().nullable(),
  nombre: z.string().min(1, "El nombre es obligatorio").max(50),
  apellido: z.string().min(1, "El apellido es obligatorio").max(50),
  documento_identidad: z.string().max(20).optional().nullable(),
  tipo_parentesco: z.nativeEnum(padre_tipo_parentesco), // <-- CORRECCIÓN CLAVE
  fecha_de_nacimiento: z.coerce.date().optional().nullable(),
  genero: z.string().max(10).optional().nullable(),
  telefono_movil: z.string().max(20).optional().nullable(),
  email: z.string().email("Email inválido").max(100).optional().nullable(),
  activo: z.boolean().optional(),
});

export type PadreSchema = z.infer<typeof PadreValidationSchema>;

// --- ESQUEMA DE VALIDACIÓN PARA MAESTRO ---
export const MaestroValidationSchema = z.object({
  id: z.number().optional(),
  idusuario: z.string().max(100).optional().nullable(),
  nombre: z.string().min(1, "El nombre es obligatorio").max(50),
  apellido: z.string().min(1, "El apellido es obligatorio").max(50),
  documento_identidad: z.string().min(1, "El documento es obligatorio").max(20),
  fecha_de_nacimiento: z.coerce.date().optional().nullable(),
  genero: z.string().max(10).optional().nullable(),
  telefono_movil: z.string().min(1, "El teléfono es obligatorio").max(20),
  email: z.string().email("Email inválido").min(1).max(100),
  tipo_profesional: z.nativeEnum(maestros_tipo_profesional),
  estado: z.nativeEnum(maestros_estado).optional(),
  fecha_ingreso: z.coerce.date().optional().nullable(),
});

export type MaestroSchema = z.infer<typeof MaestroValidationSchema>;

