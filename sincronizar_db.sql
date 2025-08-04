-- Sincroniza la secuencia de IDs para cada tabla
SELECT setval(pg_get_serial_sequence('admin', 'id'), COALESCE(max(id), 1)) FROM admin;
SELECT setval(pg_get_serial_sequence('maestro', 'id'), COALESCE(max(id), 1)) FROM maestro;
SELECT setval(pg_get_serial_sequence('padre', 'id'), COALESCE(max(id), 1)) FROM padre;
SELECT setval(pg_get_serial_sequence('alumno', 'id'), COALESCE(max(id), 1)) FROM alumno;
SELECT setval(pg_get_serial_sequence('eventos', 'id'), COALESCE(max(id), 1)) FROM eventos;
SELECT setval(pg_get_serial_sequence('asistencias', 'id'), COALESCE(max(id), 1)) FROM asistencias;
SELECT setval(pg_get_serial_sequence('reportes', 'id'), COALESCE(max(id), 1)) FROM reportes;
SELECT setval(pg_get_serial_sequence('reporte_items', 'id'), COALESCE(max(id), 1)) FROM reporte_items;