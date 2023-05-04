import { useEffect } from 'react';

type EventHandler = (event: MouseEvent | TouchEvent) => void;

const useOnClickOutside = <T extends HTMLElement>(
    ref: React.RefObject<T>,
    handler: EventHandler
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler(event);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [ref]);
};

export default useOnClickOutside;
