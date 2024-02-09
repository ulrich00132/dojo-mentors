'use client';

import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
} from 'react-hook-form';


interface ToggleButtonProps {
    id: string;
    value?: string;
    type?: string;
    disabled?: boolean;
    required?: boolean; 
    label?: string;
    checked: boolean;
    onChange: (value: any) => void;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
    id,
    value,
    type = 'checkbox',
    disabled,
    required,
    label,
    checked,
    onChange,
    register,
    errors,
}) => {
  return (
    <div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input 
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                value={value}
                type={type}
                checked={checked}
                onChange={onChange}
                className="sr-only peer"
            />
            <div
                className="
                    w-11
                    h-6
                    bg-gray-200
                    peer-focus:outline-none
                    peer-focus:ring-4
                    peer-focus:ring-blue-300
                    dark:peer-focus:ring-blue-800
                    rounded-full
                    peer
                    dark:bg-gray-700
                    peer-checked:after:translate-x-full
                    peer-checked:after:border-white
                    after:absolute
                    after:top-[2px]
                    after:left-[2px]
                    after:bg-white
                    after:border-gray-300
                    after:border
                    after:rounded-full
                    after:h-5
                    after:w-5
                    after:transition-all
                    dark:border-gray-600
                    peer-checked:bg-rose
                "
            >
            </div>
            <span
                className="
                    ml-3
                    text-sm
                    font-medium
                    text-gray-900
                    dark:text-neutral-600
                "
            >
                {label}
            </span>

        </label>
    </div>
  )
}

export default ToggleButton