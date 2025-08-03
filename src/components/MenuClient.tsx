// src/components/MenuClient.tsx
"use client"; // Este es un componente de cliente

import {
  Home,
  UserPlus,
  Users,
  CalendarDays,
  User,
  Settings,
  LogOut,
  UsersRound,
  ClipboardMinus,
  BookType,
  Archive,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Definimos las props que recibe el componente
type MenuClientProps = {
  role: string;
};

const MenuClient = ({ role }: MenuClientProps) => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Home",
      path: `/${role}`,
      icon: <Home />,
    },
    {
      title: "Licenciados",
      path: "/lista/maestros",
      icon: <Users />,
      roles: ["admin"],
    },
    {
      title: "Alumnos",
      path: "/lista/alumnos",
      icon: <Users />,
      roles: ["admin", "teacher"],
    },
    {
      title: "Padres",
      path: "/lista/padres",
      icon: <Users />,
      roles: ["admin", "teacher"],
    },
    {
      title: "Matrículas",
      path: "/lista/registrar",
      icon: <UserPlus />,
      roles: ["admin", "teacher"],
    },
    {
      title: "Reportes",
      path: "/lista/",
      icon: <ClipboardMinus />,
      roles: ["admin", "teacher"],
    },
    {
      title: "Lecciones",
      path: "/lista/",
      icon: <BookType />,
      roles: ["admin", "teacher"],
    },
    {
      title: "Archivos",
      path: "/lista/",
      icon: <Archive />,
      roles: ["admin", "teacher"],
    },
    {
      title: "Eventos",
      path: "/lista/eventos",
      icon: <CalendarDays />,
      roles: ["admin"],
    },
  ];

  const otherItems = [
    {
      title: "Perfil",
      path: "/profile",
      icon: <User />,
    },
    {
      title: "Configuración",
      path: "/settings",
      icon: <Settings />,
    },
    {
      title: "Cerrar Sesión",
      path: "/logout",
      icon: <LogOut />,
    },
  ];

  const hasAccess = (itemRoles: string[] | undefined) => {
    if (!itemRoles) return true; // Si no se definen roles, es público para los usuarios logueados
    return itemRoles.includes(role);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xs text-gray-400 mb-4">APO-AUTIS</h2>
        {menuItems.map(
          (item) =>
            hasAccess(item.roles) && (
              <Link
                href={item.path}
                key={item.title}
                className={`flex items-center gap-2 p-2 rounded-md mb-2 ${
                  pathname === item.path ? "bg-lamaPurple text-white" : ""
                }`}
              >
                {item.icon}
                <span className="hidden lg:inline">{item.title}</span>
              </Link>
            )
        )}
      </div>
      <div>
        <h2 className="text-xs text-gray-400 my-4"> </h2>
        {otherItems.map((item) => (
          <Link
            href={item.path}
            key={item.title}
            className={`flex items-center gap-2 p-2 rounded-md mb-2 ${
              pathname === item.path ? "bg-lamaPurple text-white" : ""
            }`}
          >
            {item.icon}
            <span className="hidden lg:inline">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuClient;