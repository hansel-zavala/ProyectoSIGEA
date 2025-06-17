import { z } from "zod";

// Schema for alumno (student) - matching database schema exactly
export const alumnoSchema = z.object({
    id: z.number().optional(),
    idusuario: z.string().max(100).optional(),
    nombre: z.string().min(1).max(50),
    apellido: z.string().min(1).max(50),
    fecha_de_nacimiento: z.coerce.date(),
    genero: z.enum(["masculino", "femenino"]).optional(),
    documento_identidad: z.string().max(20).optional(),
    lugar_de_nacimiento: z.string().min(1).max(150),
    institucion_procedencia: z.string().min(1).max(100),
    a_o_de_ingreso: z.coerce.number().optional(),
    estado: z.enum(["activo", "inactivo", "graduado", "retirado"]).optional(),
    jornada_actual: z.enum(["matutina", "vespertina"]).optional(),
    recibio_evaluacion: z.boolean().optional(),
    fecha_evaluacion: z.coerce.date().optional(),
    usa_medicamentos: z.boolean().optional(),
    medicamentos_detalle: z.string().optional(),
    alergias: z.boolean().optional(),
    alergias_detalle: z.string().optional(),
    observaciones_medicas: z.string().optional(),
    maestro_actual_id: z.number().optional(),
    fecha_creacion: z.coerce.date().optional(),
    fecha_actualizacion: z.coerce.date().optional(),
});

export type AlumnoSchema = z.infer<typeof alumnoSchema>;

// Schema for padre (parent) - matching database schema exactly
export const padreSchema = z.object({
    id: z.number().optional(),
    idusuario: z.string().max(100).optional(),
    nombre: z.string().min(1).max(50),
    apellido: z.string().min(1).max(50),
    documento_identidad: z.string().max(20).optional(),
    tipo_parentesco: z.enum(['madre', 'padre', 'tutor', 'guardian']),
    fecha_de_nacimiento: z.coerce.date().optional(),
    genero: z.string().max(10).optional(),
    telefono_movil: z.string().max(20).optional(),
    email: z.string().email().max(100).optional(),
    activo: z.boolean().optional(),
    fecha_creacion: z.coerce.date().optional(),
    fecha_actualizacion: z.coerce.date().optional(),
});

export type PadreSchema = z.infer<typeof padreSchema>;

// Schema for maestro (teacher) - matching database schema exactly
export const maestroSchema = z.object({
    id: z.number().optional(),
    idusuario: z.string().max(100).optional(),
    nombre: z.string().min(1).max(50),
    apellido: z.string().min(1).max(50),
    documento_identidad: z.string().min(1).max(20),
    fecha_de_nacimiento: z.coerce.date().optional(),
    genero: z.string().max(10).optional(),
    telefono_movil: z.string().min(1).max(20),
    email: z.string().email().min(1).max(100),
    tipo_profesional: z.enum(['psicologo', 'terapeuta', 'ambos']),
    estado: z.enum(['activo', 'inactivo', 'vacaciones']).optional(),
    fecha_ingreso: z.coerce.date().optional(),
    fecha_creacion: z.coerce.date().optional(),
    fecha_actualizacion: z.coerce.date().optional(),
});

export type MaestroSchema = z.infer<typeof maestroSchema>;