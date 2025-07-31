// src/components/forms/EventoForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { eventos, eventos_estado, eventos_tipo_evento } from "@prisma/client";
import InputField from "@/components/InputField";
import { Dispatch, SetStateAction } from "react"; // Importar tipos

// Define los tipos de los datos del formulario
type FormData = {
  id?: number;
  titulo: string;
  descripcion?: string;
  tipo_evento: eventos_tipo_evento;
  fecha_inicio: string;
  fecha_fin: string;
  lugar?: string;
  estado: eventos_estado;
  es_publico: boolean;
  observaciones?: string;
};

// CORREGIDO: Se añaden las props 'type' y 'setOpen'
type EventoFormProps = {
  type: "create" | "update";
  data?: eventos;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const formatDateTimeForInput = (date: Date | undefined | null) => {
  if (!date) return "";
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

const EventoForm = ({ data }: EventoFormProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      id: data?.id,
      titulo: data?.titulo || "",
      descripcion: data?.descripcion || "",
      tipo_evento: data?.tipo_evento || "otro",
      fecha_inicio: formatDateTimeForInput(data?.fecha_inicio),
      fecha_fin: formatDateTimeForInput(data?.fecha_fin),
      lugar: data?.lugar || "",
      estado: data?.estado || "planificado",
      es_publico: data?.es_publico ?? true,
      observaciones: data?.observaciones || "",
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data?.id && <input type="hidden" {...register("id")} />}

      <InputField
        label="Título del Evento"
        name="titulo"
        register={register("titulo", { required: "El título es obligatorio" })}
        error={errors.titulo}
      />

      <InputField
        label="Lugar"
        name="lugar"
        register={register("lugar")}
        error={errors.lugar}
      />

      <InputField
        label="Fecha y Hora de Inicio"
        name="fecha_inicio"
        type="datetime-local"
        register={register("fecha_inicio", { required: "La fecha de inicio es obligatoria" })}
        error={errors.fecha_inicio}
      />

      <InputField
        label="Fecha y Hora de Fin"
        name="fecha_fin"
        type="datetime-local"
        register={register("fecha_fin", { required: "La fecha de fin es obligatoria" })}
        error={errors.fecha_fin}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="tipo_evento" className="text-sm font-medium">Tipo de Evento</label>
        <select id="tipo_evento" {...register("tipo_evento")} className="p-2 border rounded-md">
          {Object.values(eventos_tipo_evento).map(tipo => (
            <option key={tipo} value={tipo}>{tipo.replace(/_/g, " ")}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="estado" className="text-sm font-medium">Estado</label>
        <select id="estado" {...register("estado")} className="p-2 border rounded-md">
          {Object.values(eventos_estado).map(est => (
            <option key={est} value={est}>{est}</option>
          ))}
        </select>
      </div>
      
      <div className="md:col-span-2">
        <InputField
          label="Descripción"
          name="descripcion"
          type="textarea"
          register={register("descripcion")}
          error={errors.descripcion}
        />
      </div>

      <div className="md:col-span-2">
        <InputField
          label="Observaciones"
          name="observaciones"
          type="textarea"
          register={register("observaciones")}
          error={errors.observaciones}
        />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="es_publico" {...register("es_publico")} className="h-4 w-4"/>
        <label htmlFor="es_publico" className="text-sm font-medium">¿Es un evento público?</label>
      </div>
    </div>
  );
};

export default EventoForm;