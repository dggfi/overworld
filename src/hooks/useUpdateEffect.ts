import { useEffect, useRef } from 'react';

const useUpdateEffect = (cb: Function, dependencies: any[]) => {
    const firstRenderRef = useRef(true);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return
        }
        return cb()
    }, dependencies)
}

export default useUpdateEffect;