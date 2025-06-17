-- Insert mock data into admin
INSERT INTO sigieaprueba.admin (idusuario, estado)
VALUES 
('admin001', 'activo'),
('admin002', 'inactivo'),
('admin003', 'suspendido');

-- Insert mock data into maestros
INSERT INTO sigieaprueba.maestros (
    idusuario, nombre, apellido, documento_identidad, fecha_de_nacimiento, genero,
    telefono_movil, email, tipo_profesional, estado, fecha_ingreso
)
VALUES
('maestro001', 'Laura', 'Pérez', '0801199012345', '1985-04-23', 'femenino',
 '98765432', 'laura.perez@example.com', 'psicologo', 'activo', '2020-01-15'),
('maestro002', 'Carlos', 'Ramírez', '0801198809876', '1988-10-12', 'masculino',
 '97654321', 'carlos.ramirez@example.com', 'terapeuta', 'vacaciones', '2019-08-01'),
('maestro003', 'Ana', 'López', '0801198701234', '1987-03-15', 'femenino',
 '91234567', 'ana.lopez@example.com', 'ambos', 'inactivo', '2018-05-20');

-- Insert mock data into padre
INSERT INTO sigieaprueba.padre (
    idusuario, nombre, apellido, documento_identidad, tipo_parentesco,
    fecha_de_nacimiento, genero, telefono_movil, email, activo
)
VALUES
('padre001', 'Juan', 'Martínez', '0801198001111', 'padre',
 '1980-06-10', 'masculino', '93456789', 'juan.martinez@example.com', TRUE),
('padre002', 'María', 'Gómez', '0801197902222', 'madre',
 '1979-02-20', 'femenino', '94561234', 'maria.gomez@example.com', TRUE),
('padre003', 'Luis', 'Santos', NULL, 'tutor',
 '1975-11-03', 'masculino', '92345678', 'luis.santos@example.com', FALSE);

-- Insert mock data into alumno
INSERT INTO sigieaprueba.alumno (
    idusuario, nombre, apellido, fecha_de_nacimiento, genero, documento_identidad,
    lugar_de_nacimiento, institucion_procedencia, año_de_ingreso, estado,
    jornada_actual, recibio_evaluacion, fecha_evaluacion, usa_medicamentos,
    medicamentos_detalle, alergias, alergias_detalle, observaciones_medicas,
    maestro_actual_id
)
VALUES
('alumno001', 'Mateo', 'Hernández', '2012-09-15', 'masculino', '0801201200001',
 'Tegucigalpa', 'Escuela Primaria A', 2022, 'activo',
 'matutina', TRUE, '2023-05-10', FALSE,
 NULL, FALSE, NULL, NULL, 1),
('alumno002', 'Sofía', 'Castro', '2013-04-20', 'femenino', '0801201300002',
 'San Pedro Sula', 'Colegio Bilingüe B', 2023, 'activo',
 'vespertina', FALSE, NULL, TRUE,
 'Ritalina', TRUE, 'Polen', 'Asma leve', 2),
('alumno003', 'Diego', 'Morales', '2011-12-01', 'masculino', NULL,
 'Comayagua', 'Centro Escolar C', 2021, 'retirado',
 'matutina', TRUE, '2022-09-15', FALSE,
 NULL, FALSE, NULL, NULL, NULL);

-- Insert mock data into eventos
INSERT INTO sigieaprueba.eventos (
    titulo, descripcion, tipo_evento, fecha_inicio, fecha_fin, lugar,
    estado, es_publico, observaciones, creado_por_admin_id, actualizado_por_admin_id
)
VALUES
('Reunión de Padres - Primer Trimestre', 'Revisión de desempeño académico de los alumnos',
 'reunion_padres', '2025-03-01 08:00:00', '2025-03-01 10:00:00', 'Auditorio principal',
 'confirmado', TRUE, NULL, 1, 1),

('Capacitación Docente sobre Autismo', 'Sesión para maestros sobre métodos de enseñanza inclusiva',
 'capacitacion_maestros', '2025-04-10 09:00:00', '2025-04-10 12:00:00', 'Sala de capacitación 2',
 'planificado', FALSE, 'Se requiere confirmación de asistencia', 1, 2),

('Actividad Recreativa - Día del Niño', 'Celebración con juegos, piñatas y refrigerios',
 'actividad_recreativa', '2025-09-10 13:00:00', '2025-09-10 17:00:00', 'Patio de juegos',
 'en_progreso', TRUE, NULL, 2, 3);
