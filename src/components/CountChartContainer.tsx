import Image from "next/image";
import CountChart from "./CountChart";
import prisma from "@/lib/prisma";

const CountChartContainer = async () => {
    const data = await prisma.alumno.groupBy({
        by: ["genero"],
        _count: true,
    });

    const niños = data.find((d) => d.genero === "Masculino")?._count || 0;
    const niñas = data.find((d) => d.genero === "Femenino")?._count || 0;

    return (
        <div className="bg-white rounded-xl w-full h-full p-4">
            {/* TITLE */}
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Students</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            {/* CHART */}
            <CountChart niños={niños} niñas={niñas} />
            {/* BOTTOM */}
            <div className="flex justify-center gap-16">
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-lamaSky rounded-full" />
                    <h1 className="font-bold">{niños}</h1>
                    <h2 className="text-xs text-gray-300">
                        Niños ({Math.round((niños / (niños + niñas)) * 100)}%)
                    </h2>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-lamaYellow rounded-full" />
                    <h1 className="font-bold">{niñas}</h1>
                    <h2 className="text-xs text-gray-300">
                        Niñas ({Math.round((niñas / (niños + niñas)) * 100)}%)
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default CountChartContainer;
