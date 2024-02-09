'use client';

import { useEffect, useState } from "react";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from "react-hook-form";

interface MultilineInputProps {
    id: string;
    label: string;
    placeholder: string;
    type?: string;
    disabled?: boolean;
    autoFocus?: boolean
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    wordCounter?: boolean;
    length?: number;
}

const MultilineInput: React.FC<MultilineInputProps> = ({
    id,
    label,
    placeholder,
    type = "text",
    disabled,
    autoFocus,
    required,
    register,
    errors,
    wordCounter,
    length,
}) => {
    
    
    // const [wordCount, setWordCount ] = useState(0);

    // const handleChange = ((e: any) => {
    //     const content = e.target.value.split(' ');

    //     if(content.length) {
    //         setVal(e.target.value)
    //         setWordCount(content.length)
    //         if (e.target.value === "") {
    //             setWordCount(0);
    //         }
    //     };
    // })

    const [letterCount, setLetterCount] = useState(0);
    
    const [val, setVal] = useState("");

    const handleChange = (e: any) => {
        
        const content = e.target.value
        
        setLetterCount(e.target.value.length)

    }

  
    return (
    <div className="w-full relative flex flex-col-reverse">
        <textarea 
            id={id}
            disabled={disabled}
            {...register(id, { required })}
            placeholder={placeholder}
            autoFocus={autoFocus}
            rows={6}
            maxLength={length}
            // value={val}
            onChange={(e) => handleChange(e)}
            className={`
                peer
                w-full
                p-4
                pt-6
                font-light
                bg-white
                border-2
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                ${errors[id] ? "focus:border-rose" : "focus:border-black"}
            `}
        />
        <label
            className={`
            flex
            justify-between
            text-md
            duration-150
            transform
            -translate-y-3
            top-5
            z-10
            origin-[0]
            ${errors[id] ? 'text-rose' : 'text-lightBlack'}
            
          `}
        >
            {label}
            

            {wordCounter && (
                <div className="text-neutral-600">
                    {letterCount}/{length}
                </div>
            )}
            
        </label>
    </div>
  )
}

export default MultilineInput