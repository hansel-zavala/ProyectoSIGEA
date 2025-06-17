import FormContainer from "@/components/FormContainer";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

type Alumno = {
    id: number;
    idusuario?: string;
    nombre: string;
    apellido: string;
    fecha_de_nacimiento: string; // ISO string date
    genero: "masculino" | "femenino";
    documento_identidad?: string | null;
    lugar_de_nacimiento: string;
    institucion_procedencia: string;
    a_o_de_ingreso?: number | null;
    estado?: string;
    jornada_actual?: string;
    recibio_evaluacion?: boolean | null;
    fecha_evaluacion?: string | null;
    usa_medicamentos?: boolean | null;
    medicamentos_detalle?: string | null;
    alergias?: boolean | null;
    alergias_detalle?: string | null;
    observaciones_medicas?: string | null;
    maestro_actual_id?: number | null;
    fecha_creacion: string;
    fecha_actualizacion: string;
};

const PaginaAlumnoUnica = async ({
    params,
}: {
    params: { id: string };
}) => {
    const { sessionClaims } = auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    // Find alumno by id with Prisma
    const alumno = await prisma.alumno.findUnique({
        where: { id: Number(params.id) },
    });

    if (!alumno) {
        return <div>No se encontró el estudiante</div>;
    }

    return (
        <div className="bg-white rounded-md p-6 m-4">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                    {alumno.nombre} {alumno.apellido}
                </h1>
                <div className="flex gap-2">
                    <Link href="/list/alumnos">
                        <button className="btn-primary">Volver a la lista</button>
                    </Link>
                    {role === "admin" && (
                        <>
                            <FormContainer type="update" table="alumno" data={alumno} />
                            <FormContainer type="delete" table="alumno" id={alumno.id} />
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Basic info */}
                <div>
                    <p>
                        <strong>ID Usuario:</strong> {alumno.idusuario || "-"}
                    </p>
                    <p>
                        <strong>Documento de identidad:</strong>{" "}
                        {alumno.documento_identidad || "-"}
                    </p>
                    <p>
                        <strong>Fecha de nacimiento:</strong>{" "}
                        {alumno.fecha_de_nacimiento
                            ? new Date(alumno.fecha_de_nacimiento).toLocaleDateString()
                            : "-"}
                    </p>
                    <p>
                        <strong>Género:</strong> {alumno.genero}
                    </p>
                    <p>
                        <strong>Lugar de nacimiento:</strong> {alumno.lugar_de_nacimiento}
                    </p>
                    <p>
                        <strong>Institución de procedencia:</strong>{" "}
                        {alumno.institucion_procedencia}
                    </p>
                    <p>
                        <strong>Año de ingreso:</strong>{" "}
                        {alumno.a_o_de_ingreso ?? "-"}
                    </p>
                    <p>
                        <strong>Estado:</strong> {alumno.estado ?? "-"}
                    </p>
                    <p>
                        <strong>Jornada actual:</strong> {alumno.jornada_actual ?? "-"}
                    </p>
                </div>

                {/* Right column - Medical and evaluation info */}
                <div>
                    <p>
                        <strong>Recibió evaluación:</strong>{" "}
                        {alumno.recibio_evaluacion ? "Sí" : "No"}
                    </p>
                    <p>
                        <strong>Fecha evaluación:</strong>{" "}
                        {alumno.fecha_evaluacion
                            ? new Date(alumno.fecha_evaluacion).toLocaleDateString()
                            : "-"}
                    </p>
                    <p>
                        <strong>Usa medicamentos:</strong>{" "}
                        {alumno.usa_medicamentos ? "Sí" : "No"}
                    </p>
                    <p>
                        <strong>Detalle medicamentos:</strong>{" "}
                        {alumno.medicamentos_detalle || "-"}
                    </p>
                    <p>
                        <strong>¿Tiene alergias?:</strong>{" "}
                        {alumno.alergias ? "Sí" : "No"}
                    </p>
                    <p>
                        <strong>Detalle alergias:</strong>{" "}
                        {alumno.alergias_detalle || "-"}
                    </p>
                    <p>
                        <strong>Observaciones médicas:</strong>{" "}
                        {alumno.observaciones_medicas || "-"}
                    </p>
                    <p>
                        <strong>ID Maestro Actual:</strong>{" "}
                        {alumno.maestro_actual_id ?? "-"}
                    </p>
                    <p>
                        <strong>Fecha de creación:</strong>{" "}
                        {new Date(alumno.fecha_creacion).toLocaleString()}
                    </p>
                    <p>
                        <strong>Fecha de actualización:</strong>{" "}
                        {new Date(alumno.fecha_actualizacion).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaginaAlumnoUnica;
