// src/components/forms/PadreForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { PadreSchema, PadreValidationSchema } from "@/lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
// --- CORRECCIÓN AQUÍ ---
import { padre, padre_tipo_parentesco, genero } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

type PadreFormProps = {
  type: "create" | "update";
  // --- Y CORRECCIÓN AQUÍ ---
  data?: padre;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const PadreForm = ({ type, data, setOpen }: PadreFormProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<PadreSchema>({
    resolver: zodResolver(PadreValidationSchema),
    defaultValues: {
      ...data,
      // @ts-ignore
      fecha_de_nacimiento: data?.fecha_de_nacimiento ? new Date(data.fecha_de_nacimiento).toISOString().split('T')[0] : undefined,
    },
  });

  return (
    <>
      {data?.id && <input type="hidden" {...register("id")} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Nombre"
          name="nombre"
          register={register("nombre")}
          error={errors.nombre}
        />
        <InputField
          label="Apellido"
          name="apellido"
          register={register("apellido")}
          error={errors.apellido}
        />
        <InputField
          label="Documento de Identidad"
          name="documento_identidad"
          register={register("documento_identidad")}
          error={errors.documento_identidad}
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Tipo de Parentesco</label>
          <select
            {...register("tipo_parentesco")}
            className="p-2 border rounded-md"
            defaultValue={data?.tipo_parentesco ?? ''}
          >
            {Object.values(padre_tipo_parentesco).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <InputField
          label="Fecha de Nacimiento"
          name="fecha_de_nacimiento"
          type="date"
          register={register("fecha_de_nacimiento")}
          error={errors.fecha_de_nacimiento}
        />
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Género</label>
            <select {...register("genero")} className="p-2 border rounded-md" defaultValue={data?.genero ?? ''}>
                {Object.values(genero).map(g => <option key={g} value={g}>{g}</option>)}
            </select>
        </div>
        <InputField
            label="Teléfono Móvil"
            name="telefono_movil"
            register={register("telefono_movil")}
                error={errors.telefono_movil}
        />
        <InputField
            label="Email"
            name="email"
            type="email"
            register={register("email")}
            error={errors.email}
        />
        <div className="flex items-center gap-2">
            <input type="checkbox" {...register("activo")} defaultChecked={data?.activo ?? true} />
            <label>Activo</label>
        </div>
        </div>
    </>
    );
};

export default PadreForm;