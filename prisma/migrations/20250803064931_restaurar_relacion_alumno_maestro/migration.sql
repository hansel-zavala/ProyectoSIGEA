-- AlterTable
ALTER TABLE "alumno" ADD COLUMN     "maestro_actual_id" INTEGER;

-- AddForeignKey
ALTER TABLE "alumno" ADD CONSTRAINT "alumno_maestro_actual_id_fkey" FOREIGN KEY ("maestro_actual_id") REFERENCES "maestro"("id") ON DELETE SET NULL ON UPDATE CASCADE;
