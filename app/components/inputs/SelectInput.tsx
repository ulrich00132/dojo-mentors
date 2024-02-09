interface Option {
    value: number;
    displayName: string;
};

interface SelectInputProps {
    id: string;
    options: Option[]
    onChange: (optionId: Option['value']) => void;
};


const SelectInput: React.FC<SelectInputProps> = ({
    id,
    options,
    onChange,
}) => {
  return (
    <select
        id={id}
        onChange={(e: any) => onChange(e.target.value)}
        className="p-4 text-lg focus:outline-none:"
    >
        {options.map((option) => (
            <option
                key={option.value}
                value={option.value}
                className="p-4"
            >
                {option.displayName}
            </option>
        ))}
    </select>
  )
}

export default SelectInput