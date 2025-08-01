// src/app/(dashboard)/lista/registrar/page.tsx
import prisma from "@/lib/prisma";
import RegistrarAlumnoForm from "@/components/forms/RegistrarAlumnoForm"; // <-- Importa el nuevo componente

const RegistrarAlumnoPage = async () => {
  // 1. Obtenemos la lista de maestros en el servidor
  const maestros = await prisma.maestro.findMany({
    where: { estado: "activo" },
  });

  const relatedData = {
    maestros,
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Registrar Nuevo Alumno</h1>
      
      {/* 2. Renderizamos nuestro nuevo componente de cliente y le pasamos los datos */}
      <RegistrarAlumnoForm relatedData={relatedData} />
    </div>
  );
};

export default RegistrarAlumnoPage;