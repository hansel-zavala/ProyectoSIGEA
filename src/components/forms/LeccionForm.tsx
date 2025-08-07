// src/components/forms/LeccionForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { LeccionSchema, LeccionValidationSchema } from "@/lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
import type { Leccion } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

type LeccionFormProps = {
  type: "create" | "update";
  data?: Leccion;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const LeccionForm = ({ type, data, setOpen }: LeccionFormProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<LeccionSchema>({
    resolver: zodResolver(LeccionValidationSchema),
    defaultValues: data || {},
  });

  return (
    <div className="flex flex-col gap-4">
      {data?.id && <input type="hidden" {...register("id")} />}
      
      <InputField 
        label="Título de la Lección" 
        name="titulo" 
        register={register("titulo")} 
        error={errors.titulo} 
      />
      <InputField 
        label="Categoría (Ej: Sensorial, Lenguaje)" 
        name="categoria" 
        register={register("categoria")} 
        error={errors.categoria} 
      />
      <InputField 
        label="Objetivo de la Lección" 
        name="objetivo" 
        type="textarea"
        register={register("objetivo")} 
        error={errors.objetivo} 
      />
      <InputField 
        label="Habilidades Clave (Ej: Contacto visual, Motricidad fina)" 
        name="habilidades_clave" 
        type="textarea"
        register={register("habilidades_clave")} 
        error={errors.habilidades_clave} 
      />
      <InputField 
        label="Descripción Detallada (Cómo se realiza)" 
        name="descripcion" 
        type="textarea"
        register={register("descripcion")} 
        error={errors.descripcion} 
      />
    </div>
  );
};
export default LeccionForm;