import { useCallback, useState } from "react";

const useCounter = (initialValue: number) => {
    const [value, setValue] = useState(initialValue);

    const increment = () => {
        setValue(initialValue + 1);
    };

    const decrement = () => {
        if (initialValue === 1) {
            setValue(initialValue - 1);
        }
        return;
    }


    const reset = () => setValue(initialValue);

    return {
        value,
        increment,
        decrement,
        reset
    };
}

export default useCounter;