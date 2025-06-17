"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { maestroSchema, MaestroSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createMaestro, updateMaestro } from "@/lib/actions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputField from "../InputField";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

type MaestroFormData = MaestroSchema;

const MaestroForm = ({
    type,
    data,
    setOpen,
}: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MaestroFormData>({
        resolver: zodResolver(maestroSchema),
        defaultValues: {
            ...data,
            fecha_de_nacimiento: data?.fecha_de_nacimiento
                ? new Date(data.fecha_de_nacimiento)
                : undefined,
            fecha_ingreso: data?.fecha_ingreso
                ? new Date(data.fecha_ingreso)
                : undefined,
        },
    });

    const [img, setImg] = useState<any>();
    const router = useRouter();

    const [state, formAction] = useFormState(
        type === "create" ? createMaestro : updateMaestro,
        {
            success: false,
            error: false,
        }
    );

    const onSubmit = handleSubmit((formData) => {
        formAction({
            ...formData,
            // imagen: img?.secure_url,
        });
    });

    useEffect(() => {
        if (state.success) {
            toast(`Maestro ${type === "create" ? "creado" : "actualizado"} correctamente.`);
            setOpen(false);
            router.refresh();
        }
    }, [state, type, router, setOpen]);

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <h1 className="text-xl font-bold">
                {type === "create" ? "Registrar Maestro" : "Actualizar Información"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="Nombre"
                    name="nombre"
                    register={register}
                    defaultValue={data?.nombre}
                    error={errors.nombre}
                />
                <InputField
                    label="Apellido"
                    name="apellido"
                    register={register}
                    defaultValue={data?.apellido}
                    error={errors.apellido}
                />
                <InputField
                    label="Documento de Identidad"
                    name="documento_identidad"
                    register={register}
                    defaultValue={data?.documento_identidad}
                    error={errors.documento_identidad}
                />
                <InputField
                    label="Fecha de Nacimiento"
                    name="fecha_de_nacimiento"
                    type="date"
                    register={register}
                    defaultValue={
                        data?.fecha_de_nacimiento
                            ? new Date(data.fecha_de_nacimiento).toISOString().split("T")[0]
                            : ""
                    }
                    error={errors.fecha_de_nacimiento}
                />
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-xs text-gray-500">Género</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("genero")}
                        defaultValue={data?.genero}
                    >
                        <option value="">Seleccionar...</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                    {errors.genero && (
                        <p className="text-xs text-red-500">
                            {errors.genero.message?.toString()}
                        </p>
                    )}
                </div>
                <InputField
                    label="Teléfono Móvil"
                    name="telefono_movil"
                    register={register}
                    defaultValue={data?.telefono_movil}
                    error={errors.telefono_movil}
                />
                <InputField
                    label="Teléfono de Trabajo"
                    name="telefono_trabajo"
                    register={register}
                    defaultValue={data?.telefono_trabajo}
                    error={errors.telefono_trabajo}
                />
                <InputField
                    label="Correo Electrónico"
                    name="email"
                    type="email"
                    register={register}
                    defaultValue={data?.email}
                    error={errors.email}
                />
                <InputField
                    label="Tipo Profesional"
                    name="tipo_profesional"
                    register={register}
                    defaultValue={data?.tipo_profesional}
                    error={errors.tipo_profesional}
                />
                <InputField
                    label="Número de Licencia"
                    name="numero_licencia"
                    register={register}
                    defaultValue={data?.numero_licencia}
                    error={errors.numero_licencia}
                />
                <InputField
                    label="Universidad de Graduación"
                    name="universidad_graduacion"
                    register={register}
                    defaultValue={data?.universidad_graduacion}
                    error={errors.universidad_graduacion}
                />
                <InputField
                    label="Años de Experiencia"
                    name="años_experiencia"
                    type="number"
                    register={register}
                    defaultValue={data?.años_experiencia}
                    error={errors.años_experiencia}
                />
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-xs text-gray-500">Estado</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("estado")}
                        defaultValue={data?.estado || "activo"}
                    >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="suspendido">Suspendido</option>
                        <option value="retirado">Retirado</option>
                    </select>
                    {errors.estado && (
                        <p className="text-xs text-red-500">
                            {errors.estado.message?.toString()}
                        </p>
                    )}
                </div>
                <InputField
                    label="Fecha de Ingreso"
                    name="fecha_ingreso"
                    type="date"
                    register={register}
                    defaultValue={
                        data?.fecha_ingreso
                            ? new Date(data.fecha_ingreso).toISOString().split("T")[0]
                            : ""
                    }
                    error={errors.fecha_ingreso}
                />
            </div>

            {/* <CldUploadWidget
                uploadPreset="school"
                onSuccess={(result, { widget }) => {
                    setImg(result.info);
                    widget.close();
                }}
            >
                {({ open }) => (
                    <div
                        className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                        onClick={() => open()}
                    >
                        <Image src="/upload.png" alt="" width={28} height={28} />
                        <span>Subir Fotografía</span>
                    </div>
                )}
            </CldUploadWidget> */}

            {state.error && <p className="text-red-500">Algo salió mal al enviar el formulario.</p>}

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
            >
                {type === "create" ? "Crear Maestro" : "Actualizar Información"}
            </button>
        </form>
    );
};

export default MaestroForm;