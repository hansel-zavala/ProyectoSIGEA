// src/components/forms/RegistrarAlumnoForm.tsx
"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AlumnoForm from "./AlumnoForm";
import SubmitButton from "../SubmitButton";
import { createAlumno } from "@/lib/actions/create";
import { maestro } from "@prisma/client";
import { ActionState } from "@/lib/types"; // Importa el tipo de estado

type RegistrarAlumnoFormProps = {
  relatedData: {
    maestros: maestro[];
  };
};

const RegistrarAlumnoForm = ({ relatedData }: RegistrarAlumnoFormProps) => {
  // --- CORRECCIÓN 1: Añade 'message' al estado inicial ---
  const initialState: ActionState = { success: false, error: false, message: "" };
  const [state, formAction] = useFormState(createAlumno, initialState);

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/lista/alumnos");
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="bg-white p-6 rounded-lg shadow-md">
      {/* --- CORRECCIÓN 2: Añade las props que faltan a AlumnoForm --- */}
      <AlumnoForm
        relatedData={relatedData}
        type="create"
        setOpen={() => {}} // Pasamos una función vacía porque no hay modal
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

export default RegistrarAlumnoForm;