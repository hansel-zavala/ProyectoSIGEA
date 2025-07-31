// src/components/SubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  title: string;
  className?: string;
};

const SubmitButton = ({ title, className }: SubmitButtonProps) => {
  // El hook useFormStatus nos da el estado del formulario
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending} // Deshabilita el botón mientras se envía
      className={`${className} p-2 rounded-md text-white disabled:bg-gray-400 disabled:cursor-not-allowed`}
    >
      {pending ? "Cargando..." : title}
    </button>
  );
};

export default SubmitButton;