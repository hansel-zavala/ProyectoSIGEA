// src/components/forms/MateriaForm.tsx
"use client";

import { useForm } from "react-hook-form";
// --- CORRECCIÓN AQUÍ ---
import { Materia, maestro } from "@prisma/client";
import InputField from "@/components/InputField";
import { Dispatch, SetStateAction } from "react";

type FormData = {
  id?: string;
  nombre: string;
  descripcion?: string;
  maestroId: string;
};

type MateriaFormProps = {
  type: "create" | "update";
  data?: Materia;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: {
    // --- Y CORRECCIÓN AQUÍ ---
    maestros: maestro[];
  };
};

const MateriaForm = ({ data, relatedData, setOpen, type }: MateriaFormProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      id: data?.id,
      nombre: data?.nombre || "",
      descripcion: data?.descripcion || "",
      maestroId: data?.maestroId ? String(data.maestroId) : "",
    },
  });

  return (
    <>
      {data?.id && <input type="hidden" {...register("id")} />}

      <InputField
        label="Nombre de la Materia"
        name="nombre"
        register={register("nombre", { required: "El nombre es obligatorio" })}
        error={errors.nombre}
      />
      <InputField
        label="Descripción"
        name="descripcion"
        type="textarea"
        register={register("descripcion")}
        error={errors.descripcion}
      />
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="maestroId" className="text-sm font-medium">
          Maestro Asignado
        </label>
        <select
          id="maestroId"
          {...register("maestroId", {
            required: "Debes seleccionar un maestro",
          })}
          className="p-2 border rounded-md"
          defaultValue={data?.maestroId ? String(data.maestroId) : ""}
        >
          <option value="" disabled>
            Selecciona un maestro
          </option>
          {relatedData?.maestros?.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nombre} {m.apellido}
            </option>
          ))}
        </select>
        {errors.maestroId && (
          <p className="text-xs text-red-400">{errors.maestroId.message}</p>
        )}
      </div>
    </>
  );
};

export default MateriaForm;