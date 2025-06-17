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
                visible: ["admin", "maestro", "alumno", "padre"],
            },
            {
                icon: "/home.png",
                label: "Registar Nuevo Alumno",
                href: "/lista/registrar",
                visible: ["admin", "maestro", "alumno", "padre"],
            },
            {
                icon: "/teacher.png",
                label: "Maestros",
                href: "/lista/maestros",
                visible: ["admin", "maestro"],
            },
            {
                icon: "/alumno.png",
                label: "Alumnos",
                href: "/lista/alumnos",
                visible: ["admin", "maestro"],
            },
            {
                icon: "/padre.png",
                label: "Padres",
                href: "/lista/padres",
                visible: ["admin", "maestro"],
            },
            {
                icon: "/calendar.png",
                label: "Eventos",
                href: "/lista/eventos",
                visible: ["admin", "maestro", "alumno", "padre"],
            },
            // {
            //     icon: "/subject.png",
            //     label: "Subjects",
            //     href: "/lista/subjects",
            //     visible: ["admin"],
            // },
            // {
            //     icon: "/class.png",
            //     label: "Classes",
            //     href: "/lista/classes",
            //     visible: ["admin", "maestro"],
            // },
            // {
            //     icon: "/lesson.png",
            //     label: "Trabajo Sesiones",
            //     href: "/lista/trabajoSesiones",
            //     visible: ["admin", "maestro"],
            // },
            // {
            //     icon: "/exam.png",
            //     label: "Exams",
            //     href: "/lista/exams",
            //     visible: ["admin", "maestro", "alumno", "padre"],
            // },
            // {
            //     icon: "/assignment.png",
            //     label: "Assignments",
            //     href: "/lista/assignments",
            //     visible: ["admin", "maestro", "alumno", "padre"],
            // },
            // {
            //     icon: "/result.png",
            //     label: "Results",
            //     href: "/lista/results",
            //     visible: ["admin", "maestro", "alumno", "padre"],
            // },
            // {
            //     icon: "/attendance.png",
            //     label: "Attendance",
            //     href: "/lista/attendance",
            //     visible: ["admin", "maestro", "alumno", "padre"],
            // },
            // {
            //     icon: "/message.png",
            //     label: "Messages",
            //     href: "/lista/messages",
            //     visible: ["admin", "maestro", "alumno", "padre"],
            // },
            // {
            //     icon: "/announcement.png",
            //     label: "Anuncios",
            //     href: "/lista/anuncios",
            //     visible: ["admin", "maestro", "alumno", "padre"],
            // },
        ],
    },
    {
        title: "OTHER",
        items: [
            {
                icon: "/profile.png",
                label: "Profile",
                href: "/profile",
                visible: ["admin", "maestro", "alumno", "padre"],
            },
            {
                icon: "/setting.png",
                label: "Settings",
                href: "/settings",
                visible: ["admin", "maestro", "alumno", "padre"],
            },
            {
                icon: "/logout.png",
                label: "Logout",
                href: "/logout",
                visible: ["admin", "maestro", "alumno", "padre"],
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
