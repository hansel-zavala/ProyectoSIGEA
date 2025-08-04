-- AlterTable
ALTER TABLE "alumno" ADD COLUMN     "terapeutaPrincipalId" INTEGER;

-- AlterTable
ALTER TABLE "padre" ADD COLUMN     "direccion" TEXT,
ADD COLUMN     "lugar_trabajo" TEXT,
ADD COLUMN     "profesion" TEXT;

-- CreateTable
CREATE TABLE "reportes" (
    "id" SERIAL NOT NULL,
    "fecha_entrega" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resumen" TEXT,
    "conclusiones" TEXT,
    "recomendaciones" TEXT,
    "alumnoId" INTEGER NOT NULL,
    "licenciadoId" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reportes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reporte_items" (
    "id" SERIAL NOT NULL,
    "area" TEXT NOT NULL,
    "actividad" TEXT NOT NULL,
    "valoracion" TEXT NOT NULL,
    "reporteId" INTEGER NOT NULL,

    CONSTRAINT "reporte_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "alumno" ADD CONSTRAINT "alumno_terapeutaPrincipalId_fkey" FOREIGN KEY ("terapeutaPrincipalId") REFERENCES "maestro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportes" ADD CONSTRAINT "reportes_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportes" ADD CONSTRAINT "reportes_licenciadoId_fkey" FOREIGN KEY ("licenciadoId") REFERENCES "maestro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reporte_items" ADD CONSTRAINT "reporte_items_reporteId_fkey" FOREIGN KEY ("reporteId") REFERENCES "reportes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
