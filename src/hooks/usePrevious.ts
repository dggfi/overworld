import { useRef } from 'react';

const usePrevious = <T>(v: T) => {
    const currentRef = useRef<T>(v);
    const previousRef = useRef<T | undefined>();

    if (currentRef.current !== v) {
        previousRef.current = currentRef.current
        currentRef.current = v
    }

    return previousRef.current
}

export default usePrevious;