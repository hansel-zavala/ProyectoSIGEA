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
    a_o_de_ingreso: z.string().optional(),
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

// // Define el esquema para la entidad "teacher" (profesor)
// export const teacherSchema = z.object({
//     // Id opcional, string
//     id: z.string().optional(),
//     // Username, string con longitud entre 3 y 20 caracteres, obligatorio
//     username: z
//         .string()
//         .min(3, { message: "Username must be at least 3 characters long!" })
//         .max(20, { message: "Username must be at most 20 characters long!" }),
//     // Password, string con mínimo 8 caracteres, opcional o puede ser vacío
//     password: z
//         .string()
//         .min(8, { message: "Password must be at least 8 characters long!" })
//         .optional()
//         .or(z.literal("")),
//     // Nombre, string obligatorio con al menos 1 carácter
//     name: z.string().min(1, { message: "First name is required!" }),
//     // Apellido, string obligatorio con al menos 1 carácter
//     surname: z.string().min(1, { message: "Last name is required!" }),
//     // Email, string con formato email válido, opcional o puede ser vacío
//     email: z
//         .string()
//         .email({ message: "Invalid email address!" })
//         .optional()
//         .or(z.literal("")),
//     // Teléfono, string opcional
//     phone: z.string().optional(),
//     // Dirección, string obligatorio
//     address: z.string(),
//     // Imagen, string opcional (posiblemente URL)
//     img: z.string().optional(),
//     // Tipo de sangre, string obligatorio con al menos 1 carácter
//     bloodType: z.string().min(1, { message: "Blood Type is required!" }),
//     // Fecha de nacimiento, se convierte automáticamente a Date y es obligatorio
//     birthday: z.coerce.date({ message: "Birthday is required!" }),
//     // Sexo, solo puede ser "MALE" o "FEMALE"
//     sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
//     // Subjects, arreglo opcional de strings que representan ids de materias
//     subjects: z.array(z.string()).optional(), // subject ids
// });

// // Define el tipo TypeScript inferido para teacherSchema
// export type TeacherSchema = z.infer<typeof teacherSchema>;
