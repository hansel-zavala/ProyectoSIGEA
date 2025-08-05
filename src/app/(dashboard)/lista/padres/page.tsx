// src/app/(dashboard)/lista/padres/page.tsx

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import FormModal from "@/components/FormModal";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Paginacion";
import { ITEM_PER_PAGE } from "@/lib/settings";
// Importamos los tipos necesarios
import { padre, alumno, Prisma } from "@prisma/client";

// Creamos un tipo nuevo que incluye la lista de alumnos (hijos)
type PadreConAlumnos = padre & {
  alumnos: alumno[];
};

const PadresPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  const page = parseInt(searchParams?.page as string) || 1;
  const search = (searchParams?.search as string) || "";

  const whereCondition: Prisma.padreWhereInput = {
    AND: [
      { activo: true },
      {
        OR: [
          { nombre: { contains: search, mode: "insensitive" } },
          { apellido: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
    ],
  };

  // --- 1. CORRECCIÓN EN LA CONSULTA ---
  // Le pedimos a Prisma que incluya los datos de los alumnos relacionados
  const [padres, count] = await Promise.all([
    prisma.padre.findMany({
      where: whereCondition,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
      include: {
        alumnos: true, // <-- INCLUIMOS LOS ALUMNOS (HIJOS)
      },
    }),
    prisma.padre.count({ where: whereCondition }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Lista de Padres y Tutores</h1>
        <div className="flex items-center gap-4">
          <TableSearch />
          {role === "admin" && <FormModal table="padre" type="create" />}
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Nombre Completo</th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">Hijo(s) Asignado(s)</th>
            <th scope="col" className="px-6 py-3 hidden lg:table-cell">Teléfono</th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">Direccion</th>
            <th scope="col" className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {padres.map((item: PadreConAlumnos) => (
            <tr key={item.id} className="bg-white border-b">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Image src="/noavatar.png" alt="" width={32} height={32} className="rounded-full" />
                  {item.nombre} {item.apellido}
                </div>
              </td>
              {/* --- 2. NUEVA COLUMNA EN LA TABLA --- */}
              <td className="px-6 py-4 hidden md:table-cell">
                {item.alumnos.length > 0 ? (
                  item.alumnos.map(a => `${a.nombre} ${a.apellido}`).join(', ')
                ) : (
                  <span className="text-gray-400">Sin asignar</span>
                )}
              </td>
              <td className="px-6 py-4 hidden lg:table-cell">{item.telefono_movil}</td>
              <td className="px-6 py-4 hidden md:table-cell">{item.direccion}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {role === "admin" && (
                    <>
                      <FormModal table="padre" type="update" data={item} />
                      <FormModal table="padre" type="delete" id={item.id} />
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

export default PadresPage;