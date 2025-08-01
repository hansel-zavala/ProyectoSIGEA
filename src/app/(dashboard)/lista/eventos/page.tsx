// src/app/(dashboard)/lista/eventos/page.tsx

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import FormModal from "@/components/FormModal"; // <-- 1. IMPORTA FormModal
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Paginacion";
import { ITEM_PER_PAGE } from "@/lib/settings";

const EventosPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // Obtiene el usuario y el rol
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  const page = parseInt(searchParams?.page as string) || 1;
  const search = (searchParams?.search as string) || "";

  // Lógica para buscar eventos
  const eventos = await prisma.eventos.findMany({
    where: {
      titulo: { contains: search, mode: "insensitive" },
    },
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * (page - 1),
    orderBy: { fecha_inicio: "desc" },
  });
  
  const count = await prisma.eventos.count({
    where: {
      titulo: { contains: search, mode: "insensitive" },
    },
  });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Eventos</h1>
        <div className="flex items-center gap-4">
          <TableSearch />
          {role === "admin" && <FormModal table="evento" type="create" />}
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Título</th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">Tipo</th>
            <th scope="col" className="px-6 py-3 hidden lg:table-cell">Fecha de Inicio</th>
            <th scope="col" className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((item) => (
            <tr key={item.id} className="bg-white border-b">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.titulo}
              </td>
              <td className="px-6 py-4 hidden md:table-cell capitalize">
                {item.tipo_evento.replace(/_/g, " ")}
              </td>
              <td className="px-6 py-4 hidden lg:table-cell">
                {new Date(item.fecha_inicio).toLocaleString()}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {/* --- 2. CORRECCIÓN AQUÍ: Usa FormModal --- */}
                  {role === "admin" && (
                    <>
                      <FormModal table="evento" type="update" data={item} />
                      <FormModal table="evento" type="delete" id={item.id} />
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

export default EventosPage;