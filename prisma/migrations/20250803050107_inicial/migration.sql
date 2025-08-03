-- CreateEnum
CREATE TYPE "admin_estado" AS ENUM ('activo', 'inactivo', 'suspendido');

-- CreateEnum
CREATE TYPE "genero" AS ENUM ('masculino', 'femenino');

-- CreateEnum
CREATE TYPE "eventos_tipo_evento" AS ENUM ('reunion_padres', 'capacitacion_maestros', 'evaluacion_grupal', 'actividad_recreativa', 'conferencia', 'taller', 'otro');

-- CreateEnum
CREATE TYPE "padre_tipo_parentesco" AS ENUM ('madre', 'padre', 'tutor', 'guardian');

-- CreateEnum
CREATE TYPE "eventos_estado" AS ENUM ('planificado', 'confirmado', 'en_progreso', 'completado', 'cancelado');

-- CreateEnum
CREATE TYPE "maestros_tipo_profesional" AS ENUM ('psicologo', 'terapeuta', 'ambos');

-- CreateEnum
CREATE TYPE "alumno_estado" AS ENUM ('activo', 'inactivo', 'graduado', 'retirado');

-- CreateEnum
CREATE TYPE "maestros_estado" AS ENUM ('activo', 'inactivo', 'vacaciones');

-- CreateEnum
CREATE TYPE "alumno_jornada_actual" AS ENUM ('matutina', 'vespertina');

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "idusuario" VARCHAR(100) NOT NULL,
    "estado" "admin_estado" DEFAULT 'activo',
    "fecha_creacion" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alumno" (
    "id" SERIAL NOT NULL,
    "idusuario" VARCHAR(100),
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "fecha_de_nacimiento" DATE NOT NULL,
    "genero" "genero" NOT NULL,
    "documento_identidad" VARCHAR(20),
    "lugar_de_nacimiento" VARCHAR(150) NOT NULL,
    "institucion_procedencia" VARCHAR(100) NOT NULL,
    "año_de_ingreso" INTEGER,
    "estado" "alumno_estado" DEFAULT 'activo',
    "jornada_actual" "alumno_jornada_actual" DEFAULT 'matutina',
    "recibio_evaluacion" BOOLEAN DEFAULT false,
    "fecha_evaluacion" DATE,
    "usa_medicamentos" BOOLEAN DEFAULT false,
    "medicamentos_detalle" TEXT,
    "alergias" BOOLEAN DEFAULT false,
    "alergias_detalle" TEXT,
    "observaciones_medicas" TEXT,
    "maestro_actual_id" INTEGER,
    "fecha_creacion" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alumno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "descripcion" TEXT,
    "tipo_evento" "eventos_tipo_evento" NOT NULL,
    "fecha_inicio" TIMESTAMP(0) NOT NULL,
    "fecha_fin" TIMESTAMP(0) NOT NULL,
    "lugar" VARCHAR(200),
    "estado" "eventos_estado" DEFAULT 'planificado',
    "es_publico" BOOLEAN DEFAULT true,
    "observaciones" TEXT,
    "creado_por_admin_id" INTEGER,
    "actualizado_por_admin_id" INTEGER,
    "fecha_creacion" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maestro" (
    "id" SERIAL NOT NULL,
    "idusuario" VARCHAR(100),
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "documento_identidad" VARCHAR(20) NOT NULL,
    "fecha_de_nacimiento" DATE,
    "genero" VARCHAR(10),
    "telefono_movil" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "tipo_profesional" "maestros_tipo_profesional" NOT NULL,
    "estado" "maestros_estado" DEFAULT 'activo',
    "fecha_ingreso" DATE,
    "fecha_creacion" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "maestro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "padre" (
    "id" SERIAL NOT NULL,
    "idusuario" VARCHAR(100),
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "documento_identidad" VARCHAR(20),
    "tipo_parentesco" "padre_tipo_parentesco" NOT NULL,
    "fecha_de_nacimiento" DATE,
    "genero" VARCHAR(10),
    "telefono_movil" VARCHAR(20),
    "email" VARCHAR(100),
    "activo" BOOLEAN DEFAULT true,
    "fecha_creacion" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "padre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materias" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "maestroId" INTEGER NOT NULL,

    CONSTRAINT "materias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asistencias" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "present" BOOLEAN NOT NULL,
    "alumnoId" INTEGER NOT NULL,

    CONSTRAINT "asistencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MateriaToalumno" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_idusuario_unique" ON "admin"("idusuario");

-- CreateIndex
CREATE UNIQUE INDEX "alumno_idusuario_unique" ON "alumno"("idusuario");

-- CreateIndex
CREATE UNIQUE INDEX "maestro_idusuario_unique" ON "maestro"("idusuario");

-- CreateIndex
CREATE UNIQUE INDEX "maestro_documento_identidad_unique" ON "maestro"("documento_identidad");

-- CreateIndex
CREATE UNIQUE INDEX "maestro_email_unique" ON "maestro"("email");

-- CreateIndex
CREATE UNIQUE INDEX "padre_idusuario_unique" ON "padre"("idusuario");

-- CreateIndex
CREATE UNIQUE INDEX "_MateriaToalumno_AB_unique" ON "_MateriaToalumno"("A", "B");

-- CreateIndex
CREATE INDEX "_MateriaToalumno_B_index" ON "_MateriaToalumno"("B");

-- AddForeignKey
ALTER TABLE "materias" ADD CONSTRAINT "materias_maestroId_fkey" FOREIGN KEY ("maestroId") REFERENCES "maestro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asistencias" ADD CONSTRAINT "asistencias_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MateriaToalumno" ADD CONSTRAINT "_MateriaToalumno_A_fkey" FOREIGN KEY ("A") REFERENCES "materias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MateriaToalumno" ADD CONSTRAINT "_MateriaToalumno_B_fkey" FOREIGN KEY ("B") REFERENCES "alumno"("id") ON DELETE CASCADE ON UPDATE CASCADE;
