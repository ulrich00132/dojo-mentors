'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    
}


const Button : React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
}) => {
  return (
    <button
        disabled={disabled}
        onClick={onClick}
        className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          hover:opacity-80
          transition
          w-full
          whitespace-nowrap
          flex
          justify-center
          items-center
          cp-event-name=Button+Subscription
          
          ${outline ? 'bg-white' : 'bg-black'}
          ${outline ? 'border-black' : 'border-black'}
          ${outline? 'hover:bg-rose' : 'hover:bg-yellow hover:text-black hover:shadow-[5px_5px_0px_0px_rgb(0,0,0)]'}
          ${outline ? 'shadow-[5px_5px_0px_0px_rgb(0,0,0)]' : 'shadow-[5px_5px_0px_0px_rgb(252,117,255)]'}
          ${outline ? 'text-black' : 'text-rose'}
          ${small ? 'text-sm' : 'text-md'}
          ${small ? 'px-2' : 'px-4'}
          ${small ? 'py-1' : 'py-2'}
          ${small ? 'border-[1px]' : 'border-2'}
         
        `}    

    >
      {Icon && (
        <Icon 
          size={20}
          className='
            absolute
            left-4
            top-3
          '
        />
      )}
      {label}

    </button>
  )
}

export default Button
