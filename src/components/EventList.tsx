import prisma from "@/lib/prisma";
import Link from "next/link";

const EventList = async ({ date: dateParam }: { date?: string }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  // CORREGIDO: Se cambió 'prisma.event' a 'prisma.eventos'
  const data = await prisma.eventos.findMany({
    where: {
      // CORREGIDO: Se cambió 'startTime' a 'fecha_inicio'
      fecha_inicio: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
    orderBy: {
      // CORREGIDO: Se cambió 'startTime' a 'fecha_inicio'
      fecha_inicio: "asc",
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {data.length === 0 ? (
        <p>No hay eventos para esta fecha.</p>
      ) : (
        data.map((item) => (
          <Link href="/" className="block" key={item.id}>
            <div className="p-2 rounded-md bg-red-200">
              <h3 className="font-semibold">{item.titulo}</h3>
              {/* CORREGIDO: Se cambió 'startTime' a 'fecha_inicio' */}
              <p>{new Date(item.fecha_inicio).toLocaleTimeString()}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default EventList;