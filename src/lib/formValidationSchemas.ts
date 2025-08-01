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
  idusuario: z.string().max(100).optional().nullable(),
  nombre: z.string().min(1, "El nombre es obligatorio").max(50),
  apellido: z.string().min(1, "El apellido es obligatorio").max(50),
  fecha_de_nacimiento: z.coerce.date(),
  genero: z.nativeEnum(genero), // <-- CORRECCIÓN CLAVE
  documento_identidad: z.string().max(20).optional().nullable(),
  lugar_de_nacimiento: z.string().min(1, "El lugar de nacimiento es obligatorio").max(150),
  institucion_procedencia: z.string().min(1, "La institución es obligatoria").max(100),
  a_o_de_ingreso: z.coerce.number().optional().nullable(),
  estado: z.nativeEnum(alumno_estado).optional(), // <-- CORRECCIÓN CLAVE
  jornada_actual: z.nativeEnum(alumno_jornada_actual).optional(), // <-- CORRECCIÓN CLAVE
  recibio_evaluacion: z.boolean().optional(),
  fecha_evaluacion: z.coerce.date().optional().nullable(),
  usa_medicamentos: z.boolean().optional(),
  medicamentos_detalle: z.string().optional().nullable(),
  alergias: z.boolean().optional(),
  alergias_detalle: z.string().optional().nullable(),
  observaciones_medicas: z.string().optional().nullable(),
  maestro_actual_id: z.coerce.number().optional().nullable(),
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

