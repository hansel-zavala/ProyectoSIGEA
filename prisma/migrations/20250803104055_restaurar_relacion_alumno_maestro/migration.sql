/*
  Warnings:

  - The `genero` column on the `maestro` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "maestro" DROP COLUMN "genero",
ADD COLUMN     "genero" "genero";
