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

// --- ESQUEMA DE VALIDACIÓN PARA ALUMNO (VERSIÓN FINAL) ---
export const AlumnoValidationSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  fecha_de_nacimiento: z.coerce.date(),
  lugar_de_nacimiento: z.string().min(1, "El lugar de nacimiento es obligatorio"),
  direccion: z.string().optional().nullable(),
  telefono_fijo: z.string().optional().nullable(),
  telefono_movil: z.string().optional().nullable(),
  genero: z.nativeEnum(genero),
  institucion_procedencia: z.string().min(1, "La institución es obligatoria"),
  jornada_actual: z.nativeEnum(alumno_jornada_actual).optional(),
  recibio_evaluacion: z.boolean().optional(),
  usa_medicamentos: z.boolean().optional(),
  medicamentos_detalle: z.string().optional().nullable(),
  alergias: z.boolean().optional(),
  alergias_detalle: z.string().optional().nullable(),
  observaciones_medicas: z.string().optional().nullable(),
  atencion_grupal: z.boolean().optional(),
  atencion_individual: z.boolean().optional(),
  atencion_distancia: z.boolean().optional(),
  atencion_pre_vocacional: z.boolean().optional(),
  atencion_vocacional: z.boolean().optional(),
  terapia_domicilio: z.boolean().optional(),
  inclusion_escolar: z.boolean().optional(),
  educacion_fisica: z.boolean().optional(),
  // --- CAMPOS QUE NO ESTÁN EN EL FORMULARIO PERO SÍ EN EL TIPO ---
  // Los hacemos opcionales para que la validación no falle
  idusuario: z.string().optional().nullable(),
  documento_identidad: z.string().optional().nullable(),
  estado: z.nativeEnum(alumno_estado).optional(),
  fecha_evaluacion: z.coerce.date().optional().nullable(),
  maestro_actual_id: z.coerce.number().optional().nullable(),
  padreId: z.number().optional().nullable(),
});

export type AlumnoSchema = z.infer<typeof AlumnoValidationSchema>;

export const MatriculaValidationSchema = z.object({
  // --- Campos del Alumno ---
  nombreAlumno: z.string().min(1, "El nombre del alumno es obligatorio"),
  apellidoAlumno: z.string().min(1, "El apellido del alumno es obligatorio"),
  fecha_de_nacimiento: z.coerce.date({required_error: "La fecha de nacimiento es obligatoria"}),
  lugar_de_nacimiento: z.string().min(1, "El lugar de nacimiento es obligatorio"),
  direccion: z.string().optional().nullable(),
  telefono_fijo: z.string().regex(/^[0-9-]*$/, "Solo se permiten números y guiones").optional().nullable(),
  telefono_movil: z.string().regex(/^[0-9-]*$/, "Solo se permiten números y guiones").optional().nullable(),
  institucion_procedencia: z.string().min(1, "La institución es obligatoria"),
  recibio_evaluacion: z.boolean().optional(),
  usa_medicamentos: z.boolean().optional(),
  medicamentos_detalle: z.string().optional().nullable(),
  alergias: z.boolean().optional(),
  alergias_detalle: z.string().optional().nullable(),
  observaciones_medicas: z.string().optional().nullable(),
  genero: z.nativeEnum(genero),

  // --- Campos del Padre ---
  nombrePadre: z.string().min(1, "El nombre del padre es obligatorio"),
  apellidoPadre: z.string().min(1, "El apellido del padre es obligatorio"),
  direccionPadre: z.string().optional().nullable(),
  telefono_fijo_padre: z.string().regex(/^[0-9-]*$/, "Solo se permiten números y guiones").optional().nullable(),
  telefono_movil_padre: z.string().regex(/^[0-9-]*$/, "Solo se permiten números y guiones").optional().nullable(),
  documento_identidad_padre: z.string().optional().nullable(),
  tipo_parentesco: z.nativeEnum(padre_tipo_parentesco),

  // --- Campo del Licenciado ---
  terapeutaPrincipalId: z.coerce.number({invalid_type_error: "Debe seleccionar un licenciado"}).min(1, "Debes asignar un licenciado"),
});

export type MatriculaSchema = z.infer<typeof MatriculaValidationSchema>;

// --- OTROS ESQUEMAS ---
export const PadreValidationSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  documento_identidad: z.string().optional().nullable(),
  tipo_parentesco: z.nativeEnum(padre_tipo_parentesco),
  direccion: z.string().optional().nullable(),
  profesion: z.string().optional().nullable(),
  lugar_trabajo: z.string().optional().nullable(),
  telefono_fijo: z.string().optional().nullable(),
  telefono_movil: z.string().optional().nullable(),
  email: z.string().email("El email debe ser válido").optional().nullable(),
  fecha_de_nacimiento: z.coerce.date().optional().nullable(),
  genero: z.nativeEnum(genero).optional(),
  // Campos opcionales que pueden estar en el modelo
  idusuario: z.string().optional().nullable(),
  activo: z.boolean().optional(),
});
export type PadreSchema = z.infer<typeof PadreValidationSchema>;

export const MaestroValidationSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  documento_identidad: z.string().min(1, "El documento de identidad es obligatorio"),
  fecha_de_nacimiento: z.coerce.date().optional().nullable(),
  genero: z.nativeEnum(genero).optional(),
  telefono_movil: z.string().min(1, "El teléfono móvil es obligatorio"),
  email: z.string().email("El email debe ser válido").min(1, "El email es obligatorio"),
  tipo_profesional: z.nativeEnum(maestros_tipo_profesional),
  estado: z.nativeEnum(maestros_estado).optional(),
  fecha_ingreso: z.coerce.date().optional().nullable(),
  // Campos opcionales que pueden estar en el modelo
  idusuario: z.string().optional().nullable(),
});
export type MaestroSchema = z.infer<typeof MaestroValidationSchema>;

