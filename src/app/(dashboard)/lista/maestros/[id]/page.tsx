// src/app/(dashboard)/lista/maestros/[id]/page.tsx

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import FormModal from "@/components/FormModal"; // <-- 1. IMPORTA FormModal
import StudentAttendanceCard from "@/components/StudentAttendanceCard";

const SingleMaestroPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  // Busca el maestro en la base de datos
  const maestro = await prisma.maestro.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!maestro) {
    return <div>Maestro no encontrado</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* INFO DEL MAESTRO */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/noavatar.png"
              alt=""
              width={80}
              height={80}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold">
              {maestro.nombre} {maestro.apellido}
            </h1>
          </div>
          {role === "admin" && (
            <div className="flex gap-2">
              {/* --- 2. CORRECCIÓN AQUÍ: Usa FormModal --- */}
              <FormModal type="update" table="maestro" data={maestro} />
              <FormModal type="delete" table="maestro" id={maestro.id} />
            </div>
          )}
        </div>
        <div className="mt-6 border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Detalles del Maestro</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><strong>Email:</strong> {maestro.email}</p>
            <p><strong>Teléfono:</strong> {maestro.telefono_movil}</p>
            <p><strong>Documento:</strong> {maestro.documento_identidad}</p>
            <p><strong>Tipo Profesional:</strong> <span className="capitalize">{maestro.tipo_profesional}</span></p>
            <p><strong>Estado:</strong> <span className="capitalize">{maestro.estado}</span></p>
            {maestro.fecha_ingreso && <p><strong>Fecha de Ingreso:</strong> {new Date(maestro.fecha_ingreso).toLocaleDateString()}</p>}
          </div>
        </div>
      </div>

      {/* ASISTENCIA (Ejemplo de otro componente) */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Información Adicional</h2>
        {/* Aquí podrías añadir más componentes, como la lista de materias que imparte */}
        <p>Más detalles sobre el maestro...</p>
      </div>
    </div>
  );
};

export default SingleMaestroPage;