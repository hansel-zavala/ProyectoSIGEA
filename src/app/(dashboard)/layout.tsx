// src/app/(dashboard)/layout.tsx

import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs/server"; // <-- 1. IMPORTA currentUser

// 2. CONVIERTE EL LAYOUT EN UN COMPONENTE ASÍNCRONO
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 3. OBTÉN EL USUARIO Y EL ROL EN EL SERVIDOR
  const user = await currentUser();
  const role = user?.publicMetadata?.role as string;
  const name = user?.firstName || "Usuario";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menú Lateral */}
      <div className="w-64 bg-white p-4 flex-shrink-0">
        <Menu />
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* --- 4. CORRECCIÓN AQUÍ: Pasa las props al Navbar --- */}
        <Navbar name={name} role={role} />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}