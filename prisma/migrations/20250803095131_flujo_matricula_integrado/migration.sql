/*
  Warnings:

  - The values [guardian] on the enum `padre_tipo_parentesco` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `maestro_actual_id` on the `alumno` table. All the data in the column will be lost.
  - The `genero` column on the `padre` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "padre_tipo_parentesco_new" AS ENUM ('madre', 'padre', 'tutor');
ALTER TABLE "padre" ALTER COLUMN "tipo_parentesco" TYPE "padre_tipo_parentesco_new" USING ("tipo_parentesco"::text::"padre_tipo_parentesco_new");
ALTER TYPE "padre_tipo_parentesco" RENAME TO "padre_tipo_parentesco_old";
ALTER TYPE "padre_tipo_parentesco_new" RENAME TO "padre_tipo_parentesco";
DROP TYPE "padre_tipo_parentesco_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "alumno" DROP CONSTRAINT "alumno_maestro_actual_id_fkey";

-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "idusuario" SET DATA TYPE TEXT,
ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "fecha_actualizacion" DROP DEFAULT,
ALTER COLUMN "fecha_actualizacion" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "alumno" DROP COLUMN "maestro_actual_id",
ALTER COLUMN "fecha_de_nacimiento" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "fecha_evaluacion" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "asistencias" ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "eventos" ALTER COLUMN "titulo" SET DATA TYPE TEXT,
ALTER COLUMN "fecha_inicio" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "fecha_fin" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "lugar" SET DATA TYPE TEXT,
ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "fecha_actualizacion" DROP DEFAULT,
ALTER COLUMN "fecha_actualizacion" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "maestro" ALTER COLUMN "idusuario" SET DATA TYPE TEXT,
ALTER COLUMN "nombre" SET DATA TYPE TEXT,
ALTER COLUMN "apellido" SET DATA TYPE TEXT,
ALTER COLUMN "documento_identidad" SET DATA TYPE TEXT,
ALTER COLUMN "fecha_de_nacimiento" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "genero" SET DATA TYPE TEXT,
ALTER COLUMN "telefono_movil" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "fecha_ingreso" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "fecha_actualizacion" DROP DEFAULT,
ALTER COLUMN "fecha_actualizacion" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "padre" ADD COLUMN     "telefono_fijo" TEXT,
ALTER COLUMN "idusuario" SET DATA TYPE TEXT,
ALTER COLUMN "nombre" SET DATA TYPE TEXT,
ALTER COLUMN "apellido" SET DATA TYPE TEXT,
ALTER COLUMN "documento_identidad" SET DATA TYPE TEXT,
ALTER COLUMN "fecha_de_nacimiento" SET DATA TYPE TIMESTAMP(3),
DROP COLUMN "genero",
ADD COLUMN     "genero" "genero",
ALTER COLUMN "telefono_movil" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "fecha_actualizacion" DROP DEFAULT,
ALTER COLUMN "fecha_actualizacion" SET DATA TYPE TIMESTAMP(3);

-- RenameIndex
ALTER INDEX "admin_idusuario_unique" RENAME TO "admin_idusuario_key";

-- RenameIndex
ALTER INDEX "maestro_documento_identidad_unique" RENAME TO "maestro_documento_identidad_key";

-- RenameIndex
ALTER INDEX "maestro_email_unique" RENAME TO "maestro_email_key";

-- RenameIndex
ALTER INDEX "maestro_idusuario_unique" RENAME TO "maestro_idusuario_key";

-- RenameIndex
ALTER INDEX "padre_idusuario_unique" RENAME TO "padre_idusuario_key";
