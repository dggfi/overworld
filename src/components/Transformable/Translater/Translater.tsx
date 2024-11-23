import { AnimatePresence, MotionValue } from 'framer-motion';
import React, { MouseEvent, Ref, useEffect, useRef, useState } from 'react';
import { MouseDispatchRegister } from '../../../../types/transformable';
import { setActiveControlsId } from '../../../store/controls';
import DragBox from './DragBox';
import useKeyControls from '../../../hooks//useKeyControls';
import useClickoutside from '../../../hooks/useClickoutside';

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

    const { mountControls, unmountControls } = useKeyControls((e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === 't') {
            setTranslaterActive(!translaterActive)
            setActiveControlsId(parentId)
        }
    }, [translaterActive], focused)

    useClickoutside(
        // @ts-ignore
        parentRef,
        // @ts-ignore
        () => (focused.current && parentRef.current),
        () => {
            unmountControls();
            setTranslaterActive(false);
            focused.current = false;
        },
        [unmountControls]
    )

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