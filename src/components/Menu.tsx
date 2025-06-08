import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: "/home.png",
                label: "Home",
                href: "/",
                visible: ["admin", "maestro", "estudiante", "padre"],
            },
            {
                icon: "/maestro.png",
                label: "Maestros",
                href: "/list/maestros",
                visible: ["admin", "maestro"],
            },
            {
                icon: "/estudiante.png",
                label: "Estudiantes",
                href: "/list/estudiantes",
                visible: ["admin", "maestro"],
            },
            {
                icon: "/padre.png",
                label: "Padres",
                href: "/list/padres",
                visible: ["admin", "maestro"],
            },
            {
                icon: "/subject.png",
                label: "Grados",
                href: "/list/grado",
                visible: ["admin"],
            },
            {
                icon: "/class.png",
                label: "Clases",
                href: "/list/clases",
                visible: ["admin", "maestro"],
            },
            {
                icon: "/lesson.png",
                label: "Lecciones",
                href: "/list/lecciones",
                visible: ["admin", "maestro"],
            },
            {
                icon: "/exam.png",
                label: "Examenes",
                href: "/list/examenes",
                visible: ["admin", "maestro", "estudiante", "padre"],
            },
            {
                icon: "/assignment.png",
                label: "Asignaturas",
                href: "/list/asignaturas",
                visible: ["admin", "maestro", "estudiante", "padre"],
            },
            {
                icon: "/result.png",
                label: "Resultados",
                href: "/list/resultados",
                visible: ["admin", "maestro", "estudiante", "padre"],
            },
            {
                icon: "/attendance.png",
                label: "Attendance",
                href: "/list/attendance",
                visible: ["admin", "maestro", "estudiante", "padre"],
            },
            {
                icon: "/calendar.png",
                label: "Events",
                href: "/list/events",
                visible: ["admin", "maestro", "estudiante", "padre"],
            },
            {
                icon: "/message.png",
                label: "Messages",
                href: "/list/messages",
                visible: ["admin", "maestro", "estudiante", "padre"],
            },
            {
                icon: "/announcement.png",
                label: "Announcements",
                href: "/list/announcements",
                visible: ["admin", "maestro", "estudiante", "padre"],
            },
        ],
    },
    {
        title: "OTHER",
        items: [
            {
                icon: "/profile.png",
                label: "Perfil",
                href: "/perfil",
                visible: ["admin", "maestro", "estudiante", "padre"],
            },
            {
                icon: "/setting.png",
                label: "Ajustes",
                href: "/ajustes",
                visible: ["admin", "maestro", "estudiante", "padre"],
            },
            {
                icon: "/logout.png",
                label: "Logout",
                href: "/logout",
                visible: ["admin", "maestro", "estudiante", "padre"],
            },
        ],
    },
];

const Menu = async () => {
    const user = await currentUser();
    const role = user?.publicMetadata.role as string;
    return (
        <div className="mt-4 text-sm">
            {menuItems.map((i) => (
                <div className="flex flex-col gap-2" key={i.title}>
                    <span className="hidden lg:block text-gray-400 font-light my-4">
                        {i.title}
                    </span>
                    {i.items.map((item) => {
                        if (item.visible.includes(role)) {
                            return (
                                <Link
                                    href={item.href}
                                    key={item.label}
                                    className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                                >
                                    <Image src={item.icon} alt="" width={20} height={20} />
                                    <span className="hidden lg:block">{item.label}</span>
                                </Link>
                            );
                        }
                    })}
                </div>
            ))}
        </div>
    );
};

export default Menu;