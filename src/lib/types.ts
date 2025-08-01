// src/lib/types.ts

// Este es el único tipo de estado que usaremos en todo el proyecto.
export type ActionState = {
  success: boolean;
  error: boolean;
  message: string;
};