import { RefObject, useEffect } from 'react';


const useClickoutside = (elemRef: RefObject<HTMLElement>, predicate: (...args: any[]) => boolean, cb: Function, deps: any[]) => {
    // This is actually more like useMousedownOutside
    useEffect(() => {
        // in case the user doesn't want the useClickoutside to always be active
        if (predicate()) {
            const handleClick = (e: any) => {
                if (elemRef.current && !elemRef.current.contains(e.target)) cb()
            }
    
            document.addEventListener('mousedown', handleClick);
            return () => document.removeEventListener('mousedown', handleClick)
        }
    }, deps)
}

export default useClickoutside;