// src/components/forms/AlumnoForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { AlumnoSchema, AlumnoValidationSchema } from "@/lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
import { alumno, maestro, alumno_estado, alumno_jornada_actual, genero } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

type AlumnoFormProps = {
    type: "create" | "update";
    data?: alumno;
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: {
        maestros: maestro[];
    };
};

const AlumnoForm = ({ type, data, setOpen, relatedData }: AlumnoFormProps) => {
    
    // --- CORRECCIÓN CLAVE ---
    // Preparamos los valores por defecto, convirtiendo null a undefined
    // y manteniendo las fechas como objetos Date.
    const defaultValues = data ? {
        ...data,
        idusuario: data.idusuario ?? undefined,
        documento_identidad: data.documento_identidad ?? undefined,
        estado: data.estado ?? undefined,
        jornada_actual: data.jornada_actual ?? undefined,
        fecha_evaluacion: data.fecha_evaluacion ?? undefined,
        medicamentos_detalle: data.medicamentos_detalle ?? undefined,
        alergias_detalle: data.alergias_detalle ?? undefined,
        observaciones_medicas: data.observaciones_medicas ?? undefined,
        maestro_actual_id: data.maestro_actual_id ?? undefined,
        direccion: data.direccion ?? undefined,
        telefono_fijo: data.telefono_fijo ?? undefined,
        telefono_movil: data.telefono_movil ?? undefined,
    } : {};

    const {
        register,
        watch,
        formState: { errors },
    } = useForm<AlumnoSchema>({
        resolver: zodResolver(AlumnoValidationSchema),
        defaultValues: defaultValues, // Usamos los valores limpios
    });

    const usaMedicamentos = watch("usa_medicamentos");
    const tieneAlergias = watch("alergias");

    // Función para formatear la fecha solo para el input
    const formatDateForInput = (date: Date | null | undefined) => {
        if (!date) return "";
        return new Date(date).toISOString().split('T')[0];
    };

    return (
      <div className="flex flex-col gap-4">
        {data?.id && <input type="hidden" {...register("id")} />}
        
        <h3 className="font-semibold text-gray-600 border-b pb-2">Datos Personales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField label="Nombre" name="nombre" register={register("nombre")} error={errors.nombre} />
            <InputField label="Apellido" name="apellido" register={register("apellido")} error={errors.apellido} />
            <InputField 
                label="Fecha de Nacimiento" 
                name="fecha_de_nacimiento" 
                type="date" 
                register={register("fecha_de_nacimiento")} 
                error={errors.fecha_de_nacimiento} 
                defaultValue={formatDateForInput(data?.fecha_de_nacimiento)}
            />
            <InputField label="Lugar de Nacimiento" name="lugar_de_nacimiento" register={register("lugar_de_nacimiento")} error={errors.lugar_de_nacimiento} />
            <InputField label="Dirección" name="direccion" register={register("direccion")} error={errors.direccion} />
            <InputField label="Teléfono Fijo" name="telefono_fijo" register={register("telefono_fijo")} error={errors.telefono_fijo} />
            <InputField label="Teléfono Móvil" name="telefono_movil" register={register("telefono_movil")} error={errors.telefono_movil} />
        </div>

        {/* ... (el resto del formulario no cambia) ... */}
        
      </div>
    );
};
export default AlumnoForm;