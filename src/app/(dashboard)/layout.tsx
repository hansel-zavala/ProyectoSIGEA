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
            {/* LEFT */}
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 min-w-fit">
                <Link
                    href="/"
                    className="flex items-center justify-center lg:justify-start gap-2"
                >
                    <Image src="/logo.png" alt="logo" width={32} height={32} />
                    <span className="hidden lg:block font-bold">SchooLama</span>
                </Link>
                <Menu />
            </div>
            {/* RIGHT */}
            <div className="flex-1 bg-[#F7F8FA] overflow-y-auto overflow-x-hidden flex flex-col">
                <Navbar />
                <div className="flex-1 w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}