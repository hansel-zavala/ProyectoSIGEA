// src/components/forms/MatriculaForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { MatriculaSchema, MatriculaValidationSchema } from "@/lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
import { maestro, padre_tipo_parentesco, genero } from "@prisma/client";

type MatriculaFormProps = {
  data?: MatriculaSchema;
  licenciados: maestro[];
};

const MatriculaForm = ({ licenciados, data }: MatriculaFormProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<MatriculaSchema>({
    resolver: zodResolver(MatriculaValidationSchema),
    defaultValues: data,
  });

  const usaMedicamentos = watch("usa_medicamentos");
  const tieneAlergias = watch("alergias");

  return (
    <div className="space-y-8">
      {/* SECCIÓN DATOS DEL ALUMNO */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
          1. Datos del Alumno (a)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InputField label="Nombres" name="nombreAlumno" register={register("nombreAlumno")} error={errors.nombreAlumno} />
          <InputField label="Apellidos" name="apellidoAlumno" register={register("apellidoAlumno")} error={errors.apellidoAlumno} />
          <InputField label="Fecha de Nacimiento" name="fecha_de_nacimiento" type="date" register={register("fecha_de_nacimiento")} error={errors.fecha_de_nacimiento} />
          <InputField label="Lugar de Nacimiento" name="lugar_de_nacimiento" register={register("lugar_de_nacimiento")} error={errors.lugar_de_nacimiento} />
          <InputField label="Dirección" name="direccion" register={register("direccion")} error={errors.direccion} />
           <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Género</label>
              <select {...register("genero")} className="p-2 border rounded-md">
                  {Object.values(genero).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              {errors.genero && <p className="text-xs text-red-500">{errors.genero.message}</p>}
          </div>
          <InputField label="Numero de Identidad" name="documento_identidad" register={register("documento_identidad")} error={errors.documento_identidad} />
          <InputField label="Institución de Procedencia" name="institucion_procedencia" register={register("institucion_procedencia")} error={errors.institucion_procedencia} />
        </div>
      </div>

      {/* SECCIÓN TIPOS DE ATENCIÓN */}
      <div>
        <h3 className="font-semibold text-gray-700 border-b pb-2 mt-4">2. Tipos de Atención</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
            <div className="flex items-center gap-2"><input type="checkbox" {...register("atencion_grupal")} /> <label>Grupal</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" {...register("atencion_individual")} /> <label>Individual</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" {...register("atencion_distancia")} /> <label>A Distancia</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" {...register("atencion_pre_vocacional")} /> <label>Pre-vocacional</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" {...register("atencion_vocacional")} /> <label>Vocacional</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" {...register("terapia_domicilio")} /> <label>Terapia a Domicilio</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" {...register("inclusion_escolar")} /> <label>Inclusión Escolar</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" {...register("educacion_fisica")} /> <label>Educación Física</label></div>
            <div className="flex items-center gap-2 pt-5"><input type="checkbox" {...register("recibio_evaluacion")} /> <label>Recibió evaluación</label></div>
        </div>
      </div>

      {/* SECCIÓN INFORMACIÓN MÉDICA */}
      <div>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
              3. Información Médica
          </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                  <input type="checkbox" {...register("usa_medicamentos")} />
                  <label>Usa medicamentos</label>
              </div>
              <InputField label="Cuales" name="medicamentos_detalle" register={register("medicamentos_detalle")} error={errors.medicamentos_detalle} inputProps={{ disabled: !usaMedicamentos }} />
              <div className="flex items-center gap-2">
                  <input type="checkbox" {...register("alergias")} />
                  <label>Es alérgico a algún medicamento u otro alérgeno</label>
              </div>
              <InputField label="A cuales" name="alergias_detalle" register={register("alergias_detalle")} error={errors.alergias_detalle} inputProps={{ disabled: !tieneAlergias }} />
              <div className="md:col-span-2">
                  <InputField label="Observaciones" name="observaciones_medicas" type="textarea" register={register("observaciones_medicas")} error={errors.observaciones_medicas} />
              </div>
          </div>
      </div>

      {/* SECCIÓN DATOS DEL PADRE */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
          4. Datos del Padre o Tutor
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField label="Nombre del Padre/Tutor" name="nombrePadre" register={register("nombrePadre")} error={errors.nombrePadre} />
            <InputField label="Apellido del Padre/Tutor" name="apellidoPadre" register={register("apellidoPadre")} error={errors.apellidoPadre} />
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Tipo de Parentesco</label>
                <select {...register("tipo_parentesco")} className="p-2 border rounded-md">
                    {Object.values(padre_tipo_parentesco).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                  {errors.tipo_parentesco && <p className="text-xs text-red-500">{errors.tipo_parentesco.message}</p>}
            </div>
            <InputField label="Dirección" name="direccionPadre" register={register("direccionPadre")} error={errors.direccionPadre} />
            <InputField label="Teléfono Fijo" name="telefono_fijo_padre" register={register("telefono_fijo_padre")} error={errors.telefono_fijo_padre} />
            <InputField label="Teléfono Móvil (Emergencia)" name="telefono_movil_padre" register={register("telefono_movil_padre")} error={errors.telefono_movil_padre} />
            <InputField label="Documento de Identidad" name="documento_identidad_padre" register={register("documento_identidad_padre")} error={errors.documento_identidad_padre} />
        </div>
      </div>

      {/* SECCIÓN ASIGNACIÓN DE LICENCIADO */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
          5. Asignación de Terapeuta
        </h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Licenciado / Terapeuta Principal</label>
          <select {...register("terapeutaPrincipalId")} className="p-2 border rounded-md">
            <option value="">Seleccione un licenciado</option>
            {licenciados.map(lic => (
              <option key={lic.id} value={lic.id}>{lic.nombre} {lic.apellido}</option>
            ))}
          </select>
          {errors.terapeutaPrincipalId && <p className="text-xs text-red-500">{errors.terapeutaPrincipalId.message}</p>}
        </div>
      </div>
    </div>
  );
};
export default MatriculaForm;