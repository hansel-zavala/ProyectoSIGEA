import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen flex overflow-hidden">
            {/* LEFT - scrollable menu */}
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] min-w-fit bg-white p-4 overflow-y-auto h-full flex flex-col">
                <Link
                    href="/"
                    className="flex items-center justify-center lg:justify-start gap-2 mb-4"
                >
                    <Image src="/logo.png" alt="logo" width={32} height={32} />
                    <span className="hidden lg:block font-bold">SIGIEA</span>
                </Link>
                <Menu />
            </div>

            {/* RIGHT - scrollable content */}
            <div className="flex-1 bg-[#F7F8FA] overflow-y-auto overflow-x-hidden h-full flex flex-col">
                <Navbar />
                <div className="flex-1 w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
