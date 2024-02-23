'use client';


import { BiEuro } from 'react-icons/bi';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  maxLength?: number;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}


const InputSimple : React.FC<InputProps> = ({ 
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  maxLength,
  value,
  onChange,
  
 }) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiEuro 
          size={24} 
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input 
        id={id}
        disabled={disabled}
        placeholder=" "
        maxLength={maxLength}
        type={type}
        value={value}
        onChange={onChange}
        className={`
          peer
          w-full
          p-4
          pt-8
          font-normal
          text-lg
          bg-white
          border-2
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${formatPrice ? 'text-xl font-semibold' : 'text-lg'}
       
        `}
      />
      <label 
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          
        `}
      >
        {label}
      </label>
    </div>
  )
}

export default InputSimple