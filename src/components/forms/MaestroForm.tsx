"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { maestroSchema, MaestroSchema } from "@/lib/formValidationSchemas";
import { createMaestro, updateMaestro } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type MaestroFormProps = {
    type: "create" | "update";
    defaultValues?: MaestroSchema;
    onClose: () => void;
};

export default function MaestroForm({ type, defaultValues, onClose }: MaestroFormProps) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<MaestroSchema>({
        resolver: zodResolver(maestroSchema),
        defaultValues: {
            ...defaultValues,
            // Normalize fecha_de_nacimiento to YYYY-MM-DD string if Date or string
            fecha_de_nacimiento:
                defaultValues?.fecha_de_nacimiento
                    ? new Date(defaultValues.fecha_de_nacimiento).toISOString().substring(0, 10)
                    : "",
        },
    });

    // To reset form if defaultValues change (e.g. edit)
    useEffect(() => {
        if (defaultValues) {
            reset({
                ...defaultValues,
                fecha_de_nacimiento:
                    defaultValues.fecha_de_nacimiento
                        ? new Date(defaultValues.fecha_de_nacimiento).toISOString().substring(0, 10)
                        : "",
            });
        }
    }, [defaultValues, reset]);

    const onSubmit = async (data: MaestroSchema) => {
        try {
            if (type === "create") {
                await createMaestro({ success: false, error: false }, data);
                toast.success("Maestro creado exitosamente");
            } else {
                await updateMaestro({ success: false, error: false }, data);
                toast.success("Maestro actualizado exitosamente");
            }
            router.refresh();
            onClose();
        } catch (error) {
            toast.error("Error al guardar el maestro");
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <h2 className="text-xl font-bold">{type === "create" ? "Crear Maestro" : "Editar Maestro"}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre */}
                <div>
                    <label htmlFor="nombre" className="block font-semibold mb-1">
                        Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="nombre"
                        {...register("nombre")}
                        type="text"
                        className={`input ${errors.nombre ? "border-red-500" : ""}`}
                    />
                    {errors.nombre && <p className="text-xs text-red-500">{errors.nombre.message}</p>}
                </div>

                {/* Apellido */}
                <div>
                    <label htmlFor="apellido" className="block font-semibold mb-1">
                        Apellido <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="apellido"
                        {...register("apellido")}
                        type="text"
                        className={`input ${errors.apellido ? "border-red-500" : ""}`}
                    />
                    {errors.apellido && <p className="text-xs text-red-500">{errors.apellido.message}</p>}
                </div>

                {/* Documento Identidad */}
                <div>
                    <label htmlFor="documento_identidad" className="block font-semibold mb-1">
                        Documento de Identidad
                    </label>
                    <input
                        id="documento_identidad"
                        {...register("documento_identidad")}
                        type="text"
                        className={`input ${errors.documento_identidad ? "border-red-500" : ""}`}
                    />
                    {errors.documento_identidad && (
                        <p className="text-xs text-red-500">{errors.documento_identidad.message}</p>
                    )}
                </div>

                {/* Fecha de Nacimiento */}
                <div>
                    <label htmlFor="fecha_de_nacimiento" className="block font-semibold mb-1">
                        Fecha de Nacimiento
                    </label>
                    <input
                        id="fecha_de_nacimiento"
                        {...register("fecha_de_nacimiento")}
                        type="date"
                        className={`input ${errors.fecha_de_nacimiento ? "border-red-500" : ""}`}
                    />
                    {errors.fecha_de_nacimiento && (
                        <p className="text-xs text-red-500">{errors.fecha_de_nacimiento.message}</p>
                    )}
                </div>

                {/* Género */}
                <div>
                    <label htmlFor="genero" className="block font-semibold mb-1">
                        Género
                    </label>
                    <select
                        id="genero"
                        {...register("genero")}
                        className={`input ${errors.genero ? "border-red-500" : ""}`}
                        defaultValue={defaultValues?.genero || ""}
                    >
                        <option value="">Seleccione</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                    {errors.genero && <p className="text-xs text-red-500">{errors.genero.message}</p>}
                </div>

                {/* Teléfono Móvil */}
                <div>
                    <label htmlFor="telefono_movil" className="block font-semibold mb-1">
                        Teléfono Móvil
                    </label>
                    <input
                        id="telefono_movil"
                        {...register("telefono_movil")}
                        type="tel"
                        className={`input ${errors.telefono_movil ? "border-red-500" : ""}`}
                    />
                    {errors.telefono_movil && (
                        <p className="text-xs text-red-500">{errors.telefono_movil.message}</p>
                    )}
                </div>

                {/* Teléfono Trabajo */}
                <div>
                    <label htmlFor="telefono_trabajo" className="block font-semibold mb-1">
                        Teléfono Trabajo
                    </label>
                    <input
                        id="telefono_trabajo"
                        {...register("telefono_trabajo")}
                        type="tel"
                        className={`input ${errors.telefono_trabajo ? "border-red-500" : ""}`}
                    />
                    {errors.telefono_trabajo && (
                        <p className="text-xs text-red-500">{errors.telefono_trabajo.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block font-semibold mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        {...register("email")}
                        type="email"
                        className={`input ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>

                {/* Tipo Profesional */}
                <div>
                    <label htmlFor="tipo_profesional" className="block font-semibold mb-1">
                        Tipo Profesional
                    </label>
                    <input
                        id="tipo_profesional"
                        {...register("tipo_profesional")}
                        type="text"
                        className={`input ${errors.tipo_profesional ? "border-red-500" : ""}`}
                    />
                    {errors.tipo_profesional && (
                        <p className="text-xs text-red-500">{errors.tipo_profesional.message}</p>
                    )}
                </div>

                {/* Número Licencia */}
                <div>
                    <label htmlFor="numero_licencia" className="block font-semibold mb-1">
                        Número Licencia
                    </label>
                    <input
                        id="numero_licencia"
                        {...register("numero_licencia")}
                        type="text"
                        className={`input ${errors.numero_licencia ? "border-red-500" : ""}`}
                    />
                    {errors.numero_licencia && (
                        <p className="text-xs text-red-500">{errors.numero_licencia.message}</p>
                    )}
                </div>

                {/* Universidad Graduacion */}
                <div>
                    <label htmlFor="universidad_graduacion" className="block font-semibold mb-1">
                        Universidad Graduación
                    </label>
                    <input
                        id="universidad_graduacion"
                        {...register("universidad_graduacion")}
                        type="text"
                        className={`input ${errors.universidad_graduacion ? "border-red-500" : ""}`}
                    />
                    {errors.universidad_graduacion && (
                        <p className="text-xs text-red-500">{errors.universidad_graduacion.message}</p>
                    )}
                </div>

                {/* Años Experiencia */}
                <div>
                    <label htmlFor="años_experiencia" className="block font-semibold mb-1">
                        Años de Experiencia
                    </label>
                    <input
                        id="años_experiencia"
                        {...register("años_experiencia", { valueAsNumber: true })}
                        type="number"
                        min={0}
                        className={`input ${errors.años_experiencia ? "border-red-500" : ""}`}
                    />
                    {errors.años_experiencia && (
                        <p className="text-xs text-red-500">{errors.años_experiencia.message}</p>
                    )}
                </div>

                {/* Estado */}
                <div>
                    <label htmlFor="estado" className="block font-semibold mb-1">
                        Estado
                    </label>
                    <input
                        id="estado"
                        {...register("estado")}
                        type="text"
                        className={`input ${errors.estado ? "border-red-500" : ""}`}
                    />
                    {errors.estado && <p className="text-xs text-red-500">{errors.estado.message}</p>}
                </div>

                {/* Fecha Ingreso */}
                <div>
                    <label htmlFor="fecha_ingreso" className="block font-semibold mb-1">
                        Fecha Ingreso
                    </label>
                    <input
                        id="fecha_ingreso"
                        {...register("fecha_ingreso")}
                        type="date"
                        className={`input ${errors.fecha_ingreso ? "border-red-500" : ""}`}
                        defaultValue={
                            defaultValues?.fecha_ingreso
                                ? new Date(defaultValues.fecha_ingreso).toISOString().substring(0, 10)
                                : ""
                        }
                    />
                    {errors.fecha_ingreso && (
                        <p className="text-xs text-red-500">{errors.fecha_ingreso.message}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    id="activo"
                    type="checkbox"
                    {...register("estado")}
                    defaultChecked={defaultValues?.estado === "activo"}
                    className="w-4 h-4"
                    readOnly
                />
                <label htmlFor="activo" className="text-sm font-semibold">
                    Activo
                </label>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50"
            >
                {type === "create" ? "Crear Maestro" : "Actualizar Maestro"}
            </button>
        </form>
    );
}
