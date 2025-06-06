import { role } from "@/lib/data";
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
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: "/teacher.png",
                label: "Maestros",
                href: "/list/maestros",
                visible: ["admin", "teacher"],
            },
            {
                icon: "/student.png",
                label: "Estudiantes",
                href: "/list/estudiantes",
                visible: ["admin", "teacher"],
            },
            {
                icon: "/parent.png",
                label: "Padres",
                href: "/list/padres",
                visible: ["admin", "teacher"],
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
                visible: ["admin", "teacher"],
            },
            {
                icon: "/lesson.png",
                label: "Lecciones",
                href: "/list/lecciones",
                visible: ["admin", "teacher"],
            },
            {
                icon: "/exam.png",
                label: "Examenes",
                href: "/list/examenes",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: "/assignment.png",
                label: "Asignaturas",
                href: "/list/asignaturas",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: "/result.png",
                label: "Resultados",
                href: "/list/resultados",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: "/attendance.png",
                label: "Attendance",
                href: "/list/attendance",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: "/calendar.png",
                label: "Events",
                href: "/list/events",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: "/message.png",
                label: "Messages",
                href: "/list/messages",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: "/announcement.png",
                label: "Announcements",
                href: "/list/announcements",
                visible: ["admin", "teacher", "student", "parent"],
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
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: "/setting.png",
                label: "Ajustes",
                href: "/ajustes",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: "/logout.png",
                label: "Logout",
                href: "/logout",
                visible: ["admin", "teacher", "student", "parent"],
            },
        ],
    },
];

const Menu = () => {
    return (
        <div className="mt-2 text-sm">
            {menuItems.map((i) => (
                <div className="flex flex-col" key={i.title}>
                    <span className="hidden lg:block text-gray-400 font-light my-4">
                        {i.title}
                    </span>
                    {i.items.map((item) => {
                        if (item.visible.includes(role)) {
                            return (
                                <Link
                                    href={item.href}
                                    key={item.label}
                                    className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-SkyLight"
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