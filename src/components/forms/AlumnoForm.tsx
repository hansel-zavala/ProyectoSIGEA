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
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<AlumnoSchema>({
    resolver: zodResolver(AlumnoValidationSchema),
    // React Hook Form ahora puede manejar los valores por defecto correctamente
    defaultValues: {
      ...data,
      // @ts-ignore - Convertimos las fechas a un formato que el input[type=date] entiende
      fecha_de_nacimiento: data?.fecha_de_nacimiento ? new Date(data.fecha_de_nacimiento).toISOString().split('T')[0] : "",
      fecha_evaluacion: data?.fecha_evaluacion ? new Date(data.fecha_evaluacion).toISOString().split('T')[0] : "",
    },
  });

  const usaMedicamentos = watch("usa_medicamentos");
  const tieneAlergias = watch("alergias");

  return (
    <div className="flex flex-col gap-4">
      {data?.id && <input type="hidden" {...register("id")} />}
      
      <h3 className="font-semibold text-gray-600 border-b pb-2">Datos Personales</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputField label="Nombre" name="nombre" register={register("nombre")} error={errors.nombre} />
        <InputField label="Apellido" name="apellido" register={register("apellido")} error={errors.apellido} />
        <InputField label="Fecha de Nacimiento" name="fecha_de_nacimiento" type="date" register={register("fecha_de_nacimiento")} error={errors.fecha_de_nacimiento} />
        <InputField label="Lugar de Nacimiento" name="lugar_de_nacimiento" register={register("lugar_de_nacimiento")} error={errors.lugar_de_nacimiento} />
        <InputField label="Dirección" name="direccion" register={register("direccion")} error={errors.direccion} />
        <InputField label="Teléfono Fijo" name="telefono_fijo" register={register("telefono_fijo")} error={errors.telefono_fijo} />
        <InputField label="Teléfono Móvil" name="telefono_movil" register={register("telefono_movil")} error={errors.telefono_movil} />
      </div>

      <h3 className="font-semibold text-gray-600 border-b pb-2 mt-4">Información Académica</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputField label="Institución de Procedencia" name="institucion_procedencia" register={register("institucion_procedencia")} error={errors.institucion_procedencia} />
         <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Jornada</label>
            <select {...register("jornada_actual")} className="p-2 border rounded-md">
                <option value="matutina">Matutina</option>
                <option value="vespertina">Vespertina</option>
            </select>
        </div>
        <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" {...register("recibio_evaluacion")} />
            <label>Recibió Evaluación</label>
        </div>
      </div>

      <h3 className="font-semibold text-gray-600 border-b pb-2 mt-4">Tipos de Atención</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2"><input type="checkbox" {...register("atencion_grupal")} /> <label>Grupal</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" {...register("atencion_individual")} /> <label>Individual</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" {...register("atencion_distancia")} /> <label>A Distancia</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" {...register("atencion_pre_vocacional")} /> <label>Pre-vocacional</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" {...register("atencion_vocacional")} /> <label>Vocacional</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" {...register("terapia_domicilio")} /> <label>Terapia a Domicilio</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" {...register("inclusion_escolar")} /> <label>Inclusión Escolar</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" {...register("educacion_fisica")} /> <label>Educación Física</label></div>
      </div>
      
      <h3 className="font-semibold text-gray-600 border-b pb-2 mt-4">Información Médica</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
            <input type="checkbox" {...register("usa_medicamentos")} />
            <label>Usa Medicamentos</label>
        </div>
        <InputField label="¿Cuáles?" name="medicamentos_detalle" register={register("medicamentos_detalle")} error={errors.medicamentos_detalle} inputProps={{ disabled: !usaMedicamentos }} />

        <div className="flex items-center gap-2">
            <input type="checkbox" {...register("alergias")} />
            <label>Es alérgico a algún medicamento</label>
        </div>
        <InputField label="¿A cuáles?" name="alergias_detalle" register={register("alergias_detalle")} error={errors.alergias_detalle} inputProps={{ disabled: !tieneAlergias }} />

        <div className="md:col-span-2">
            <InputField label="Observaciones Médicas" name="observaciones_medicas" type="textarea" register={register("observaciones_medicas")} error={errors.observaciones_medicas} />
        </div>
      </div>
    </div>
  );
};
export default AlumnoForm;