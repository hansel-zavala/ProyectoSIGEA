-- 1. Admin Table
CREATE TABLE sigieaprueba.admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idusuario VARCHAR(100) UNIQUE NOT NULL,
    estado ENUM('activo', 'inactivo', 'suspendido') DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Maestros Table
CREATE TABLE sigieaprueba.maestros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idusuario VARCHAR(100) UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    documento_identidad VARCHAR(20) NOT NULL UNIQUE,
    fecha_de_nacimiento DATE,
    genero VARCHAR(10),
    telefono_movil VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    tipo_profesional ENUM('psicologo', 'terapeuta', 'ambos') NOT NULL,
    estado ENUM('activo', 'inactivo', 'vacaciones') DEFAULT 'activo',
    fecha_ingreso DATE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Padre Table
CREATE TABLE sigieaprueba.padre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idusuario VARCHAR(100) UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    documento_identidad VARCHAR(20),
    tipo_parentesco ENUM('madre', 'padre', 'tutor', 'guardian') NOT NULL,
    fecha_de_nacimiento DATE,
    genero VARCHAR(10),
    telefono_movil VARCHAR(20),
    email VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Alumno Table
CREATE TABLE sigieaprueba.alumno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idusuario VARCHAR(100) UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    fecha_de_nacimiento DATE NOT NULL,
    genero VARCHAR(10),
    documento_identidad VARCHAR(20),
    lugar_de_nacimiento VARCHAR(150) NOT NULL,
    institucion_procedencia VARCHAR(100) NOT NULL,
    año_de_ingreso YEAR,
    estado ENUM('activo', 'inactivo', 'graduado', 'retirado') DEFAULT 'activo',
    jornada_actual ENUM('matutina', 'vespertina') DEFAULT 'matutina',
    recibio_evaluacion BOOLEAN DEFAULT FALSE,
    fecha_evaluacion DATE,
    usa_medicamentos BOOLEAN DEFAULT FALSE,
    medicamentos_detalle TEXT,
    alergias BOOLEAN DEFAULT FALSE,
    alergias_detalle TEXT,
    observaciones_medicas TEXT,
    maestro_actual_id INT, -- Optional foreign key, can keep or drop constraint
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Eventos Table
CREATE TABLE sigieaprueba.eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo_evento ENUM('reunion_padres', 'capacitacion_maestros', 'evaluacion_grupal', 
                     'actividad_recreativa', 'conferencia', 'taller', 'otro') NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    lugar VARCHAR(200),
    estado ENUM('planificado', 'confirmado', 'en_progreso', 'completado', 'cancelado') DEFAULT 'planificado',
    es_publico BOOLEAN DEFAULT TRUE,
    observaciones TEXT,
    creado_por_admin_id INT,
    actualizado_por_admin_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
