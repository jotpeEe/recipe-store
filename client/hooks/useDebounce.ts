import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay?: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const [first, setFirst] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
        if (first) setFirst(false);
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    if (first) {
        return value;
    }

    return debouncedValue;
};

export default useDebounce;
