// src/app/(dashboard)/lista/trabajoSesiones/page.tsx

import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import TrabajoSesionesClient from "./TrabajoSesionesClient"; // Importa el nuevo componente

const SesionesDeTrabajoPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // --- LÓGICA DE SERVIDOR ---
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const search = searchParams?.search || "";

  const query: Prisma.MateriaWhereInput = {
    OR: [
      { nombre: { contains: search, mode: "insensitive" } },
      { maestro: { nombre: { contains: search, mode: "insensitive" } } },
      { maestro: { apellido: { contains: search, mode: "insensitive" } } },
    ],
  };

  const [data, count] = await prisma.$transaction([
    prisma.materia.findMany({
      where: query,
      include: { maestro: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    prisma.materia.count({ where: query }),
  ]);
  // --- FIN DE LÓGICA DE SERVIDOR ---

  // Renderiza el componente de cliente y le pasa los datos
  return <TrabajoSesionesClient data={data} count={count} page={page} role={role} />;
};

export default SesionesDeTrabajoPage;