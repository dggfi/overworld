import { useEffect, useRef } from 'react';


const useClickoutside = (cb: Function) => {
    const ref = useRef<any>();

    useEffect(() => {
        const handleClick = (e: any) => {
            if (ref.current && !ref.current.contains(e.target)) cb()
        }

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick)

    }, [ref])

    return ref;
}

export default useClickoutside;