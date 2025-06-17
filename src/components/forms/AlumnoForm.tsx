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
// &{
//     username?: string;
//     password?: string;
// };

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
        // resolver: zodResolver(alumnoSchema.extend({
        //     username: type === "create" ? alumnoSchema.shape.nombre : alumnoSchema.shape.nombre.optional(),
        //     password: type === "create" ? alumnoSchema.shape.nombre : alumnoSchema.shape.nombre.optional(),
        // })),
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

    // const { maestros = [] } = relatedData || {};

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Crear nuevo alumno" : "Actualizar alumno"}
            </h1>

            {type === "create" && (
                <>
                    {/* <span className="text-xs text-gray-400 font-medium">
                        Información de Autenticación
                    </span>
                    <div className="flex justify-between flex-wrap gap-4">
                        <InputField
                            label="Usuario"
                            name="username"
                            register={register}
                            error={errors?.username}
                        />
                        <InputField
                            label="Contraseña"
                            name="password"
                            type="password"
                            register={register}
                            error={errors?.password}
                        />
                    </div> */}
                </>
            )}

            <span className="text-xs text-gray-400 font-medium">
                Información Personal
            </span>
            <div className="flex justify-between flex-wrap gap-4">
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
                    name="fechaDeNacimiento"
                    defaultValue={data?.fechaDeNacimiento ? new Date(data.fechaDeNacimiento).toISOString().split("T")[0] : ""}
                    register={register}
                    error={errors.fechaDeNacimiento}
                    type="date"
                />
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Género</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("genero")}
                        defaultValue={data?.genero}
                    >
                        <option value="">Seleccionar...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>
                <InputField
                    label="Documento de Identidad"
                    name="documentoIdentidad"
                    defaultValue={data?.documentoIdentidad}
                    register={register}
                    error={errors.documentoIdentidad}
                />
                <InputField
                    label="Lugar de Nacimiento"
                    name="lugarDeNacimiento"
                    defaultValue={data?.lugarDeNacimiento}
                    register={register}
                    error={errors.lugarDeNacimiento}
                />
                {/* <InputField
                    label="Teléfono Móvil"
                    name="telefonoMovil"
                    defaultValue={data?.telefonoMovil}
                    register={register}
                    error={errors.telefonoMovil}
                />
                <InputField
                    label="Email"
                    name="email"
                    defaultValue={data?.email}
                    register={register}
                    error={errors.email}
                    type="email"
                />
                <InputField
                    label="Estado Civil"
                    name="estadoCivil"
                    defaultValue={data?.estadoCivil}
                    register={register}
                    error={errors.estadoCivil}
                /> */}
            </div>

            <span className="text-xs text-gray-400 font-medium">
                Información Académica
            </span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Institución de Procedencia"
                    name="institucionProcedencia"
                    defaultValue={data?.institucionProcedencia}
                    register={register}
                    error={errors.institucionProcedencia}
                />
                <InputField
                    label="Año de Ingreso"
                    name="a_o_de_ingreso"
                    defaultValue={data?.a_o_de_ingreso}
                    register={register}
                    error={errors.a_o_de_ingreso}
                    type="number"
                />
                <InputField
                    label="Carrera"
                    name="carrera"
                    defaultValue={data?.carrera}
                    register={register}
                    error={errors.carrera}
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
                        {...register("jornadaActual")}
                        defaultValue={data?.jornadaActual || "matutina"}
                    >
                        <option value="matutina">Matutina</option>
                        <option value="vespertina">Vespertina</option>
                    </select>
                </div>
                {/* <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Maestro Actual</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("maestroActualId")}
                        defaultValue={data?.maestroActualId}
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

            {/* <span className="text-xs text-gray-400 font-medium">
                Información de Emergencia
            </span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Nombre Contacto de Emergencia"
                    name="nombreContactoEmergencia"
                    defaultValue={data?.nombreContactoEmergencia}
                    register={register}
                    error={errors.nombreContactoEmergencia}
                />
                <InputField
                    label="Teléfono de Emergencia"
                    name="telefonoEmergencia"
                    defaultValue={data?.telefonoEmergencia}
                    register={register}
                    error={errors.telefonoEmergencia}
                />
            </div> */}

            <span className="text-xs text-gray-400 font-medium">
                Información Médica
            </span>
            <div className="flex justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("recibioEvaluacion")}
                        defaultChecked={data?.recibioEvaluacion}
                    />
                    <label className="text-sm">Recibió Evaluación</label>
                </div>
                {data?.fechaEvaluacion && (
                    <InputField
                        label="Fecha de Evaluación"
                        name="fechaEvaluacion"
                        defaultValue={new Date(data.fechaEvaluacion).toISOString().split("T")[0]}
                        register={register}
                        error={errors.fechaEvaluacion}
                        type="date"
                    />
                )}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("usaMedicamentos")}
                        defaultChecked={data?.usaMedicamentos}
                    />
                    <label className="text-sm">Usa Medicamentos</label>
                </div>
                <InputField
                    label="Detalle de Medicamentos"
                    name="medicamentosDetalle"
                    defaultValue={data?.medicamentosDetalle}
                    register={register}
                    error={errors.medicamentosDetalle}
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
                    name="alergiasDetalle"
                    defaultValue={data?.alergiasDetalle}
                    register={register}
                    error={errors.alergiasDetalle}
                />
                <div className="w-full">
                    <label className="text-xs text-gray-500">Observaciones Médicas</label>
                    <textarea
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("observacionesMedicas")}
                        defaultValue={data?.observacionesMedicas}
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