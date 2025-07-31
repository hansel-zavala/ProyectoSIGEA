  "use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Prisma } from "@prisma/client";

// Importa los formularios
import AlumnoForm from "./forms/AlumnoForm";
import MaestroForm from "./forms/MaestroForm";
import PadreForm from "./forms/PadreForm";
import EventoForm from "./forms/EventoForm";
import MateriaForm from "./forms/MateriaForm"; // <--- 1. IMPORTAR FORMULARIO DE MATERIA

// Importa las acciones del servidor
import {
    createAlumno, createMaestro, createPadre, createEvento,
  createMateria, // <--- 2. IMPORTAR ACCIÓN DE CREAR MATERIA
} from "@/lib/actions/create";
import {
    updateAlumno, updateMaestro, updatePadre, updateEvento,
  updateMateria, // <--- 3. IMPORTAR ACCIÓN DE ACTUALIZAR MATERIA
} from "@/lib/actions/update";
import {
    deleteAlumno, deleteMaestro, deletePadre, deleteEvento,
  deleteMateria, // <--- 4. IMPORTAR ACCIÓN DE ELIMINAR MATERIA
} from "@/lib/actions/delete";

import SubmitButton from "@/components/SubmitButton";

type FormModalProps = {
    table: "maestro" | "alumno" | "padre" | "evento" | "materia";
    type: "create" | "update" | "delete";
    data?: any;
    id?: number | string;
    relatedData?: any;
};

// Objeto que mapea nombres de tablas a componentes de formulario
const FormBodyMap = {
    alumno: AlumnoForm,
    maestro: MaestroForm,
    padre: PadreForm,
    evento: EventoForm,
  materia: MateriaForm, // <--- 5. CORRECCIÓN: Añadir materia al mapa
};

// Objeto que mapea nombres de tablas a acciones de creación
const createActionMap = {
  alumno: createAlumno,
  maestro: createMaestro,
  padre: createPadre,
  evento: createEvento,
  materia: createMateria, // <--- 6. CORRECCIÓN: Añadir materia al mapa
};

// Objeto que mapea nombres de tablas a acciones de actualización
const updateActionMap = {
  alumno: updateAlumno,
  maestro: updateMaestro,
  padre: updatePadre,
  evento: updateEvento,
  materia: updateMateria, // <--- 7. CORRECCIÓN: Añadir materia al mapa
};

// Objeto que mapea nombres de tablas a acciones de eliminación
const deleteActionMap = {
  alumno: deleteAlumno,
  maestro: deleteMaestro,
  padre: deletePadre,
  evento: deleteEvento,
  materia: deleteMateria, // <--- 8. CORRECCIÓN: Añadir materia al mapa
};

type CurrentState = {
  success: boolean;
  error: boolean;
};

const FormModal = ({ table, type, data, id, relatedData }: FormModalProps) => {
  const [open, setOpen] = useState(false);
  const FormBody = FormBodyMap[table];

  if (type === "create" || type === "update") {
    const Form = () => {
      const [state, formAction] = useFormState(
        type === "create" ? createActionMap[table] : updateActionMap[table],
        { success: false, error: false }
      );

      useEffect(() => {
        if (state.success) setOpen(false);
      }, [state.success]);

      return (
        <form action={formAction}>
          {/* CORRECCIÓN AQUÍ: Pasa las propiedades 'type' y 'setOpen' */}
          <FormBody data={data} relatedData={relatedData} type={type} setOpen={setOpen} />
          <SubmitButton
            title={type === "create" ? "Crear" : "Actualizar"}
            className="w-full mt-4 bg-lamaBlue"
          />
          {state.error && (
            <p className="text-red-500 text-sm mt-2">¡Algo salió mal!</p>
          )}
        </form>
      );
    };

    return (
      <>
        <button onClick={() => setOpen(true)} className="text-sm">
          {type === "create" ? "Crear Nuevo" : "Editar"}
        </button>
        {open && (
          <div className="fixed inset-0 z-50 bg-black/70">
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-md w-[90vw] md:w-auto">
              <h2 className="text-xl font-semibold mb-4 capitalize">
                {type} {table}
              </h2>
              <Form />
              <button
                className="absolute top-4 right-4"
                onClick={() => setOpen(false)}
              >
                X
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  if (type === "delete") {
    const Form = () => {
      // La línea 107 ahora funcionará porque deleteActionMap incluye "materia"
      const [state, formAction] = useFormState(deleteActionMap[table], {
        success: false,
        error: false,
      });

      return (
        <form action={formAction}>
          <input type="hidden" name="id" value={id} />
          <SubmitButton
            title="Eliminar"
            className="w-full mt-4 bg-red-400"
          />
        </form>
      );
    };


    return (
      <>
        <button onClick={() => setOpen(true)} className="text-sm text-red-500">
          Eliminar
        </button>
        {open && (
          <div className="fixed inset-0 z-50 bg-black/70">
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-md w-[90vw] md:w-auto">
              <h2 className="text-xl font-semibold mb-4 capitalize">
                ¿Estás seguro?
              </h2>
              <Form />
              <button
                className="absolute top-4 right-4"
                onClick={() => setOpen(false)}
              >
                X
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};


export default FormModal;