// src/app/(dashboard)/lista/alumnos/page.tsx

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Paginacion";
import { ITEM_PER_PAGE } from "@/lib/settings";
// Importamos los tipos necesarios de Prisma, incluido Prisma para construir la consulta
import { alumno, padre, Prisma } from "@prisma/client";

// Creamos un tipo nuevo que incluye la información del padre
type AlumnoConPadre = alumno & {
  padre: padre | null;
};

const AlumnosPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  const page = parseInt(searchParams?.page as string) || 1;
  const search = (searchParams?.search as string) || "";

  // --- CORRECCIÓN CLAVE AQUÍ ---
  // Estructuramos la consulta con el tipo explícito de Prisma para ayudar a TypeScript
  const whereCondition: Prisma.alumnoWhereInput = {
    AND: [
      { estado: "activo" }, // Condición 1: Deben estar activos
      { // Condición 2: Y deben coincidir con la búsqueda
        OR: [
          { nombre: { contains: search, mode: "insensitive" } },
          { apellido: { contains: search, mode: "insensitive" } },
          { padre: { nombre: { contains: search, mode: "insensitive" } } },
          { padre: { apellido: { contains: search, mode: "insensitive" } } },
        ],
      },
    ],
  };

  const [alumnos, count, maestros] = await Promise.all([
    prisma.alumno.findMany({
      where: whereCondition,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
      include: {
        padre: true,
      },
    }),
    prisma.alumno.count({ where: whereCondition }),
    prisma.maestro.findMany({ where: { estado: "activo" } })
  ]);

  const relatedData = { maestros };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Lista de Alumnos</h1>
        <div className="flex items-center gap-4">
          <TableSearch />
          {role === "admin" && <FormModal table="alumno" type="create" relatedData={relatedData} />}
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Nombre Completo</th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">Padre/Tutor Asignado</th>
            <th scope="col" className="px-6 py-3 hidden lg:table-cell">Teléfono del Padre</th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">Jornada</th>
            <th scope="col" className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((item: AlumnoConPadre) => (
            <tr key={item.id} className="bg-white border-b">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <Link href={`/lista/alumnos/${item.id}`} className="flex items-center gap-2">
                  <Image src="/noavatar.png" alt="" width={32} height={32} className="rounded-full" />
                  {item.nombre} {item.apellido}
                </Link>
              </td>
              <td className="px-6 py-4 hidden md:table-cell">
                {item.padre ? `${item.padre.nombre} ${item.padre.apellido}` : <span className="text-gray-400">Sin asignar</span>}
              </td>
              <td className="px-6 py-4 hidden lg:table-cell">
                {item.padre?.telefono_movil || <span className="text-gray-400">N/A</span>}
              </td>
              <td className="px-6 py-4 hidden md:table-cell">{item.jornada_actual}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {role === "admin" && (
                    <>
                      <FormModal table="alumno" type="update" data={item} relatedData={relatedData} />
                      <FormModal table="alumno" type="delete" id={item.id} />
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

export default AlumnosPage;