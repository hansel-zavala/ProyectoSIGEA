// src/components/FormModal.tsx
"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction } from "react";

// Importa TODOS los formularios y acciones
import AlumnoForm from "./forms/AlumnoForm";
import MaestroForm from "./forms/MaestroForm";
import PadreForm from "./forms/PadreForm";
import EventoForm from "./forms/EventoForm";
import MateriaForm from "./forms/MateriaForm";
import LeccionForm from "./forms/LeccionForm";

import { createAlumno, createMaestro, createPadre, createEvento, createMateria, createLeccion } from "@/lib/actions/create";
import { updateAlumno, updateMaestro, updatePadre, updateEvento, updateMateria, updateLeccion } from "@/lib/actions/update";
// --- CORRECCIÓN AQUÍ: Importa deleteLeccion ---
import { deleteAlumno, deleteMaestro, deletePadre, deleteEvento, deleteMateria, deleteLeccion } from "@/lib/actions/delete";
import SubmitButton from "@/components/SubmitButton";
import { ActionState } from "@/lib/types"; // <-- Importa el tipo desde el archivo central

export type FormModalProps = {
  table: "maestro" | "alumno" | "padre" | "evento" | "materia" | "leccion";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
  relatedData?: any;
};

const FormBodyMap = {
  alumno: AlumnoForm,
  maestro: MaestroForm,
  padre: PadreForm,
  evento: EventoForm,
  materia: MateriaForm,
  leccion: LeccionForm,
};

const actionMap = {
  create: {
    alumno: createAlumno,
    maestro: createMaestro,
    padre: createPadre,
    evento: createEvento,
    materia: createMateria,
    leccion: createLeccion,
  },
  update: {
    alumno: updateAlumno,
    maestro: updateMaestro,
    padre: updatePadre,
    evento: updateEvento,
    materia: updateMateria,
    leccion: updateLeccion,
  },
  delete: {
    alumno: deleteAlumno,
    maestro: deleteMaestro,
    padre: deletePadre,
    evento: deleteEvento,
    materia: deleteMateria,
    leccion: deleteLeccion,
  },
};

// --- CORRECCIÓN AQUÍ: Se eliminó la declaración duplicada de ActionState ---

const FormModal = ({ table, type, data, id, relatedData }: FormModalProps) => {
  const [open, setOpen] = useState(false);
  const FormBody = FormBodyMap[table];

  const initialState: ActionState = { success: false, error: false, message: "" };
  const action = actionMap[type][table];
  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);
  
  const formTitle = type === "delete" ? "¿Estás seguro?" : `${type === "create" ? "Crear" : "Actualizar"} ${table}`;
  const buttonTitle = type === "delete" ? "Eliminar" : type === "create" ? "Crear" : "Actualizar";
  const buttonClass = type === "delete" ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600";

  return (
    <>
      <button onClick={() => setOpen(true)} className={`text-sm ${type === 'delete' ? 'text-red-500' : 'px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600'}`}>
        {type === "create" ? "Crear Nuevo" : type === 'update' ? 'Editar' : 'Eliminar'}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="p-8 bg-white rounded-md w-[90vw] md:max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 capitalize">{formTitle}</h2>
            <form action={formAction}>
              {type !== 'delete' && (
                <FormBody
                  data={data}
                  relatedData={relatedData}
                  type={type} 
                  setOpen={setOpen}
                />
              )}
              {type === 'delete' && <input type="hidden" name="id" value={id} />}
              <SubmitButton
                title={buttonTitle}
                className={`w-full mt-4 text-white font-bold py-2 px-4 rounded ${buttonClass}`}
              />
              {state.error && (
                <p className="text-red-500 text-sm mt-2">{state.message || "¡Algo salió mal!"}</p>
              )}
            </form>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;