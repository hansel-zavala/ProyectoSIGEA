// src/components/InputField.tsx
"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

// Define los tipos de las props que el componente InputField puede recibir
type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  register?: UseFormRegisterReturn; // Opcional para formularios HTML nativos
  error?: FieldError;
  defaultValue?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  hidden?: boolean;
};

const InputField = ({
  label,
  name,
  type = "text",
  register,
  error,
  defaultValue,
  inputProps,
  hidden,
}: InputFieldProps) => {
  return (
    <div className={hidden ? "hidden" : "flex flex-col gap-2 mb-4 w-full"}>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...(register || { name })} // Pasa register si existe, o name si no
        defaultValue={defaultValue}
        className="p-2 border rounded-md"
        {...inputProps}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;