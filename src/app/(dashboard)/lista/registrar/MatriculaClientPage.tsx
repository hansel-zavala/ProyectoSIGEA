// src/app/(dashboard)/lista/registrar/MatriculaClientPage.tsx
"use client"; // <-- Esto lo define como un Componente de Cliente

import { useFormState } from "react-dom";
import { maestro } from "@prisma/client";
import { ActionState } from "@/lib/types";
import { createMatricula } from "@/lib/actions/create";
import MatriculaForm from "@/components/forms/MatriculaForm";
import SubmitButton from "@/components/SubmitButton";

// Definimos las props que recibirá este componente desde la página
type MatricularPageClientProps = {
  licenciados: maestro[];
};

const MatricularPageClient = ({ licenciados }: MatricularPageClientProps) => {
  const initialState: ActionState = { success: false, error: false, message: "" };
  const [state, formAction] = useFormState(createMatricula, initialState);

  return (
    <form action={formAction} className="bg-white p-6 rounded-lg shadow-md">
      {/* El componente del formulario visual */}
      <MatriculaForm licenciados={licenciados} />
      
      <div className="mt-8">
        <SubmitButton
          title="Completar Matrícula"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </div>
      {state.error && (
        <p className="text-red-500 text-sm mt-2">{state.message}</p>
      )}
    </form>
  );
};

export default MatricularPageClient;