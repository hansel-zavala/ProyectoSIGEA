// src/components/forms/MaestroForm.tsx
"use client";

import InputField from "@/components/InputField";
// --- CORRECCIÓN AQUÍ ---
import { maestro, maestros_estado, maestros_tipo_profesional, genero } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

type MaestroFormProps = {
    type: "create" | "update";
  // --- Y CORRECCIÓN AQUÍ ---
    data?: maestro;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const MaestroForm = ({ type, data, setOpen }: MaestroFormProps) => {
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
            {Object.values(genero).map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
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
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Tipo Profesional</label>
          <select
            name="tipo_profesional"
            className="p-2 border rounded-md"
            defaultValue={data?.tipo_profesional || ""}
          >
            <option value="">Seleccionar tipo</option>
            {Object.values(maestros_tipo_profesional).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Estado</label>
          <select name="estado" className="p-2 border rounded-md" defaultValue={data?.estado || "activo"}>
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
          defaultValue={data?.fecha_ingreso ? new Date(data.fecha_ingreso).toISOString().split('T')[0] : ""}
        />
      </div>
    </>
  );
};

export default MaestroForm;