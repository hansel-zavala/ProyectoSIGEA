// src/app/(dashboard)/lista/trabajoSesiones/TrabajoSesionesClient.tsx
"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Paginacion";
import Table from "@/components/Tabla";
import TableSearch from "@/components/TableSearch";
import { Materia, maestro } from "@prisma/client";
import Image from "next/image";

type SesionConMaestro = Materia & {
  maestro: maestro;
};

type TrabajoSesionesClientProps = {
  data: SesionConMaestro[];
  count: number;
  page: number;
  role?: string;
};

const TrabajoSesionesClient = ({ data, count, page, role }: TrabajoSesionesClientProps) => {
  const columns = [
    { header: "Nombre de la Materia", accessor: "nombre" },
    { header: "Maestro", accessor: "maestro", className: "hidden md:table-cell" },
    ...(role === "admin" ? [{ header: "Acciones", accessor: "action" }] : []),
  ];

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
              <FormModal table="materia" type="update" data={item} />
              <FormModal table="materia" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
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
            {role === "admin" && <FormModal table="materia" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={page} count={count} />
    </div>
  );
};

export default TrabajoSesionesClient;