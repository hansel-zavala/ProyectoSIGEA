// Importa la librería Zod para validación y esquema de datos
import { z } from "zod";

// Define el esquema para la entidad "alumno" (estudiante)
export const alumnoSchema = z.object({
    // Id numérico opcional
    id: z.number().optional(),
    // Id de usuario opcional, string
    idusuario: z.string().optional(),
    // Nombre obligatorio, string con mínimo 1 carácter
    nombre: z.string().min(1, { message: "Nombre es requerido!" }),
    // Apellido obligatorio, string con mínimo 1 carácter
    apellido: z.string().min(1, { message: "Apellido es requerido!" }),
    // Fecha de nacimiento, convertido a Date y obligatorio
    fechaDeNacimiento: z.coerce.date({ message: "Fecha de nacimiento es requerida!" }),
    // Género, string opcional
    genero: z.string().optional(),
    // Documento de identidad, string opcional
    documentoIdentidad: z.string().optional(),
    // Lugar de nacimiento, string obligatorio
    lugarDeNacimiento: z.string().min(1, { message: "Lugar de nacimiento es requerido!" }),
    // Teléfono móvil, string opcional
    // telefonoMovil: z.string().optional(),
    // Email, string con formato email válido, opcional o vacío
    // email: z.string().email({ message: "Email inválido!" }).optional().or(z.literal("")),
    // Estado civil, string opcional
    // estadoCivil: z.string().optional(),
    // Institución de procedencia, string obligatorio
    institucionProcedencia: z.string().min(1, { message: "Institución de procedencia es requerida!" }),
    // Año de ingreso, string opcional
    a_o_de_ingreso: z.coerce.number().optional(),
    // Carrera, string opcional
    carrera: z.string().optional(),
    // Estado, puede ser uno de los valores del enum, opcional
    estado: z.enum(["activo", "inactivo", "graduado", "retirado"]).optional(),
    // Jornada actual, puede ser "matutina" o "vespertina", opcional
    jornadaActual: z.enum(["matutina", "vespertina"]).optional(),
    // Nombre de contacto de emergencia, string opcional
    // nombreContactoEmergencia: z.string().optional(),
    // Teléfono de emergencia, string opcional
    // telefonoEmergencia: z.string().optional(),
    // Booleano si recibió evaluación, opcional
    recibioEvaluacion: z.boolean().optional(),
    // Fecha de evaluación, convertido a Date, opcional
    fechaEvaluacion: z.coerce.date().optional(),
    // Booleano si usa medicamentos, opcional
    usaMedicamentos: z.boolean().optional(),
    // Detalle de medicamentos, string opcional
    medicamentosDetalle: z.string().optional(),
    // Booleano si tiene alergias, opcional
    alergias: z.boolean().optional(),
    // Detalle de alergias, string opcional
    alergiasDetalle: z.string().optional(),
    // Observaciones médicas, string opcional
    observacionesMedicas: z.string().optional(),
    // Id de dirección, número opcional
    direccionId: z.number().optional(),
    // Id del maestro actual, número opcional
    maestroActualId: z.number().optional(),
    // Campos de autenticación para creación pueden ir aquí si es necesario
});

// Define el tipo TypeScript inferido para alumnoSchema
export type AlumnoSchema = z.infer<typeof alumnoSchema>;

// Define el esquema para la entidad "maestro" (profesor)

export const padreSchema = z.object({
    id: z.number().optional(), // AUTO_INCREMENT
    idusuario: z.string().max(100).optional(), // UNIQUE, can be null initially
    nombre: z.string().min(1).max(50),
    apellido: z.string().min(1).max(50),
    documento_identidad: z.string().max(20).optional().nullable(),
    tipo_parentesco: z.enum(['madre', 'padre', 'tutor', 'guardian']),
    fecha_de_nacimiento: z.coerce.date().optional(),
    genero: z.string().max(10).optional().nullable(),
    lugar_de_nacimiento: z.string().max(150).optional().nullable(),
    telefono_movil: z.string().max(20).optional().nullable(),
    // telefono_trabajo: z.string().max(20).optional().nullable(),
    email: z.string().email().max(100).optional().nullable(),
    ocupacion: z.string().max(100).optional().nullable(),
    lugar_trabajo: z.string().max(150).optional().nullable(),
    estado_civil: z.string().max(20).optional().nullable(),
    // nivel_educativo: z.string().max(50).optional().nullable(),
    // ingresos_mensuales: z.coerce.number().optional().nullable(), // DECIMAL
    es_responsable_financiero: z.boolean().optional().default(true),
    es_contacto_emergencia: z.boolean().optional().default(true),
    direccion_casa_id: z.number().optional().nullable(),
    direccion_trabajo_id: z.number().optional().nullable(),
    activo: z.boolean().optional().default(true),
    fecha_creacion: z.coerce.date().optional(), // Usually managed by DB
    fecha_actualizacion: z.coerce.date().optional(), // Usually managed by DB
});

export type PadreSchema = z.infer<typeof padreSchema>;

export const maestroSchema = z.object({
  id: z.number().int().optional(), // assuming auto-increment primary key, optional on create
  idusuario: z.string().optional(), // might be unique user id, optional
  nombre: z.string().min(1, "Nombre is required"),
  apellido: z.string().min(1, "Apellido is required"),
  documento_identidad: z.string().optional().nullable(),
  fecha_de_nacimiento: z.string().optional().nullable(), // Could also be z.date(), but often dates come as strings
  genero: z.string().optional().nullable(),
  telefono_movil: z.string().optional().nullable(),
  telefono_trabajo: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  tipo_profesional: z.string().optional().nullable(),
  numero_licencia: z.string().optional().nullable(),
  universidad_graduacion: z.string().optional().nullable(),
  años_experiencia: z.number().int().optional().nullable(),
  direccion_id: z.number().int().optional().nullable(),
  estado: z.string().optional().nullable(),
  fecha_ingreso: z.string().optional().nullable(),
  fecha_creacion: z.string().optional().nullable(),
  fecha_actualizacion: z.string().optional().nullable(),
//   imagen: z.string().optional()
});

export type MaestroSchema = z.infer<typeof maestroSchema>;