"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import { alumnoSchema, AlumnoSchema } from "@/lib/formValidationSchemas";
import { createAlumno, updateAlumno } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type AlumnoFormData = AlumnoSchema

const AlumnoForm = ({
    type,
    data,
    setOpen,
    relatedData,
}: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AlumnoFormData>({
        resolver: zodResolver(alumnoSchema),
        defaultValues: {
            ...data,
            fecha_de_nacimiento: data?.fecha_de_nacimiento
                ? new Date(data.fecha_de_nacimiento)
                : undefined,
            fecha_evaluacion: data?.fecha_evaluacion
                ? new Date(data.fecha_evaluacion)
                : undefined,
        },
    });

    const [state, formAction] = useFormState(
        type === "create" ? createAlumno : updateAlumno,
        {
            success: false,
            error: false,
        }
    );

    const onSubmit = handleSubmit((data) => {
        formAction(data);
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Alumno ${type === "create" ? "creado" : "actualizado"} exitosamente!`);
            setOpen(false);
            router.refresh();
        }
    }, [state, router, type, setOpen]);

    const { maestros = [] } = relatedData || {};

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Crear nuevo alumno" : "Actualizar alumno"}
            </h1>

            <span className="text-xs text-gray-400 font-medium">
                Información Personal
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="Nombre"
                    name="nombre"
                    defaultValue={data?.nombre}
                    register={register}
                    error={errors.nombre}
                />
                <InputField
                    label="Apellido"
                    name="apellido"
                    defaultValue={data?.apellido}
                    register={register}
                    error={errors.apellido}
                />
                <InputField
                    label="Fecha de Nacimiento"
                    name="fecha_de_nacimiento"
                    defaultValue={data?.fecha_de_nacimiento ? new Date(data.fecha_de_nacimiento).toISOString().split("T")[0] : ""}
                    register={register}
                    error={errors.fecha_de_nacimiento}
                    type="date"
                />
                <div className="flex flex-col gap-2 w-full md:w">
                    <label className="text-xs text-gray-500">Género</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("genero")}
                        defaultValue={data?.genero}
                    >
                        <option value="">Seleccionar...</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                </div>
                <InputField
                    label="Documento de Identidad"
                    name="documento_identidad"
                    defaultValue={data?.documento_identidad}
                    register={register}
                    error={errors.documento_identidad}
                />
                <InputField
                    label="Lugar de Nacimiento"
                    name="lugar_de_nacimiento"
                    defaultValue={data?.lugar_de_nacimiento}
                    register={register}
                    error={errors.lugar_de_nacimiento}
                />
            </div>

            <span className="text-xs text-gray-400 font-medium">
                Información Académica
            </span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Institución de Procedencia"
                    name="institucion_procedencia"
                    defaultValue={data?.institucion_procedencia}
                    register={register}
                    error={errors.institucion_procedencia}
                />
                <InputField
                    label="Año de Ingreso"
                    name="a_o_de_ingreso"
                    defaultValue={data?.a_o_de_ingreso}
                    register={register}
                    error={errors.a_o_de_ingreso}
                    type="number"
                />
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Estado</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("estado")}
                        defaultValue={data?.estado || "activo"}
                    >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="graduado">Graduado</option>
                        <option value="retirado">Retirado</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Jornada</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("jornada_actual")}
                        defaultValue={data?.jornada_actual || "matutina"}
                    >
                        <option value="matutina">Matutina</option>
                        <option value="vespertina">Vespertina</option>
                    </select>
                </div>
                {/* <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Maestro Actual</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("maestro_actual_id")}
                        defaultValue={data?.maestro_actual_id}
                    >
                        <option value="">Sin asignar</option>
                        {maestros.map((maestro: any) => (
                            <option key={maestro.id} value={maestro.id}>
                                {maestro.nombre} {maestro.apellido}
                            </option>
                        ))}
                    </select>
                </div> */}
            </div>

            <span className="text-xs text-gray-400 font-medium">
                Información Médica
            </span>
            <div className="flex justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("recibio_evaluacion")}
                        defaultChecked={data?.recibio_evaluacion}
                    />
                    <label className="text-sm">Recibió Evaluación</label>
                </div>
                <InputField
                    label="Fecha de Evaluación"
                    name="fecha_evaluacion"
                    defaultValue={data?.fecha_evaluacion ? new Date(data.fecha_evaluacion).toISOString().split("T")[0] : ""}
                    register={register}
                    error={errors.fecha_evaluacion}
                    type="date"
                />
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("usa_medicamentos")}
                        defaultChecked={data?.usa_medicamentos}
                    />
                    <label className="text-sm">Usa Medicamentos</label>
                </div>
                <InputField
                    label="Detalle de Medicamentos"
                    name="medicamentos_detalle"
                    defaultValue={data?.medicamentos_detalle}
                    register={register}
                    error={errors.medicamentos_detalle}
                />
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("alergias")}
                        defaultChecked={data?.alergias}
                    />
                    <label className="text-sm">Tiene Alergias</label>
                </div>
                <InputField
                    label="Detalle de Alergias"
                    name="alergias_detalle"
                    defaultValue={data?.alergias_detalle}
                    register={register}
                    error={errors.alergias_detalle}
                />
                <div className="w-full">
                    <label className="text-xs text-gray-500">Observaciones Médicas</label>
                    <textarea
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("observaciones_medicas")}
                        defaultValue={data?.observaciones_medicas}
                        rows={3}
                    />
                </div>
            </div>

            {data && (
                <InputField
                    label="Id"
                    name="id"
                    defaultValue={data?.id}
                    register={register}
                    error={errors?.id}
                    hidden
                    type="number"
                />
            )}

            {state.error && (
                <span className="text-red-500">Algo salió mal!</span>
            )}
            <button
                type="submit"
                className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 transition-colors"
            >
                {type === "create" ? "Crear" : "Actualizar"}
            </button>
        </form>
    );
};

export default AlumnoForm;