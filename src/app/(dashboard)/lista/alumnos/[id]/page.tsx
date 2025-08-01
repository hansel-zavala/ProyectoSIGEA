// src/app/(dashboard)/lista/alumnos/[id]/page.tsx
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import FormModal from "@/components/FormModal"; // <-- Usa FormModal

const SingleAlumnoPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await currentUser();
  const role = user?.publicMetadata?.role;
  const alumno = await prisma.alumno.findUnique({ where: { id: parseInt(id) } });

  if (!alumno) return <div>Alumno no encontrado</div>;

  return (
    <div className="flex gap-4 p-4">
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/noavatar.png" alt="" width={80} height={80} className="rounded-full" />
            <h1 className="text-2xl font-bold">{alumno.nombre} {alumno.apellido}</h1>
          </div>
          {role === "admin" && (
            <div className="flex gap-2">
              {/* --- CORRECCIÓN AQUÍ: Usa FormModal --- */}
              <FormModal type="update" table="alumno" data={alumno} />
              <FormModal type="delete" table="alumno" id={alumno.id} />
            </div>
          )}
        </div>
        {/* ... resto del JSX ... */}
      </div>
    </div>
  );
};
export default SingleAlumnoPage;