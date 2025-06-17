import prisma from "@/lib/prisma";
import eventos from "@prisma/client";
import BigCalendar from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "maestroId" | "classId";
  id: string | number;
}) => {
  const dataRes = await prisma.eventos.findMany({
    // where: {
    //   ...(type === "maestroId"
    //     ? { teacherId: id as string }
    //     : { classId: id as number }),
    // },
  });



  const data = dataRes.map((eventos) => ({
    title: eventos.titulo,
    start: eventos.fecha_inicio,
    end: eventos.fecha_fin,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
