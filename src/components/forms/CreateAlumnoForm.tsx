// src/components/forms/CreateAlumnoForm.tsx
"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createAlumno } from "@/lib/actions/create";
import { maestro } from "@prisma/client";
import AlumnoForm from "./AlumnoForm"; // El componente con los campos
import SubmitButton from "../SubmitButton";

type CreateAlumnoFormProps = {
  relatedData: {
    maestros: maestro[];
  };
};

const CreateAlumnoForm = ({ relatedData }: CreateAlumnoFormProps) => {
  const initialState = { success: false, error: false, message: "" };
  // useFormState conecta el formulario a la Server Action
  const [state, formAction] = useFormState(createAlumno, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      // Redirige si el alumno se crea con éxito
      router.push("/lista/alumnos");
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="bg-white p-6 rounded-lg shadow-md">
      {/* AlumnoForm ahora solo muestra los campos */}
      <AlumnoForm
  relatedData={relatedData}
  type="create"
  setOpen={() => {}} // Pasamos una función vacía porque no hay modal que cerrar
/>
      <div className="mt-6">
        <SubmitButton
          title="Registrar Alumno"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        />
      </div>
      {state.error && (
        <p className="text-red-500 text-sm mt-2">{state.message}</p>
      )}
    </form>
  );
};

export default CreateAlumnoForm;