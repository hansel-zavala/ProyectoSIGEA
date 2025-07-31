// src/components/StudentAttendanceCard.tsx

import prisma from "@/lib/prisma";

const StudentAttendanceCard = async ({ id }: { id: number }) => {
  // Busca todos los registros de asistencia para el ID del alumno proporcionado
  const attendance = await prisma.attendance.findMany({
    where: {
      // CORREGIDO: El campo se llama 'alumnoId' en tu base de datos
      alumnoId: id,
      date: {
        // Busca registros desde el inicio del año actual
        gte: new Date(new Date().getFullYear(), 0, 1),
      },
    },
  });

  const totalDays = attendance.length;
  // Filtra los registros donde el alumno estuvo presente
  const presentDays = attendance.filter((day) => day.present).length;
  
  // CORREGIDO: Se evita la división por cero si no hay registros de asistencia
  const percentage = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

  return (
    <div className="">
      {/* Muestra el porcentaje redondeado o un guion si no hay datos */}
      <h1 className="text-xl font-semibold">
        {totalDays > 0 ? `${Math.round(percentage)}%` : "-"}
      </h1>
      <span className="text-sm text-gray-400">Asistencia Anual</span>
    </div>
  );
};

export default StudentAttendanceCard;
