import { type RefObject, useEffect, useState } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

const useOnClickOutside = <T extends HTMLElement>(
    ref: RefObject<T>,
    handler?: Handler,
    isOpen?: boolean
) => {
    const [clickedOutside, setClickedOutside] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                if (handler) handler(event);
                setClickedOutside(true);
            } else {
                setClickedOutside(false);
            }
        };

        if (isOpen !== false) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [ref, isOpen]);

    return clickedOutside;
};

export default useOnClickOutside;
