/*
  Warnings:

  - You are about to drop the column `año_de_ingreso` on the `alumno` table. All the data in the column will be lost.
  - You are about to drop the column `maestro_actual_id` on the `alumno` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "alumno" DROP COLUMN "año_de_ingreso",
DROP COLUMN "maestro_actual_id",
ADD COLUMN     "atencion_distancia" BOOLEAN DEFAULT false,
ADD COLUMN     "atencion_grupal" BOOLEAN DEFAULT false,
ADD COLUMN     "atencion_individual" BOOLEAN DEFAULT false,
ADD COLUMN     "atencion_pre_vocacional" BOOLEAN DEFAULT false,
ADD COLUMN     "atencion_vocacional" BOOLEAN DEFAULT false,
ADD COLUMN     "direccion" TEXT,
ADD COLUMN     "educacion_fisica" BOOLEAN DEFAULT false,
ADD COLUMN     "inclusion_escolar" BOOLEAN DEFAULT false,
ADD COLUMN     "padreId" INTEGER,
ADD COLUMN     "telefono_fijo" TEXT,
ADD COLUMN     "telefono_movil" TEXT,
ADD COLUMN     "terapia_domicilio" BOOLEAN DEFAULT false,
ALTER COLUMN "idusuario" SET DATA TYPE TEXT,
ALTER COLUMN "nombre" SET DATA TYPE TEXT,
ALTER COLUMN "apellido" SET DATA TYPE TEXT,
ALTER COLUMN "documento_identidad" SET DATA TYPE TEXT,
ALTER COLUMN "lugar_de_nacimiento" SET DATA TYPE TEXT,
ALTER COLUMN "institucion_procedencia" SET DATA TYPE TEXT,
ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "fecha_actualizacion" DROP DEFAULT,
ALTER COLUMN "fecha_actualizacion" SET DATA TYPE TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "alumno" ADD CONSTRAINT "alumno_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "padre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "alumno_idusuario_unique" RENAME TO "alumno_idusuario_key";
