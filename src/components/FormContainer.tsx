// src/components/FormContainer.tsx
import prisma from "@/lib/prisma";
import { maestro } from "@prisma/client";
import CreateAlumnoForm from "./forms/CreateAlumnoForm"; // Importaremos un nuevo componente

// Este es ahora un componente de servidor simple y asíncrono
const FormContainer = async () => {
  // Obtenemos la lista de maestros en el servidor
  const maestros: maestro[] = await prisma.maestro.findMany({
    where: { estado: "activo" },
  });

  const relatedData = {
    maestros,
  };

  // Renderizamos el componente de cliente que manejará el formulario
  return <CreateAlumnoForm relatedData={relatedData} />;
};

export default FormContainer;