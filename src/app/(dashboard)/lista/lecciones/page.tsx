// src/app/(dashboard)/lista/lecciones/page.tsx

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import FormModal from "@/components/FormModal";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Paginacion";
import { ITEM_PER_PAGE } from "@/lib/settings";
import type { Leccion, Prisma } from "@prisma/client";

const LeccionesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  const page = parseInt(searchParams?.page as string) || 1;
  const search = (searchParams?.search as string) || "";

  // --- CORRECCIÓN AQUÍ: Estructura de consulta correcta ---
  const whereCondition: Prisma.LeccionWhereInput = search
    ? {
        OR: [
          { titulo: { contains: search, mode: "insensitive" } },
          { categoria: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [lecciones, count] = await Promise.all([
    prisma.leccion.findMany({
      where: whereCondition,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
      orderBy: { fecha_creacion: "desc" },
    }),
    prisma.leccion.count({ where: whereCondition }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Lecciones (Wiki)</h1>
        <div className="flex items-center gap-4">
          <TableSearch />
          {role === "admin" && <FormModal table="leccion" type="create" />}
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Título</th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">Categoría</th>
            <th scope="col" className="px-6 py-3 hidden lg:table-cell">Habilidades Clave</th>
            <th scope="col" className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lecciones.map((item: Leccion) => (
            <tr key={item.id} className="bg-white border-b">
              <td className="px-6 py-4 font-medium text-gray-900">{item.titulo}</td>
              <td className="px-6 py-4 hidden md:table-cell">{item.categoria}</td>
              <td className="px-6 py-4 hidden lg:table-cell">{item.habilidades_clave}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {role === "admin" && (
                    <>
                      <FormModal table="leccion" type="update" data={item} />
                      <FormModal table="leccion" type="delete" id={item.id} />
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} count={count} />
    </div>
  );
};

export default LeccionesPage;