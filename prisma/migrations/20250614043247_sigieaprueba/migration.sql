-- CreateTable
CREATE TABLE `direccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `direccion_completa` VARCHAR(250) NOT NULL,
    `ciudad` VARCHAR(100) NULL,
    `departamento` VARCHAR(100) NULL,
    `codigo_postal` VARCHAR(10) NULL,
    `pais` VARCHAR(50) NULL DEFAULT 'Honduras',
    `tipo_direccion` ENUM('casa', 'trabajo') NOT NULL DEFAULT 'casa',
    `es_principal` BOOLEAN NULL DEFAULT true,
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_actualizacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipoatencion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_atencion` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `maestros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idusuario` VARCHAR(100) NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `documento_identidad` VARCHAR(20) NOT NULL,
    `fecha_de_nacimiento` DATE NULL,
    `genero` VARCHAR(10) NULL,
    `telefono_movil` VARCHAR(20) NOT NULL,
    `telefono_trabajo` VARCHAR(20) NULL,
    `email` VARCHAR(100) NOT NULL,
    `tipo_profesional` ENUM('psicologo', 'terapeuta', 'ambos') NOT NULL,
    `numero_licencia` VARCHAR(50) NULL,
    `universidad_graduacion` VARCHAR(150) NULL,
    `años_experiencia` INTEGER NULL,
    `direccion_id` INTEGER NULL,
    `estado` ENUM('activo', 'inactivo', 'vacaciones') NULL DEFAULT 'activo',
    `fecha_ingreso` DATE NULL,
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_actualizacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `idusuario`(`idusuario`),
    UNIQUE INDEX `documento_identidad`(`documento_identidad`),
    UNIQUE INDEX `email`(`email`),
    INDEX `fk_maestros_direccion`(`direccion_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `padre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idusuario` VARCHAR(100) NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `documento_identidad` VARCHAR(20) NULL,
    `tipo_parentesco` ENUM('madre', 'padre', 'tutor', 'guardian') NOT NULL,
    `fecha_de_nacimiento` DATE NULL,
    `genero` VARCHAR(10) NULL,
    `lugar_de_nacimiento` VARCHAR(150) NULL,
    `telefono_movil` VARCHAR(20) NULL,
    `telefono_trabajo` VARCHAR(20) NULL,
    `email` VARCHAR(100) NULL,
    `ocupacion` VARCHAR(100) NULL,
    `lugar_trabajo` VARCHAR(150) NULL,
    `estado_civil` VARCHAR(20) NULL,
    `nivel_educativo` VARCHAR(50) NULL,
    `ingresos_mensuales` DECIMAL(10, 2) NULL,
    `es_responsable_financiero` BOOLEAN NULL DEFAULT true,
    `es_contacto_emergencia` BOOLEAN NULL DEFAULT true,
    `direccion_casa_id` INTEGER NULL,
    `direccion_trabajo_id` INTEGER NULL,
    `activo` BOOLEAN NULL DEFAULT true,
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_actualizacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `idusuario`(`idusuario`),
    INDEX `fk_padre_direccion_casa`(`direccion_casa_id`),
    INDEX `fk_padre_direccion_trabajo`(`direccion_trabajo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alumno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idusuario` VARCHAR(100) NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `fecha_de_nacimiento` DATE NOT NULL,
    `genero` VARCHAR(10) NULL,
    `documento_identidad` VARCHAR(20) NULL,
    `lugar_de_nacimiento` VARCHAR(150) NOT NULL,
    `telefono_movil` VARCHAR(20) NULL,
    `email` VARCHAR(100) NULL,
    `estado_civil` VARCHAR(20) NULL,
    `institucion_procedencia` VARCHAR(100) NOT NULL,
    `año_de_ingreso` YEAR NULL,
    `carrera` VARCHAR(100) NULL,
    `estado` ENUM('activo', 'inactivo', 'graduado', 'retirado') NULL DEFAULT 'activo',
    `jornada_actual` ENUM('matutina', 'vespertina') NULL DEFAULT 'matutina',
    `nombre_contacto_emergencia` VARCHAR(100) NULL,
    `telefono_emergencia` VARCHAR(20) NULL,
    `recibio_evaluacion` BOOLEAN NULL DEFAULT false,
    `fecha_evaluacion` DATE NULL,
    `usa_medicamentos` BOOLEAN NULL DEFAULT false,
    `medicamentos_detalle` TEXT NULL,
    `alergias` BOOLEAN NULL DEFAULT false,
    `alergias_detalle` TEXT NULL,
    `observaciones_medicas` TEXT NULL,
    `direccion_id` INTEGER NULL,
    `maestro_actual_id` INTEGER NULL,
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_actualizacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `idusuario`(`idusuario`),
    INDEX `fk_alumno_direccion`(`direccion_id`),
    INDEX `fk_alumno_maestro_actual`(`maestro_actual_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alumno_padre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alumno_id` INTEGER NOT NULL,
    `padre_id` INTEGER NOT NULL,
    `es_responsable_principal` BOOLEAN NULL DEFAULT false,
    `es_contacto_emergencia` BOOLEAN NULL DEFAULT true,
    `observaciones` TEXT NULL,
    `fecha_asignacion` DATE NULL DEFAULT (curdate()),
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_alumno_padre_padre`(`padre_id`),
    UNIQUE INDEX `unique_alumno_padre`(`alumno_id`, `padre_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alumno_tipoatencion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alumno_id` INTEGER NOT NULL,
    `tipo_atencion_id` INTEGER NOT NULL,
    `fecha_inicio` DATE NOT NULL,
    `fecha_fin` DATE NULL,
    `estado` ENUM('activo', 'completado', 'suspendido', 'cancelado') NULL DEFAULT 'activo',
    `observaciones` TEXT NULL,
    `asignado_por` VARCHAR(100) NULL,
    `motivo_fin` VARCHAR(200) NULL,
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_actualizacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_alumno_tipoatencion_alumno`(`alumno_id`),
    INDEX `fk_alumno_tipoatencion_tipo`(`tipo_atencion_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alumno_maestro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alumno_id` INTEGER NOT NULL,
    `maestro_id` INTEGER NOT NULL,
    `tipo_atencion` ENUM('psicologica', 'terapeutica', 'mixta') NOT NULL,
    `fecha_asignacion` DATE NOT NULL,
    `fecha_fin` DATE NULL,
    `estado` ENUM('activo', 'finalizado', 'transferido') NULL DEFAULT 'activo',
    `motivo_cambio` VARCHAR(200) NULL,
    `objetivos_tratamiento` TEXT NULL,
    `observaciones` TEXT NULL,
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_actualizacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_alumno_maestro_alumno`(`alumno_id`),
    INDEX `fk_alumno_maestro_maestro`(`maestro_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alumno_jornada_historial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alumno_id` INTEGER NOT NULL,
    `jornada` ENUM('matutina', 'vespertina') NOT NULL,
    `fecha_inicio` DATE NOT NULL,
    `fecha_fin` DATE NULL,
    `motivo_cambio` VARCHAR(200) NULL,
    `autorizado_por` VARCHAR(100) NULL,
    `activo` BOOLEAN NULL DEFAULT true,
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_alumno_jornada_alumno`(`alumno_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `horario_sesiones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alumno_id` INTEGER NOT NULL,
    `maestro_id` INTEGER NOT NULL,
    `tipo_sesion` ENUM('psicologica', 'terapeutica', 'evaluacion', 'seguimiento') NOT NULL,
    `dia_semana` ENUM('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo') NOT NULL,
    `fecha_hora_inicio` DATETIME(0) NOT NULL,
    `fecha_hora_fin` DATETIME(0) NOT NULL,
    `activo` BOOLEAN NULL DEFAULT true,
    `observaciones` TEXT NULL,
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_actualizacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_horario_sesiones_alumno`(`alumno_id`),
    INDEX `fk_horario_sesiones_maestro`(`maestro_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sesiones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horario_sesion_id` INTEGER NULL,
    `alumno_id` INTEGER NOT NULL,
    `maestro_id` INTEGER NOT NULL,
    `tipo_sesion` ENUM('psicologica', 'terapeutica', 'evaluacion', 'seguimiento') NOT NULL,
    `fecha_sesion` DATE NOT NULL,
    `hora_inicio` TIME(0) NOT NULL,
    `hora_fin` TIME(0) NULL,
    `estado` ENUM('programada', 'completada', 'cancelada', 'no_asistio', 'reprogramada') NULL DEFAULT 'programada',
    `objetivos` TEXT NULL,
    `actividades_realizadas` TEXT NULL,
    `observaciones` TEXT NULL,
    `actividades_o_trabajos_en_sesion` TEXT NULL,
    `proxima_sesion_observaciones` TEXT NULL,
    `asistencia_padre` BOOLEAN NULL DEFAULT false,
    `padre_presente_id` INTEGER NULL,
    `calificacion_sesion` ENUM('excelente', 'buena', 'regular', 'deficiente') NULL,
    `motivo_cancelacion` VARCHAR(200) NULL,
    `fecha_reprogramacion` DATETIME(0) NULL,
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_actualizacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_sesiones_alumno`(`alumno_id`),
    INDEX `fk_sesiones_horario`(`horario_sesion_id`),
    INDEX `fk_sesiones_maestro`(`maestro_id`),
    INDEX `fk_sesiones_padre_presente`(`padre_presente_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trabajos_sesion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sesion_id` INTEGER NOT NULL,
    `titulo` VARCHAR(200) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `tipo_trabajo` ENUM('actividad', 'evaluacion', 'proyecto') NOT NULL,
    `recursos_utilizados` TEXT NULL,
    `observaciones` TEXT NULL,
    `duracion_minutos` INTEGER NULL,
    `fue_completado` BOOLEAN NULL DEFAULT true,
    `requiere_repeticion` BOOLEAN NULL DEFAULT false,
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_actualizacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_trabajos_sesion_sesion`(`sesion_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idusuario` VARCHAR(100) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `telefono` VARCHAR(20) NULL,
    `documento_identidad` VARCHAR(20) NULL,
    `tipo_admin` ENUM('super_admin', 'admin_eventos', 'admin_academico', 'admin_general') NULL DEFAULT 'admin_general',
    `estado` ENUM('activo', 'inactivo', 'suspendido') NULL DEFAULT 'activo',
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_actualizacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `idusuario`(`idusuario`),
    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `documento_identidad`(`documento_identidad`),
    INDEX `idx_email`(`email`),
    INDEX `idx_estado`(`estado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(200) NOT NULL,
    `descripcion` TEXT NULL,
    `tipo_evento` ENUM('reunion_padres', 'capacitacion_maestros', 'evaluacion_grupal', 'actividad_recreativa', 'conferencia', 'taller', 'otro') NOT NULL,
    `fecha_inicio` DATETIME(0) NOT NULL,
    `fecha_fin` DATETIME(0) NOT NULL,
    `lugar` VARCHAR(200) NULL,
    `estado` ENUM('planificado', 'confirmado', 'en_progreso', 'completado', 'cancelado') NULL DEFAULT 'planificado',
    `es_publico` BOOLEAN NULL DEFAULT true,
    `observaciones` TEXT NULL,
    `creado_por_admin_id` INTEGER NOT NULL,
    `actualizado_por_admin_id` INTEGER NULL,
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_actualizacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_actualizado_por`(`actualizado_por_admin_id`),
    INDEX `idx_creado_por`(`creado_por_admin_id`),
    INDEX `idx_estado`(`estado`),
    INDEX `idx_fecha_inicio`(`fecha_inicio`),
    INDEX `idx_tipo_evento`(`tipo_evento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `maestros` ADD CONSTRAINT `maestros_ibfk_1` FOREIGN KEY (`direccion_id`) REFERENCES `direccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `padre` ADD CONSTRAINT `padre_ibfk_1` FOREIGN KEY (`direccion_casa_id`) REFERENCES `direccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `padre` ADD CONSTRAINT `padre_ibfk_2` FOREIGN KEY (`direccion_trabajo_id`) REFERENCES `direccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alumno` ADD CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`direccion_id`) REFERENCES `direccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alumno` ADD CONSTRAINT `alumno_ibfk_2` FOREIGN KEY (`maestro_actual_id`) REFERENCES `maestros`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alumno_padre` ADD CONSTRAINT `alumno_padre_ibfk_1` FOREIGN KEY (`alumno_id`) REFERENCES `alumno`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alumno_padre` ADD CONSTRAINT `alumno_padre_ibfk_2` FOREIGN KEY (`padre_id`) REFERENCES `padre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alumno_tipoatencion` ADD CONSTRAINT `alumno_tipoatencion_ibfk_1` FOREIGN KEY (`alumno_id`) REFERENCES `alumno`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alumno_tipoatencion` ADD CONSTRAINT `alumno_tipoatencion_ibfk_2` FOREIGN KEY (`tipo_atencion_id`) REFERENCES `tipoatencion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alumno_maestro` ADD CONSTRAINT `alumno_maestro_ibfk_1` FOREIGN KEY (`alumno_id`) REFERENCES `alumno`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alumno_maestro` ADD CONSTRAINT `alumno_maestro_ibfk_2` FOREIGN KEY (`maestro_id`) REFERENCES `maestros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alumno_jornada_historial` ADD CONSTRAINT `alumno_jornada_historial_ibfk_1` FOREIGN KEY (`alumno_id`) REFERENCES `alumno`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `horario_sesiones` ADD CONSTRAINT `horario_sesiones_ibfk_1` FOREIGN KEY (`alumno_id`) REFERENCES `alumno`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `horario_sesiones` ADD CONSTRAINT `horario_sesiones_ibfk_2` FOREIGN KEY (`maestro_id`) REFERENCES `maestros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesiones` ADD CONSTRAINT `sesiones_ibfk_2` FOREIGN KEY (`alumno_id`) REFERENCES `alumno`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesiones` ADD CONSTRAINT `sesiones_ibfk_1` FOREIGN KEY (`horario_sesion_id`) REFERENCES `horario_sesiones`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesiones` ADD CONSTRAINT `sesiones_ibfk_3` FOREIGN KEY (`maestro_id`) REFERENCES `maestros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesiones` ADD CONSTRAINT `sesiones_ibfk_4` FOREIGN KEY (`padre_presente_id`) REFERENCES `padre`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trabajos_sesion` ADD CONSTRAINT `trabajos_sesion_ibfk_1` FOREIGN KEY (`sesion_id`) REFERENCES `sesiones`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `eventos` ADD CONSTRAINT `fk_eventos_actualizado_por` FOREIGN KEY (`actualizado_por_admin_id`) REFERENCES `admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eventos` ADD CONSTRAINT `fk_eventos_creado_por` FOREIGN KEY (`creado_por_admin_id`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
