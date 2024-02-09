'use client';

import { useState } from "react";

import { useCreatable } from "react-select/creatable";
import CreatableSelect from 'react-select/creatable';
import { GroupBase, SingleValue, Options } from 'react-select';
import { useCretableSelect } from "@/app/hooks/useCreatableSelect";

import getAllProfiles from "@/app/actions/getAllProfiles";



interface OptionProps {
   label?: string;
   value?: string;
   title?: string;
   subtitle?: string;
   onChange: (value: any) => void;
}


const CompanySelect: React.FC<OptionProps> = ({
    label,
    value,
    title,
    subtitle,
    onChange,
}) => {
    
    

    const defaultOptions = [
        { label: "Google", value: 'google'},
        { label: "Canvas", value: 'canvas'},
        { label: "Airbnb", value: 'airbnb'},
    ];

    const { isLoading, options, currentValue, handleCreate } = useCretableSelect(defaultOptions);

    
  
    return (
    <div className="flex flex-col gap-3">
        <div className="font-medium">{title}</div>
        <div className="font-ligth text-gray-600">{subtitle}</div>
        <CreatableSelect
            placeholder="Sélectionner"
            isClearable
            isDisabled={isLoading}
            isLoading={isLoading}
            onChange={(newValue: any) => onChange(newValue)}
            onCreateOption={handleCreate}
            options={options}
            value={value}
            classNames={{
                control: () => 'p-3 border-2',
                input: () => 'text-lg',
                option: () => 'text-lg',
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary: 'black',
                    primary25: '#FFEBFF',
                }
            })}
        />
    </div>
  )
}

export default CompanySelect