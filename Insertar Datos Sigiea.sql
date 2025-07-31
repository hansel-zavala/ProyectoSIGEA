-- Datos para la tabla admin
INSERT INTO admin (idusuario, estado) VALUES
('admin001', 'activo'),
('admin002', 'inactivo');

-- Datos para la tabla maestro
INSERT INTO maestro (idusuario, nombre, apellido, documento_identidad, fecha_de_nacimiento, genero, telefono_movil, email, tipo_profesional, estado, fecha_ingreso) VALUES
('teacher001', 'Carlos', 'Lopez', '123456789', '1980-05-15', 'masculino', '555-1234', 'carlos.lopez@example.com', 'psicologo', 'activo', '2020-01-10'),
('teacher002', 'Ana', 'Martinez', '987654321', '1985-08-22', 'femenino', '555-5678', 'ana.martinez@example.com', 'terapeuta', 'activo', '2021-03-15');

-- Datos para la tabla padre
INSERT INTO padre (idusuario, nombre, apellido, documento_identidad, tipo_parentesco, fecha_de_nacimiento, genero, telefono_movil, email, activo) VALUES
('parent001', 'Maria', 'Gomez', '112233445', 'madre', '1982-11-30', 'femenino', '555-8765', 'maria.gomez@example.com', true),
('parent002', 'Juan', 'Rodriguez', '556677889', 'padre', '1980-02-20', 'masculino', '555-4321', 'juan.rodriguez@example.com', true);

-- Datos para la tabla alumno
INSERT INTO alumno (idusuario, nombre, apellido, fecha_de_nacimiento, genero, documento_identidad, lugar_de_nacimiento, institucion_procedencia, "año_de_ingreso", estado, jornada_actual, recibio_evaluacion, usa_medicamentos, alergias, maestro_actual_id) VALUES
('student001', 'Luis', 'Gomez', '2010-01-01', 'masculino', '123123123', 'Ciudad Ejemplo', 'Escuela Anterior', 2022, 'activo', 'matutina', false, false, false, 1),
('student002', 'Sofia', 'Rodriguez', '2011-02-02', 'femenino', '456456456', 'Ciudad Ejemplo', 'Otra Escuela', 2023, 'activo', 'vespertina', false, false, false, 2);

-- Datos para la tabla eventos
INSERT INTO eventos (titulo, descripcion, tipo_evento, fecha_inicio, fecha_fin, lugar, estado, es_publico) VALUES
('Reunión de Padres', 'Reunión trimestral de padres y maestros.', 'reunion_padres', '2024-08-15 18:00:00', '2024-08-15 20:00:00', 'Salón Principal', 'planificado', true),
('Capacitación Docente', 'Capacitación sobre nuevas metodologías.', 'capacitacion_maestros', '2024-09-01 09:00:00', '2024-09-01 17:00:00', 'Auditorio', 'confirmado', false);