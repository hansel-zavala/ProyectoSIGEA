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
    
    // --- CORRECCIÓN AQUÍ ---
    // Preparamos los valores por defecto, convirtiendo null a undefined
    const defaultValues = data ? {
        ...data,
        idusuario: data.idusuario ?? undefined,
        documento_identidad: data.documento_identidad ?? undefined,
        a_o_de_ingreso: data.a_o_de_ingreso ?? undefined,
        estado: data.estado ?? undefined,
        jornada_actual: data.jornada_actual ?? undefined,
        fecha_evaluacion: data.fecha_evaluacion ? new Date(data.fecha_evaluacion).toISOString().split('T')[0] : undefined,
        medicamentos_detalle: data.medicamentos_detalle ?? undefined,
        alergias_detalle: data.alergias_detalle ?? undefined,
        observaciones_medicas: data.observaciones_medicas ?? undefined,
        maestro_actual_id: data.maestro_actual_id ?? undefined,
        fecha_de_nacimiento: data.fecha_de_nacimiento ? new Date(data.fecha_de_nacimiento).toISOString().split('T')[0] : undefined,
    } : {};


    const {
        register,
        formState: { errors },
    } = useForm<AlumnoSchema>({
        resolver: zodResolver(AlumnoValidationSchema),
        defaultValues: defaultValues, // Usamos los valores limpios
    });

    return (
        <>
            {data?.id && <input type="hidden" {...register("id")} />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField label="Nombre" name="nombre" register={register("nombre")} error={errors.nombre} />
                <InputField label="Apellido" name="apellido" register={register("apellido")} error={errors.apellido} />
                <InputField label="Fecha de Nacimiento" name="fecha_de_nacimiento" type="date" register={register("fecha_de_nacimiento")} error={errors.fecha_de_nacimiento} />
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Género</label>
                    <select {...register("genero")} className="p-2 border rounded-md" defaultValue={data?.genero ?? ''}>
                        {Object.values(genero).map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
                <InputField label="Documento de Identidad" name="documento_identidad" register={register("documento_identidad")} error={errors.documento_identidad} />
                <InputField label="Lugar de Nacimiento" name="lugar_de_nacimiento" register={register("lugar_de_nacimiento")} error={errors.lugar_de_nacimiento} />
                <InputField label="Institución de Procedencia" name="institucion_procedencia" register={register("institucion_procedencia")} error={errors.institucion_procedencia} />
                <InputField label="Año de Ingreso" name="a_o_de_ingreso" type="number" register={register("a_o_de_ingreso")} error={errors.a_o_de_ingreso} />
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Estado</label>
                    <select {...register("estado")} className="p-2 border rounded-md" defaultValue={data?.estado ?? ''}>
                        {Object.values(alumno_estado).map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Jornada Actual</label>
                    <select {...register("jornada_actual")} className="p-2 border rounded-md" defaultValue={data?.jornada_actual ?? ''}>
                        {Object.values(alumno_jornada_actual).map(j => <option key={j} value={j}>{j}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Maestro Actual</label>
                    <select {...register("maestro_actual_id")} className="p-2 border rounded-md" defaultValue={data?.maestro_actual_id ?? ''}>
                        <option value="">Seleccionar Maestro</option>
                        {relatedData?.maestros.map(m => (
                            <option key={m.id} value={m.id}>{m.nombre} {m.apellido}</option>
                        ))}
                    </select>
                </div>
                <InputField label="Fecha de Evaluación" name="fecha_evaluacion" type="date" register={register("fecha_evaluacion")} error={errors.fecha_evaluacion} />
                <div className="flex items-center gap-2">
                    <input type="checkbox" {...register("recibio_evaluacion")} />
                    <label>Recibió Evaluación</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" {...register("usa_medicamentos")} />
                    <label>Usa Medicamentos</label>
                </div>
                <InputField label="Detalle de Medicamentos" name="medicamentos_detalle" type="textarea" register={register("medicamentos_detalle")} error={errors.medicamentos_detalle} />
                <div className="flex items-center gap-2">
                    <input type="checkbox" {...register("alergias")} />
                    <label>Tiene Alergias</label>
                </div>
                <InputField label="Detalle de Alergias" name="alergias_detalle" type="textarea" register={register("alergias_detalle")} error={errors.alergias_detalle} />
                <InputField label="Observaciones Médicas" name="observaciones_medicas" type="textarea" register={register("observaciones_medicas")} error={errors.observaciones_medicas} />
            </div>
        </>
    );
};
export default AlumnoForm;