import { AnimatePresence, MotionValue } from 'framer-motion';
import React, { MouseEvent, Ref, useCallback, useEffect, useRef, useState } from 'react';
import { MouseDispatchRegister } from '../../../../types/transformable';
import { setActiveControlsId } from '../../../store/controls';
import DragBox from './DragBox';

interface TranslaterProps {
    motionValues: { [key: string]: MotionValue },
    parentRef: Ref<HTMLDivElement>,
    dispatchRegister: MouseDispatchRegister,
    parentId: string,
    controlsActive: boolean,
    siblingSetters: { [key: string]: React.Dispatch<boolean> }
}

const Translater: React.FC<TranslaterProps> = ({ parentId, controlsActive, parentRef, motionValues, dispatchRegister, siblingSetters }) => {
    const [translaterActive, setTranslaterActive] = useState<boolean>(false);
    const focused = useRef<boolean>(false);

    // Deactivation Protocol
    useEffect(() => {
        if (!controlsActive) {
            setTranslaterActive(false);
        }
    }, [controlsActive])

    // Controls
    // Controls - Maintain exclusive control
    useEffect(() => {
        if (translaterActive) {
            for (let k in siblingSetters) {
                if (k !== 'translater') {
                    siblingSetters[k](false);
                }
            }
        }
    }, [translaterActive])

    // Controls - Mounting
    const handleKeys = useCallback((e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === 't') {
            setTranslaterActive(!translaterActive)
            setActiveControlsId(parentId)
        }
    }, [translaterActive])

    const mountControls = useCallback(() => {
        window.addEventListener('keydown', handleKeys)
    }, [handleKeys])

    const unmountControls = useCallback(() => {
        window.removeEventListener('keydown', handleKeys)
    }, [handleKeys])

    // Ensure controls are mounted & unmounted
    useEffect(() => {
        if (focused.current) {
            mountControls();
        }
    }, [mountControls])

    // + click outside
    useEffect(() => {
        // @ts-ignore
        if (focused.current && parentRef.current) {
            const handleMouseDown = (e: globalThis.MouseEvent) => {
                // @ts-ignore
                if (!parentRef.current.contains(e.target)) {
                    unmountControls();
                    setTranslaterActive(false);
                    focused.current = false;
                }
            }

            window.addEventListener('mousedown', handleMouseDown);
            return () => {
                window.removeEventListener('mousedown', handleMouseDown)
                unmountControls();
            };
        }

        return unmountControls;
    }, [unmountControls])

    // Register with parent
    useEffect(() => {
        dispatchRegister['translater'] = (e: MouseEvent) => {
            focused.current = true;
            mountControls();
        }
        return () => { delete dispatchRegister['translater'] }
    }, [mountControls])

    useEffect(() => {
        siblingSetters['translater'] = setTranslaterActive;
        return () => { delete siblingSetters['translater'] }
    }, [])

    return (
        <AnimatePresence>
            {(translaterActive) && <DragBox parentRef={parentRef} motionValues={motionValues} />}
        </AnimatePresence>
    )
}

export default Translater;