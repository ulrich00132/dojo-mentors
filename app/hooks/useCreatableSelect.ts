import { useState } from "react";
import { useCreatable } from "react-select/creatable";
import CreatableSelect from 'react-select/creatable';

export function useCretableSelect(defaultOptions: any) {
    
    const createOption = (label: string) => ({
        label,
        value: label.toLocaleLowerCase().replace(/\W/g, ''),
    })
    
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState(defaultOptions);
    const [currentValue, setCurrentValue] = useState(null);

    const handleCreate = (inputValue: any) => {
        setIsLoading(true);
        setTimeout(() => {
            
            const newOption: any = createOption(inputValue);

            setIsLoading(false);
            setOptions((prev: any) => [...prev, newOption]);
            setCurrentValue(newOption);
        }, 1000);
    }

    return {
        isLoading,
        options,
        currentValue,
        handleCreate,
    }
}