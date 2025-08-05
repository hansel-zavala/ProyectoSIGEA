// src/components/forms/PadreForm.tsx
"use client";

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
  return (
    <>
      {data?.id && <input type="hidden" name="id" value={data.id} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Nombre"
          name="nombre"
          defaultValue={data?.nombre || ""}
        />
        <InputField
          label="Apellido"
          name="apellido"
          defaultValue={data?.apellido || ""}
        />
        <InputField
          label="Documento de Identidad"
          name="documento_identidad"
          defaultValue={data?.documento_identidad || ""}
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Tipo de Parentesco</label>
          <select
            name="tipo_parentesco"
            className="p-2 border rounded-md"
            defaultValue={data?.tipo_parentesco || ""}
          >
            <option value="">Seleccionar tipo</option>
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
          defaultValue={data?.fecha_de_nacimiento ? new Date(data.fecha_de_nacimiento).toISOString().split('T')[0] : ""}
        />
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Género</label>
            <select name="genero" className="p-2 border rounded-md" defaultValue={data?.genero || ""}>
                <option value="">Seleccionar género</option>
                {Object.values(genero).map(g => <option key={g} value={g}>{g}</option>)}
            </select>
        </div>
        <InputField
            label="Teléfono Móvil"
            name="telefono_movil"
            defaultValue={data?.telefono_movil || ""}
        />
        <InputField
            label="Email"
            name="email"
            type="email"
            defaultValue={data?.email || ""}
        />
        <div className="flex items-center gap-2">
            <input type="checkbox" name="activo" defaultChecked={data?.activo ?? true} />
            <label>Activo</label>
        </div>
        </div>
    </>
    );
};

export default PadreForm;