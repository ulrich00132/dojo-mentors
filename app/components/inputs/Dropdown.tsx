'use client';

import Select from 'react-select';

interface DropdownProps {
    title?: string;
    subtitle?: string;
    option: any;
    value?: any;
    onChange: (value: any) => void;
    required?: boolean;

}

const Dropdown: React.FC<DropdownProps> = ({
    title,
    subtitle,
    option,
    value,
    onChange,
    required,
}) => {
  return (
    
    <div className='flex flex-col gap-2'>
        <div className='flex flex-col'>
            <div className='font-medium text-md pb-2'>
                {title}
            </div>
            <div className='font-light text-gray-600'>
                {subtitle}
            </div>
        </div>
        <Select 
            placeholder="Sélectionner"
            options={option}
            value={value}
            onChange={(value) => onChange(value)}
            formatOptionLabel={(option: any) => (
                <div className='flex flex-row items-center gap-3 ml-1'>
                    {option.label}
                </div>
            )}
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
            required={required}
    />

    </div>
  )
}

export default Dropdown