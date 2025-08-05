// src/components/ViewStudentsModal.tsx
"use client";

import { useState } from "react";
import type { alumno } from "@prisma/client";
import Image from "next/image";

// Definimos las props que recibirá el componente
type ViewStudentsModalProps = {
  students: alumno[]; // La lista de alumnos asignados
};

const ViewStudentsModal = ({ students }: ViewStudentsModalProps) => {
  // Estado para controlar si el modal está abierto o cerrado
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* El botón que el usuario verá en la tabla */}
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-blue-600 hover:underline"
      >
        Ver ({students.length})
      </button>

      {/* El Modal (solo se muestra si 'open' es true) */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="p-6 bg-white rounded-lg shadow-xl w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Alumnos Asignados</h2>
            
            {/* Lista de Alumnos */}
            <div className="max-h-64 overflow-y-auto">
              {students.length > 0 ? (
                <ul className="space-y-2">
                  {students.map((student) => (
                    <li key={student.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                       <Image src="/noavatar.png" alt="" width={32} height={32} className="rounded-full" />
                       <span>{student.nombre} {student.apellido}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Este licenciado no tiene alumnos asignados.</p>
              )}
            </div>

            {/* Botón para cerrar el modal */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewStudentsModal;