import { RefObject, useCallback, useEffect } from 'react';

const useKeyControls = (cb: (e: KeyboardEvent) => void, deps: any[], focusedRef: RefObject<boolean>) => {
    const handleKeys = useCallback(cb, deps)

    // Controls - Mounting
    const mountControls = useCallback(() => {
        window.addEventListener('keydown', handleKeys)
    }, [handleKeys])

    const unmountControls = useCallback(() => {
        window.removeEventListener('keydown', handleKeys)
    }, [handleKeys])

    // Ensure controls are mounted & unmounted
    useEffect(() => {
        if (focusedRef.current) {
            mountControls();
        }
    }, [mountControls])

    // Purely for cleanup
    useEffect(() => {
        return unmountControls;
    }, [unmountControls])

    return { mountControls, unmountControls }
}

export default useKeyControls;