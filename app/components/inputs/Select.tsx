import React from 'react';

import { AiOutlineClose } from "react-icons/ai";

type SelectOptions = {
    label: string
    value: string
}

type SelectProps = {
   options: SelectOptions[]
   value?: SelectOptions 
   onChange: (value: SelectOptions | undefined) => void
}

const Select = ({ value, onChange, options } : SelectProps) => {
  return (
    
    <div className='container bg-rose grid grid-cols-2'>
        <div>Value</div>
        <div className='cursor-pointer'>
            <AiOutlineClose/>
        </div>
        
    </div>
  )
}

export default Select