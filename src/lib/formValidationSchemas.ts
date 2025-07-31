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
// Este es el objeto que usarás en tus formularios
export const AlumnoValidationSchema = z.object({
  id: z.number().optional(),
  idusuario: z.string().max(100).optional().nullable(),
  nombre: z.string().min(1, "El nombre es obligatorio").max(50),
  apellido: z.string().min(1, "El apellido es obligatorio").max(50),
  fecha_de_nacimiento: z.coerce.date(),
  genero: z.enum(Object.values(genero) as [string, ...string[]]),
  documento_identidad: z.string().max(20).optional().nullable(),
  lugar_de_nacimiento: z.string().min(1, "El lugar de nacimiento es obligatorio").max(150),
  institucion_procedencia: z.string().min(1, "La institución es obligatoria").max(100),
  a_o_de_ingreso: z.coerce.number().optional().nullable(),
  estado: z.enum(Object.values(alumno_estado) as [string, ...string[]]).optional(),
  jornada_actual: z.enum(Object.values(alumno_jornada_actual) as [string, ...string[]]).optional(),
  recibio_evaluacion: z.boolean().optional(),
  fecha_evaluacion: z.coerce.date().optional().nullable(),
  usa_medicamentos: z.boolean().optional(),
  medicamentos_detalle: z.string().optional().nullable(),
  alergias: z.boolean().optional(),
  alergias_detalle: z.string().optional().nullable(),
  observaciones_medicas: z.string().optional().nullable(),
  maestro_actual_id: z.coerce.number().optional().nullable(),
});

// Este es el TIPO que se infiere del esquema de validación
export type AlumnoSchema = z.infer<typeof AlumnoValidationSchema>;

// --- ESQUEMA DE VALIDACIÓN PARA PADRE ---
export const PadreValidationSchema = z.object({
  id: z.number().optional(),
  idusuario: z.string().max(100).optional().nullable(),
  nombre: z.string().min(1, "El nombre es obligatorio").max(50),
  apellido: z.string().min(1, "El apellido es obligatorio").max(50),
  documento_identidad: z.string().max(20).optional().nullable(),
  tipo_parentesco: z.enum(Object.values(padre_tipo_parentesco) as [string, ...string[]]),
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
  tipo_profesional: z.enum(Object.values(maestros_tipo_profesional) as [string, ...string[]]),
  estado: z.enum(Object.values(maestros_estado) as [string, ...string[]]).optional(),
  fecha_ingreso: z.coerce.date().optional().nullable(),
});

export type MaestroSchema = z.infer<typeof MaestroValidationSchema>;