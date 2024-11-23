import { AnimatePresence, MotionValue } from 'framer-motion';
import React, { MouseEvent, Ref, useCallback, useEffect, useRef, useState } from 'react';
import ResizerLeft from './ResizerLeft';
import ResizerRight from './ResizerRight';
import ResizerTop from './ResizerTop';
import ResizerBottom from './ResizerBottom';
import { MouseDispatchRegister } from '../../../../types/transformable';
import { setActiveControlsId } from '../../../store/controls';

interface ResizerMainProps {
    motionValues: { [key: string]: MotionValue },
    parentRef: Ref<HTMLDivElement>,
    dispatchRegister: MouseDispatchRegister,
    parentId: string,
    controlsActive: boolean,
    siblingSetters: { [key: string]: React.Dispatch<boolean> }
}

const Resizer: React.FC<ResizerMainProps> = ({ parentId, controlsActive, parentRef, motionValues, dispatchRegister, siblingSetters }) => {
    const [resizeActive, setResizeActive] = useState<boolean>(false);
    const focused = useRef<boolean>(false);

    // Deactivation Protocol
    useEffect(() => {
        if (!controlsActive) {
            setResizeActive(false);
        }
    }, [controlsActive])

    // Controls
    // Maintain exclusive contro

    useEffect(() => {
        if (resizeActive) {
            for (let k in siblingSetters) {
                if (k !== 'resizer') {
                    siblingSetters[k](false)
                }
            }
        }
    }, [resizeActive])

    const handleKeys = useCallback((e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'r') {
            setResizeActive(!resizeActive)
            setActiveControlsId(parentId)
        }
    }, [resizeActive])

    // Controls - Mounting
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
                    setResizeActive(false);
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
        dispatchRegister['resizer'] = (e: MouseEvent) => {
            focused.current = true;
            mountControls();
        }
        return () => { delete dispatchRegister['resizer'] }
    }, [mountControls])

    useEffect(() => {
        siblingSetters['resizer'] = setResizeActive;
        return () => { delete siblingSetters['resizer'] }
    }, [])

    // @ts-ignore
    const targetStyles = useRef(null!);

    useEffect(() => {
        // @ts-ignore
        targetStyles.current = getComputedStyle(parentRef.current)
    }, [])

    return (
        <AnimatePresence mode='sync'>
            {(resizeActive) &&
                <>
                    <ResizerLeft key={'left'} parentRef={parentRef} parentStyles={targetStyles.current} motionValues={motionValues} />
                    <ResizerRight key={'right'} parentRef={parentRef} parentStyles={targetStyles.current} motionValues={motionValues} />
                    <ResizerTop key={'top'} parentRef={parentRef} parentStyles={targetStyles.current} motionValues={motionValues} />
                    <ResizerBottom key={'bottom'} parentRef={parentRef} parentStyles={targetStyles.current} motionValues={motionValues} />
                </>
            }
        </AnimatePresence>
    )
}

export default Resizer;