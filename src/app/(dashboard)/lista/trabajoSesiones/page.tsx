import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Paginacion";
import Table from "@/components/Tabla";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Materia, maestro, Prisma } from "@prisma/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

// Tipo corregido: Ahora representa el resultado de la consulta a `Materia` con el `maestro` incluido.
type SesionConMaestro = Materia & {
  maestro: maestro;
};

const SesionesDeTrabajoPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Columnas corregidas para mostrar datos de la Materia y el Maestro
  const columns = [
    {
      header: "Nombre de la Materia",
      accessor: "nombre",
    },
    {
      header: "Maestro",
      accessor: "maestro",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Acciones",
            accessor: "action",
          },
        ]
      : []),
  ];

  // Renderizado de filas corregido
  const renderRow = (item: SesionConMaestro) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4">{item.nombre}</td>
      <td className="hidden md:table-cell">
        {item.maestro.nombre + " " + item.maestro.apellido}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              {/* CORREGIDO: la tabla ahora es "materia" */}
              <FormContainer table="materia" type="update" data={item} />
              <FormContainer table="materia" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // CORREGIDO: El tipo de la consulta ahora es para `Materia`
  const query: Prisma.MateriaWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          // CORREGIDO: La lógica de búsqueda ahora funciona sobre el modelo `Materia`
          case "search":
            query.OR = [
              { nombre: { contains: value, mode: "insensitive" } }, // Busca por nombre de materia
              { maestro: { nombre: { contains: value, mode: "insensitive" } } }, // Busca por nombre de maestro
              { maestro: { apellido: { contains: value, mode: "insensitive" } } }, // Busca por apellido de maestro
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  // CORREGIDO: La consulta a la base de datos ahora busca en `materia`
  const [data, count] = await prisma.$transaction([
    prisma.materia.findMany({
      where: query,
      include: {
        maestro: true, // Incluimos toda la información del maestro
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.materia.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          Sesiones de Trabajo
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {/* CORREGIDO: la tabla para crear ahora es "materia" */}
            {role === "admin" && <FormContainer table="materia" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default SesionesDeTrabajoPage;
