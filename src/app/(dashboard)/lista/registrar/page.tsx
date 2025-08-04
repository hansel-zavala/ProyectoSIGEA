// src/app/(dashboard)/lista/registrar/page.tsx
import prisma from "@/lib/prisma";
import MatricularPageClient from "./MatriculaClientPage"; // <-- Importa el nuevo componente

// La página principal ahora es un componente de servidor que solo busca datos
const MatricularAlumnoPage = async () => {
  const licenciados = await prisma.maestro.findMany({
    where: { estado: "activo" },
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Nueva Matrícula</h1>
      <MatricularPageClient licenciados={licenciados} />
    </div>
  );
};

export default MatricularAlumnoPage;