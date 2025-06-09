export const ITEM_PER_PAGE = 5

type RouteAccessMap = {
    [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
    "/admin(.*)": ["admin"],
    "/estudiante(.*)": ["estudiante"],
    "/maestro(.*)": ["maestro"],
    "/padre(.*)": ["padre"],
    "/list/maestros": ["admin", "maestro"],
    "/list/estudiantes": ["admin", "maestro"],
    "/list/padres": ["admin", "maestro"],
    "/list/grados": ["admin"],
    "/list/clases": ["admin", "maestro"],
    "/list/examenes": ["admin", "maestro", "estudiante", "padre"],
    "/list/asignaturas": ["admin", "maestro", "estudiante", "padre"],
    "/list/resultados": ["admin", "maestro", "estudiante", "padre"],
    "/list/asistencia": ["admin", "maestro", "estudiante", "padre"],
    "/list/eventos": ["admin", "maestro", "estudiante", "padre"],
    "/list/anuncios": ["admin", "maestro", "estudiante", "padre"],
};