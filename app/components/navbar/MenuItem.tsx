'use client';

import { IconType } from "react-icons";

interface MenuItemProps {
    onClick: () => void;
    label: string;
    icon?: IconType
}


const MenuItem : React.FC<MenuItemProps> = ({
    onClick,
    label,
    icon: Icon,
}) => {
  return (
    <div 
        onClick={onClick}
        className={`
            px-4
            py-3
            hover:bg-neutral-100
            transition
            font-semibold
            flex
            flex-row
            ${Icon ? "gap-2" : "gap-0"}
            
            `}
    >
        {Icon && (
            <Icon 
                size={18}
                
            />
        )}
        {label}
    </div>
  )
}

export default MenuItem