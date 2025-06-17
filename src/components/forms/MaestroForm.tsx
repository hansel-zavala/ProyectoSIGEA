"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { maestroSchema, MaestroSchema } from "@/lib/formValidationSchemas";

type MaestroFormProps = {
    defaultValues?: MaestroSchema;
    onSubmit: (data: MaestroSchema) => void;
};

export default function MaestroForm({ defaultValues, onSubmit }: MaestroFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MaestroSchema>({
        resolver: zodResolver(maestroSchema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nombre */}
            <div>
                <label htmlFor="nombre" className="block font-semibold">Nombre</label>
                <input
                    id="nombre"
                    {...register("nombre")}
                    type="text"
                    className="input"
                />
                {errors.nombre && <p className="error">{errors.nombre.message}</p>}
            </div>

            {/* Apellido */}
            <div>
                <label htmlFor="apellido" className="block font-semibold">Apellido</label>
                <input
                    id="apellido"
                    {...register("apellido")}
                    type="text"
                    className="input"
                />
                {errors.apellido && <p className="error">{errors.apellido.message}</p>}
            </div>

            {/* Documento Identidad */}
            <div>
                <label htmlFor="documento_identidad" className="block font-semibold">Documento de Identidad</label>
                <input
                    id="documento_identidad"
                    {...register("documento_identidad")}
                    type="text"
                    className="input"
                />
                {errors.documento_identidad && <p className="error">{errors.documento_identidad.message}</p>}
            </div>

            {/* Fecha de Nacimiento */}
            <div>
                <label htmlFor="fecha_de_nacimiento" className="block font-semibold">Fecha de Nacimiento</label>
                <input
                    id="fecha_de_nacimiento"
                    {...register("fecha_de_nacimiento")}
                    type="date"
                    className="input"
                />
                {errors.fecha_de_nacimiento && <p className="error">{errors.fecha_de_nacimiento.message}</p>}
            </div>

            {/* Género */}
            <div>
                <label htmlFor="genero" className="block font-semibold">Género</label>
                <select id="genero" {...register("genero")} className="input">
                    <option value="">Seleccione</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                </select>
                {errors.genero && <p className="error">{errors.genero.message}</p>}
            </div>

            {/* Teléfono Móvil */}
            <div>
                <label htmlFor="telefono_movil" className="block font-semibold">Teléfono Móvil</label>
                <input
                    id="telefono_movil"
                    {...register("telefono_movil")}
                    type="tel"
                    className="input"
                />
                {errors.telefono_movil && <p className="error">{errors.telefono_movil.message}</p>}
            </div>

            {/* Teléfono Trabajo */}
            <div>
                <label htmlFor="telefono_trabajo" className="block font-semibold">Teléfono Trabajo</label>
                <input
                    id="telefono_trabajo"
                    {...register("telefono_trabajo")}
                    type="tel"
                    className="input"
                />
                {errors.telefono_trabajo && <p className="error">{errors.telefono_trabajo.message}</p>}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block font-semibold">Email</label>
                <input
                    id="email"
                    {...register("email")}
                    type="email"
                    className="input"
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            {/* Tipo Profesional */}
            <div>
                <label htmlFor="tipo_profesional" className="block font-semibold">Tipo Profesional</label>
                <input
                    id="tipo_profesional"
                    {...register("tipo_profesional")}
                    type="text"
                    className="input"
                />
                {errors.tipo_profesional && <p className="error">{errors.tipo_profesional.message}</p>}
            </div>

            {/* Número de Colegiado */}
            {/* <div>
                <label htmlFor="numero_colegiado" className="block font-semibold">Número de Colegiado</label>
                <input
                    id="numero_colegiado"
                    {...register("numero_colegiado")}
                    type="text"
                    className="input"
                />
                {errors.numero_colegiado && <p className="error">{errors.numero_colegiado.message}</p>}
            </div> */}

            {/* Activo */}
            <div className="flex items-center space-x-2">
                <input id="activo" type="checkbox" {...register("activo")} />
                <label htmlFor="activo" className="font-semibold">Activo</label>
            </div>

            <button type="submit" className="btn-primary mt-4">Guardar</button>
        </form>
    );
}
