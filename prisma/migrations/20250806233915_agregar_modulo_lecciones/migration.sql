-- CreateEnum
CREATE TYPE "public"."materia_estado" AS ENUM ('activa', 'inactiva');

-- AlterTable
ALTER TABLE "public"."_MateriaToalumno" ADD CONSTRAINT "_MateriaToalumno_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_MateriaToalumno_AB_unique";

-- AlterTable
ALTER TABLE "public"."materias" ADD COLUMN     "estado" "public"."materia_estado" DEFAULT 'activa';

-- CreateTable
CREATE TABLE "public"."lecciones" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "categoria" TEXT,
    "habilidades_clave" TEXT,
    "creadoPorId" INTEGER,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lecciones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."lecciones" ADD CONSTRAINT "lecciones_creadoPorId_fkey" FOREIGN KEY ("creadoPorId") REFERENCES "public"."maestro"("id") ON DELETE SET NULL ON UPDATE CASCADE;
