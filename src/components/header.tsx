"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";


export default function Header() {

    const pathname = usePathname() || '';
    console.log(pathname);

    return (
        <header className="w-full flex justify-between items-center mb-8">
            <Link href="/">
                <Image src="https://avatars.githubusercontent.com/u/154679547?s=400&u=32c4740cbbf34f1022595fd0261c0fb9c2cf0a3a&v=4" alt="Avatar" className="rounded-full" width={24} height={24} />
            </Link>
            <div className="">
                <Button variant="link" size="sm" asChild className={pathname === '/projects' ? 'text-chart-4' : ''} >
                    <Link href="/projects" >
                        Projects
                    </Link>
                </Button>
                <Button variant="link" size="sm" asChild className={pathname === '/blogs' ? 'text-chart-4' : ''}>
                    <Link href="/blogs" >
                        Blogs
                    </Link>
                </Button>
            </div>
        </header>
    );
}
