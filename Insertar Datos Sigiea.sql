-- BORRA LOS DATOS ANTIGUOS PARA EVITAR ERRORES DE DUPLICADOS
DELETE FROM "_MateriaToalumno";
DELETE FROM "asistencias";
DELETE FROM "reporte_items";
DELETE FROM "reportes";
DELETE FROM "materias";
DELETE FROM "alumno";
DELETE FROM "padre";
DELETE FROM "maestro";
DELETE FROM "admin";
DELETE FROM "eventos";


-- INSERTA DATOS NUEVOS

-- Tabla: admin
INSERT INTO "admin" ("idusuario", "estado") VALUES
('admin001', 'activo'),
('admin002', 'inactivo');

-- Tabla: maestro (Licenciados)
INSERT INTO "maestro" ("id", "nombre", "apellido", "documento_identidad", "email", "telefono_movil", "tipo_profesional") VALUES
(1, 'Fabián', 'Jiménez', '0101-1980-00123', 'fabian.jimenez@example.com', '99887766', 'psicologo'),
(2, 'Nora', 'Mendoza', '0102-1985-00456', 'nora.mendoza@example.com', '98765432', 'terapeuta');

-- Tabla: padre
INSERT INTO "padre" ("id", "nombre", "apellido", "tipo_parentesco", "direccion", "telefono_movil") VALUES
(1, 'Rocío', 'Guerrero', 'madre', 'Col. El Sauce, Casa 10', '95258906'),
(2, 'Milton', 'Puerto', 'padre', 'Col. El Sauce, Casa 10', '99567213');

-- Tabla: alumno (Matrículas)
INSERT INTO "alumno" (
    "nombre", "apellido", "fecha_de_nacimiento", "lugar_de_nacimiento", "genero", "institucion_procedencia",
    "direccion", "telefono_fijo", "telefono_movil",
    "atencion_individual", "atencion_grupal",
    "usa_medicamentos", "medicamentos_detalle", "alergias", "alergias_detalle",
    "padreId", "terapeutaPrincipalId"
) VALUES
(
    'Hamilton Johan', 'Puerto Guerrero', '2017-09-28', 'La Ceiba, Atlántida', 'masculino', 'Ninguna',
    'Col. El Sauce, Casa 10', '2440-1234', '95258906',
    true, true,
    true, 'Ritalina 10mg', true, 'Maní',
    1, 1 -- Asignado al padre con ID 1 y al licenciado con ID 1
);

-- Tabla: materias (Lecciones/Clases)
INSERT INTO "materias" ("id", "nombre", "descripcion", "maestroId") VALUES
('uuid-materia-1', 'Terapia Sensorial', 'Actividades para estimular los sentidos.', 2),
('uuid-materia-2', 'Comunicación y Lenguaje', 'Ejercicios para mejorar la comunicación verbal.', 1);

-- Tabla de unión para la relación muchos-a-muchos entre Materia y Alumno
INSERT INTO "_MateriaToalumno" ("A", "B") VALUES
('uuid-materia-1', 1), -- Alumno 1 en Terapia Sensorial
('uuid-materia-2', 1); -- Alumno 1 en Comunicación y Lenguaje

-- Tabla: asistencias
INSERT INTO "asistencias" ("date", "present", "alumnoId") VALUES
('2025-08-01', true, 1),
('2025-08-02', false, 1);

-- Tabla: eventos
INSERT INTO "eventos" ("titulo", "descripcion", "tipo_evento", "fecha_inicio", "fecha_fin", "lugar") VALUES
('Reunión de Padres Semestral', 'Entrega de informes y planificación.', 'reunion_padres', '2025-08-15 18:00:00', '2025-08-15 20:00:00', 'Salón Principal'),
('Taller de Verano', 'Actividades recreativas y de aprendizaje.', 'taller', '2025-09-01 09:00:00', '2025-09-05 12:00:00', 'Patio Central');

-- Tabla: reportes
INSERT INTO "reportes" ("fecha_entrega", "resumen", "conclusiones", "recomendaciones", "alumnoId", "licenciadoId") VALUES
('2025-07-05', 'Hamilton es un niño muy inteligente, cariñoso y enérgico.', 'Se ha notado un avance significativo en su aprendizaje.', 'Continuar trabajando en conjunto padres, centro y terapeuta.', 1, 1);