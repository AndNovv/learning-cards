import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (event.target instanceof Element) {
                if (ref.current && !ref.current.contains(event.target as Node) && !event.target.classList.contains('inside')) {
                    callback();
                }
            }
        };

        // Mouse event listeners
        document.addEventListener('mousedown', handleClickOutside);
        // Touch event listeners
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            // Remove mouse event listeners
            document.removeEventListener('mousedown', handleClickOutside);
            // Remove touch event listeners
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [callback]);

    return ref;
};