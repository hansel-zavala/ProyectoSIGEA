// src/components/forms/AlumnoForm.tsx
"use client";

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
  return (
    <div className="flex flex-col gap-4">
      {data?.id && <input type="hidden" name="id" value={data.id} />}
      
      <h3 className="font-semibold text-gray-600 border-b pb-2">Datos Personales</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputField label="Nombre" name="nombre" defaultValue={data?.nombre || ""} />
        <InputField label="Apellido" name="apellido" defaultValue={data?.apellido || ""} />
        <InputField label="Fecha de Nacimiento" name="fecha_de_nacimiento" type="date" defaultValue={data?.fecha_de_nacimiento ? new Date(data.fecha_de_nacimiento).toISOString().split('T')[0] : ""} />
        <InputField label="Lugar de Nacimiento" name="lugar_de_nacimiento" defaultValue={data?.lugar_de_nacimiento || ""} />
        <InputField label="Dirección" name="direccion" defaultValue={data?.direccion || ""} />
        <InputField label="Teléfono Fijo" name="telefono_fijo" defaultValue={data?.telefono_fijo || ""} />
        <InputField label="Teléfono Móvil" name="telefono_movil" defaultValue={data?.telefono_movil || ""} />
      </div>

      <h3 className="font-semibold text-gray-600 border-b pb-2 mt-4">Información Académica</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputField label="Institución de Procedencia" name="institucion_procedencia" defaultValue={data?.institucion_procedencia || ""} />
         <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Jornada</label>
            <select name="jornada_actual" className="p-2 border rounded-md" defaultValue={data?.jornada_actual || "matutina"}>
                <option value="matutina">Matutina</option>
                <option value="vespertina">Vespertina</option>
            </select>
        </div>
        <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" name="recibio_evaluacion" defaultChecked={data?.recibio_evaluacion || false} />
            <label>Recibió Evaluación</label>
        </div>
      </div>

      <h3 className="font-semibold text-gray-600 border-b pb-2 mt-4">Tipos de Atención</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2"><input type="checkbox" name="atencion_grupal" defaultChecked={data?.atencion_grupal || false} /> <label>Grupal</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" name="atencion_individual" defaultChecked={data?.atencion_individual || false} /> <label>Individual</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" name="atencion_distancia" defaultChecked={data?.atencion_distancia || false} /> <label>A Distancia</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" name="atencion_pre_vocacional" defaultChecked={data?.atencion_pre_vocacional || false} /> <label>Pre-vocacional</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" name="atencion_vocacional" defaultChecked={data?.atencion_vocacional || false} /> <label>Vocacional</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" name="terapia_domicilio" defaultChecked={data?.terapia_domicilio || false} /> <label>Terapia a Domicilio</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" name="inclusion_escolar" defaultChecked={data?.inclusion_escolar || false} /> <label>Inclusión Escolar</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" name="educacion_fisica" defaultChecked={data?.educacion_fisica || false} /> <label>Educación Física</label></div>
      </div>
      
      <h3 className="font-semibold text-gray-600 border-b pb-2 mt-4">Información Médica</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
            <input type="checkbox" name="usa_medicamentos" defaultChecked={data?.usa_medicamentos || false} />
            <label>Usa Medicamentos</label>
        </div>
        <InputField label="¿Cuáles?" name="medicamentos_detalle" defaultValue={data?.medicamentos_detalle || ""} />

        <div className="flex items-center gap-2">
            <input type="checkbox" name="alergias" defaultChecked={data?.alergias || false} />
            <label>Es alérgico a algún medicamento</label>
        </div>
        <InputField label="¿A cuáles?" name="alergias_detalle" defaultValue={data?.alergias_detalle || ""} />

        <div className="md:col-span-2">
            <InputField label="Observaciones Médicas" name="observaciones_medicas" type="textarea" defaultValue={data?.observaciones_medicas || ""} />
        </div>
      </div>
    </div>
  );
};
export default AlumnoForm;