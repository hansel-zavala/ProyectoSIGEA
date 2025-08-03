// src/app/(dashboard)/lista/maestros/page.tsx

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal"; // <-- 1. IMPORTA FormModal
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Paginacion";
import { ITEM_PER_PAGE } from "@/lib/settings";

const MaestrosPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // Obtiene el usuario y el rol
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  const page = parseInt(searchParams?.page as string) || 1;
  const search = (searchParams?.search as string) || "";

  // Lógica para buscar maestros
  const maestros = await prisma.maestro.findMany({
    where: {
      OR: [
        { nombre: { contains: search, mode: "insensitive" } },
        { apellido: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    },
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * (page - 1),
  });
  
  const count = await prisma.maestro.count({
    where: {
      OR: [
        { nombre: { contains: search, mode: "insensitive" } },
        { apellido: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    },
  });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Lista de Licenciados</h1>
        <div className="flex items-center gap-4">
          <TableSearch />
          {role === "admin" && <FormModal table="maestro" type="create" />}
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Nombre Completo</th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">Email</th>
            <th scope="col" className="px-6 py-3 hidden lg:table-cell">Teléfono</th>
            <th scope="col" className="px-6 py-3 hidden lg:table-cell">Puesto</th>
            <th scope="col" className="px-6 py-3 hidden lg:table-cell">Estado</th>
            <th scope="col" className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {maestros.map((item) => (
            <tr key={item.id} className="bg-white border-b">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <Link href={`/lista/maestros/${item.id}`} className="flex items-center gap-2">
                  <Image src="/noavatar.png" alt="" width={32} height={32} className="rounded-full" />
                  {item.nombre} {item.apellido}
                </Link>
              </td>
              <td className="px-6 py-4 hidden md:table-cell">{item.email}</td>
              <td className="px-6 py-4 hidden lg:table-cell">{item.telefono_movil}</td>
              <td className="px-6 py-4 hidden lg:table-cell">{item.tipo_profesional}</td>
              <td className="px-6 py-4 hidden lg:table-cell">{item.estado}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {/* --- 2. CORRECCIÓN AQUÍ: Usa FormModal --- */}
                  {role === "admin" && (
                    <>
                      <FormModal table="maestro" type="update" data={item} />
                      <FormModal table="maestro" type="delete" id={item.id} />
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

export default MaestrosPage;