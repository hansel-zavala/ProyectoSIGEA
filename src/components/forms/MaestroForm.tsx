// src/components/forms/MaestroForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { MaestroSchema, MaestroValidationSchema } from "@/lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
// --- CORRECCIÓN AQUÍ ---
import { maestro, maestros_estado, maestros_tipo_profesional } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

type MaestroFormProps = {
    type: "create" | "update";
  // --- Y CORRECCIÓN AQUÍ ---
    data?: maestro;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const MaestroForm = ({ type, data, setOpen }: MaestroFormProps) => {
    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<MaestroSchema>({
    resolver: zodResolver(MaestroValidationSchema),
    defaultValues: {
        ...data,
      // @ts-ignore
        fecha_de_nacimiento: data?.fecha_de_nacimiento ? new Date(data.fecha_de_nacimiento).toISOString().split('T')[0] : undefined,
      // @ts-ignore
        fecha_ingreso: data?.fecha_ingreso ? new Date(data.fecha_ingreso).toISOString().split('T')[0] : undefined,
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
        <InputField
            label="Fecha de Nacimiento"
            name="fecha_de_nacimiento"
            type="date"
            register={register("fecha_de_nacimiento")}
            error={errors.fecha_de_nacimiento}
        />
        <InputField
          label="Género"
          name="genero"
          register={register("genero")}
          error={errors.genero}
        />
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
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Tipo Profesional</label>
          <select
            {...register("tipo_profesional")}
            className="p-2 border rounded-md"
            defaultValue={data?.tipo_profesional ?? ''}
          >
            {Object.values(maestros_tipo_profesional).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Estado</label>
          <select {...register("estado")} className="p-2 border rounded-md" defaultValue={data?.estado ?? ''}>
            {Object.values(maestros_estado).map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <InputField
          label="Fecha de Ingreso"
          name="fecha_ingreso"
          type="date"
          register={register("fecha_ingreso")}
          error={errors.fecha_ingreso}
        />
      </div>
    </>
  );
};

export default MaestroForm;