-- BORRA LOS DATOS ANTIGUOS EN EL ORDEN CORRECTO PARA EVITAR ERRORES DE RELACIÓN
DELETE FROM "reporte_items";
DELETE FROM "reportes";
DELETE FROM "asistencias";
DELETE FROM "_MateriaToalumno";
DELETE FROM "materias";
DELETE FROM "alumno";
DELETE FROM "padre";
DELETE FROM "maestro";
DELETE FROM "admin";
DELETE FROM "eventos";


-- INSERTA DATOS NUEVOS CON IDs Y FECHAS EXPLÍCITAS

-- Tabla: admin
-- Usamos 'NOW()' para que la base de datos inserte la fecha y hora actual.
INSERT INTO "admin" ("id", "idusuario", "estado", "fecha_creacion", "fecha_actualizacion") VALUES
(1, 'admin001', 'activo', NOW(), NOW()),
(2, 'admin002', 'inactivo', NOW(), NOW());

-- Tabla: maestro (Licenciados)
-- Definimos explícitamente los IDs para que las relaciones funcionen.
INSERT INTO "maestro" ("id", "nombre", "apellido", "documento_identidad", "email", "telefono_movil", "tipo_profesional", "fecha_creacion", "fecha_actualizacion") VALUES
(1, 'Fabián', 'Jiménez', '0101-1980-00123', 'fabian.jimenez@example.com', '99887766', 'psicologo', NOW(), NOW()),
(2, 'Nora', 'Mendoza', '0102-1985-00456', 'nora.mendoza@example.com', '98765432', 'terapeuta', NOW(), NOW());

-- Tabla: padre
INSERT INTO "padre" ("id", "nombre", "apellido", "tipo_parentesco", "direccion", "telefono_movil", "fecha_creacion", "fecha_actualizacion") VALUES
(1, 'Rocío', 'Guerrero', 'madre', 'Col. El Sauce, Casa 10', '95258906', NOW(), NOW()),
(2, 'Milton', 'Puerto', 'padre', 'Col. El Sauce, Casa 10', '99567213', NOW(), NOW());

-- Tabla: alumno (Matrículas)
INSERT INTO "alumno" (
    "id", "nombre", "apellido", "fecha_de_nacimiento", "lugar_de_nacimiento", "genero", "institucion_procedencia",
    "direccion", "telefono_fijo", "telefono_movil", "padreId", "terapeutaPrincipalId", "fecha_creacion", "fecha_actualizacion"
) VALUES
(
    1, 'Hamilton Johan', 'Puerto Guerrero', '2017-09-28', 'La Ceiba, Atlántida', 'masculino', 'Ninguna',
    'Col. El Sauce, Casa 10', '2440-1234', '95258906', 1, 1, NOW(), NOW()
);

-- Tabla: materias (Lecciones/Clases)
INSERT INTO "materias" ("id", "nombre", "descripcion", "maestroId", "fecha_creacion", "fecha_actualizacion") VALUES
('uuid-materia-1', 'Terapia Sensorial', 'Actividades para estimular los sentidos.', 2, NOW(), NOW()),
('uuid-materia-2', 'Comunicación y Lenguaje', 'Ejercicios para mejorar la comunicación verbal.', 1, NOW(), NOW());

-- Tabla de unión para la relación Materia-Alumno
INSERT INTO "_MateriaToalumno" ("A", "B") VALUES
('uuid-materia-1', 1),
('uuid-materia-2', 1);

-- Tabla: asistencias
INSERT INTO "asistencias" ("date", "present", "alumnoId") VALUES
('2025-08-01', true, 1),
('2025-08-02', false, 1);

-- Tabla: eventos
INSERT INTO "eventos" ("titulo", "descripcion", "tipo_evento", "fecha_inicio", "fecha_fin", "lugar", "fecha_creacion", "fecha_actualizacion") VALUES
('Reunión de Padres Semestral', 'Entrega de informes y planificación.', 'reunion_padres', '2025-08-15 18:00:00', '2025-08-15 20:00:00', 'Salón Principal', NOW(), NOW()),
('Taller de Verano', 'Actividades recreativas y de aprendizaje.', 'taller', '2025-09-01 09:00:00', '2025-09-05 12:00:00', 'Patio Central', NOW(), NOW());

-- Tabla: reportes
INSERT INTO "reportes" ("fecha_entrega", "resumen", "conclusiones", "recomendaciones", "alumnoId", "licenciadoId", "fecha_creacion", "fecha_actualizacion") VALUES
('2025-07-05', 'Hamilton es un niño muy inteligente, cariñoso y enérgico.', 'Se ha notado un avance significativo en su aprendizaje.', 'Continuar trabajando en conjunto padres, centro y terapeuta.', 1, 1, NOW(), NOW());