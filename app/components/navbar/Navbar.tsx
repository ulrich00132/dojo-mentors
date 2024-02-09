'use client';

import Logo from "./Logo";
import Container from "../Container";
import Links from "./Links";
import UserLogin from "./UserLogin";
import { User } from "@prisma/client";
import Categories from "./Categories";
import { SafeUser } from "@/app/types";
import Nav from "../dashboard/Nav/Nav";

import { usePathname } from "next/navigation";


interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    
    const pathname = usePathname();

    return (
    <div className="fixed w-full bg-white z-10 shadow-sm">

        <div 
            className="
                py-4
                border-b-[1px]
                
            "
        >
            <Container>
                <div 
                    className="
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                    "
                >
                    <Logo 
                        width={80}
                        height={80}
                    />
                    <Links />
                    <UserLogin currentUser={currentUser} />

                </div>
            </Container>
        </div>
        <Categories />
        {pathname?.includes("account") && (
            <Nav />
        ) }
        
    </div>
  )
}

export default Navbar