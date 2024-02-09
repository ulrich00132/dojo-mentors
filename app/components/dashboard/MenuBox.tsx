'use client';

import { useRouter } from "next/navigation";


import { IconType } from "react-icons";

import { useCallback } from "react";

interface MenuBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean,
    pathname?: string,

};

const MenuBox: React.FC<MenuBoxProps> = ({
    icon: Icon,
    label,
    selected,
    pathname,
}) => {
    
    const router = useRouter();
    
    const handleClick = useCallback(() => {
         
        router.push(`${pathname}`)
        

    }, [router, label, pathname]);

  
    return (
    <div 
        onClick={handleClick}
        className={`
            flex
            flex-col
            items-center
            justify-center
            gap-2
            p-2
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer
            ${selected ? "border-b-neutral-800" : "border-transparent"}
            ${selected ? "text-black" : "text-neutral-500"}
            `}
    >
        <Icon 
            size={24}
        />
        <div className="font-medium text-sm whitespace-nowrap">
            {label}
        </div>

    </div>
  )
}

export default MenuBox