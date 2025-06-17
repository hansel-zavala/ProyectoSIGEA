"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { padreSchema, PadreSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createPadre, updatePadre } from "@/lib/actions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputField from "../InputField";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

type PadreFormData = PadreSchema;

const PadreForm = ({
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
    } = useForm<PadreFormData>({
        resolver: zodResolver(padreSchema),
        defaultValues: {
            ...data,
            fecha_de_nacimiento: data?.fecha_de_nacimiento
                ? new Date(data.fecha_de_nacimiento)
                : undefined,
        },
    });

    const [img, setImg] = useState<any>();
    const router = useRouter();

    const [state, formAction] = useFormState(
        type === "create" ? createPadre : updatePadre,
        {
            success: false,
            error: false,
        }
    );

    const onSubmit = handleSubmit((formData) => {
        formAction({
            ...formData,
            //   img: img?.secure_url,
        });
    });

    useEffect(() => {
        if (state.success) {
            toast(`Padre ${type === "create" ? "creado" : "actualizado"} correctamente.`);
            setOpen(false);
            router.refresh();
        }
    }, [state, type, router, setOpen]);

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <h1 className="text-xl font-bold">
                {type === "create" ? "Registrar Padre/Tutor" : "Actualizar Información"}
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
                <div>
                    <label className="text-xs text-gray-500">Tipo de Parentesco</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("tipo_parentesco")}
                        defaultValue={data?.tipo_parentesco || "padre"}
                    >
                        <option value="madre">Madre</option>
                        <option value="padre">Padre</option>
                        <option value="tutor">Tutor</option>
                        <option value="guardian">Guardián</option>
                    </select>
                    {errors.tipo_parentesco && (
                        <p className="text-xs text-red-500">
                            {errors.tipo_parentesco.message?.toString()}
                        </p>
                    )}
                </div>
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
                    label="Lugar de Nacimiento"
                    name="lugar_de_nacimiento"
                    register={register}
                    defaultValue={data?.lugar_de_nacimiento}
                    error={errors.lugar_de_nacimiento}
                />
                <InputField
                    label="Teléfono Móvil"
                    name="telefono_movil"
                    register={register}
                    defaultValue={data?.telefono_movil}
                    error={errors.telefono_movil}
                />
                {/* <InputField
                    label="Teléfono de Trabajo"
                    name="telefono_trabajo"
                    register={register}
                    defaultValue={data?.telefono_trabajo}
                    error={errors.telefono_trabajo}
                /> */}
                <InputField
                    label="Correo Electrónico"
                    name="email"
                    type="email"
                    register={register}
                    defaultValue={data?.email}
                    error={errors.email}
                />
                <InputField
                    label="Ocupación"
                    name="ocupacion"
                    register={register}
                    defaultValue={data?.ocupacion}
                    error={errors.ocupacion}
                />
                <InputField
                    label="Lugar de Trabajo"
                    name="lugar_trabajo"
                    register={register}
                    defaultValue={data?.lugar_trabajo}
                    error={errors.lugar_trabajo}
                />
                <InputField
                    label="Estado Civil"
                    name="estado_civil"
                    register={register}
                    defaultValue={data?.estado_civil}
                    error={errors.estado_civil}
                />
                {/* <InputField
                    label="Nivel Educativo"
                    name="nivel_educativo"
                    register={register}
                    defaultValue={data?.nivel_educativo}
                    error={errors.nivel_educativo}
                /> */}
                {/* <InputField
                    label="Ingresos Mensuales"
                    name="ingresos_mensuales"
                    type="number"
                    register={register}
                    defaultValue={data?.ingresos_mensuales}
                    error={errors.ingresos_mensuales}
                /> */}
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
                {type === "create" ? "Crear Padre" : "Actualizar Información"}
            </button>
        </form>
    );
};

export default PadreForm;
