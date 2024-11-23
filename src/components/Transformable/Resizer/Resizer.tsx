import { AnimatePresence, MotionValue } from 'framer-motion';
import React, { MouseEvent, Ref, useEffect, useRef, useState } from 'react';
import ResizerLeft from './ResizerLeft';
import ResizerRight from './ResizerRight';
import ResizerTop from './ResizerTop';
import ResizerBottom from './ResizerBottom';
import { MouseDispatchRegister } from '../../../../types/transformable';
import { setActiveControlsId } from '../../../store/controls';
import useKeyControls from '../../../hooks/useKeyControls';
import useClickoutside from '../../../hooks/useClickoutside';

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

    // Maintain exclusive control
    useEffect(() => {
        if (resizeActive) {
            for (let k in siblingSetters) {
                if (k !== 'resizer') {
                    siblingSetters[k](false)
                }
            }
        }
    }, [resizeActive])
    
    // Key Controls
    const { mountControls, unmountControls } = useKeyControls((e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'r') {
            setResizeActive(!resizeActive)
            setActiveControlsId(parentId)
        }
    }, [resizeActive], focused)

    useClickoutside(
        // @ts-ignore
        parentRef,
        // @ts-ignore
        () => (focused.current && parentRef.current!),
        () => {
            unmountControls();
            setResizeActive(false);
            focused.current = false;
        },
        [unmountControls]
    )

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