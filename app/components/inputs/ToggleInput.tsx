'use client';

import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
} from 'react-hook-form';

interface ToggleInputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>
    errors: FieldErrors;
    subtitle?: string;
    checked: boolean;
}

const ToggleInput: React.FC<ToggleInputProps> = ({
    id,
    label,
    type = "checkbox",
    disabled,
    required,
    register,
    errors,
    subtitle,
    checked,
}) => {
  return (
    <>
    <div>
        <div className={`flex justify-between w-full ${errors[id] ? 'text-rose' : 'text-lightBlack'}`}>
            <div className="flex flex-col">
                <div className="text-medium text-md">{label}</div>
                <div className="font-light text-gray-600">{subtitle}</div>

            </div>
            <label
                className="
                    flex
                    flex-row
                    items-center
                    cursor-pointer
                    select-none
                    text-dark
                    dark:text-white

                "
            >


                <div className="relative">
                    <input 
                        id={id}
                        disabled={disabled}
                        {...register(id, { required })}
                        type={type}
                        className="peer sr-only"
                    />
                    <div
                        className="
                            h-3
                            rounded-full 
                            shadow-inner
                            bg-grey
                            dark:bg-dark-2
                            w-14
                        "
                    >   
                    </div>
                    <div
                        className="
                            absolute
                            left-0
                            transition
                            bg-lightBlack
                            rounded-full
                            dot
                            shadow-switch-1
                            dark:bg-dark-4
                            -top-2
                            h-7
                            w-7
                            peer-checked:translate-x-full
                            peer-checked:bg-green
                        "
                    >

                    </div>

                </div>

            </label>
        </div>
    </div>
    </>
  )
}

export default ToggleInput