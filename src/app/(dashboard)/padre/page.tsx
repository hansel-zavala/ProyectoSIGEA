import Announcements from "@/components/Anuncios";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


const ParentPage = async () => {
  const { userId } = auth();

  // --- PROBLEMA DE LÓGICA #1 ---
  // La siguiente consulta está COMENTADA porque tu base de datos actual
  // no tiene una relación entre 'padre' y 'alumno' (usando un campo como 'parentId').
  // Para que esto funcione, primero debes agregar esa relación en tu 'schema.prisma'.
  // Por ahora, mostraremos todos los alumnos como ejemplo.
  const students = await prisma.alumno.findMany({
    // where: {
    //   parentId: userId!,  // <--- Este campo 'parentId' no existe en el modelo 'alumno'
    // },
  });

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="flex-1 flex flex-col gap-4">
        {students.map((student) => (
          <div className="w-full" key={student.id}>
            <div className="h-full bg-white p-4 rounded-md">
              <h1 className="text-xl font-semibold">
                {/* CORREGIDO: Se usan 'nombre' y 'apellido' */}
                Horario de ({student.nombre + " " + student.apellido})
              </h1>

              {/* --- PROBLEMA DE LÓGICA #2 --- */}
              {/* El siguiente componente está COMENTADO porque el modelo 'alumno' */}
              {/* no tiene un campo 'classId' para pasarle al calendario. */}
              {/* <BigCalendarContainer type="classId" id={student.classId} /> */}
              
              <p className="mt-4 text-gray-500">
                (El calendario para este alumno se mostrará aquí una vez que la
                lógica de datos esté conectada correctamente).
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
