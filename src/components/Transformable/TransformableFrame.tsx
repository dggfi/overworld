import { motion, MotionValue, useMotionValue } from 'framer-motion';
import React, { MouseEventHandler, useEffect, useRef } from 'react';
import Resizer from './Resizer/Resizer';
import { MouseDispatchRegister } from '../../../types/transformable';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { getActiveControlsId } from '../../store/controls';
import Translater from './Translater/Translater';

const TransformableFrame: React.FC<{ children: JSX.Element }> = ({ children }) => {
    // Resize, Translate, Rotate

    // const renderCount = useRef<number>(0);
    const width = useMotionValue<string | number>('min-content');
    const height = useMotionValue<string | number>('min-content');
    const left = useMotionValue<string | number | null>(null);
    const right = useMotionValue<string | number | null>(null);
    const top = useMotionValue<string | number | null>(null);
    const bottom = useMotionValue<string | number | null>(null);
    const minWidth = useMotionValue<string | number | null>('min-content');
    const minHeight = useMotionValue<string | number | null>('min-content');

    const motionValues = useRef<{ [key: string]: MotionValue }>({
        width, height,
        left, right,
        top, bottom,
        minWidth, minHeight
    })

    const resizableRef = useRef<HTMLDivElement>(null!);

    // Callback buckets
    const dispatchRegister = useRef<MouseDispatchRegister>({});
    const dispatchOnMouseEnter: MouseEventHandler = (e) => {
        Object.values(dispatchRegister.current).forEach((v: MouseEventHandler) => v(e))
    }

    // Allow controllers some control over siblings
    const activeSetters = useRef<{ [key: string]: React.Dispatch<boolean> }>({})

    // Global Controls
    // Currently only one set of controls are allowed at a time
    const id = useRef<string>(uuidv4());
    const controlsId = useSelector(getActiveControlsId);
    const controlsActive = id.current === controlsId;
    // console.log(`id: ${id.current}\n controlsId: ${controlsId}\n controlsActive: ${controlsActive}`)

    // ::HACK
    // the minWidth motion value returns min-content; this is not a useful value
    // for comparison operators. It must be converted to a number after all children
    // components have mounted. 500ms are provided to reach first paint; more may be
    // needed.
    useEffect(() => {
        setTimeout(() => {
            let styles = getComputedStyle(resizableRef.current)
            console.log(styles.width)
            console.log(styles.height)
            minWidth.set(parseInt(styles.width, 10))
            minHeight.set(parseInt(styles.height, 10))
            console.log(`mW: ${minWidth.get()} / mH: ${minHeight.get()}`)
        }, 500)
    }, [children])

    return (
        <motion.div
            ref={resizableRef}
            className='absolute select-none min-w-min min-h-min focus:ring-0'
            style={{
                width, height,
                left, right,
                top, bottom
            }}
            layout
            onMouseEnter={dispatchOnMouseEnter}
        >
            {children}
            <Resizer
                parentId={id.current}
                controlsActive={controlsActive}
                parentRef={resizableRef}
                motionValues={motionValues.current}
                dispatchRegister={dispatchRegister.current}
                siblingSetters={activeSetters.current} />
            <Translater
                parentId={id.current}
                controlsActive={controlsActive}
                parentRef={resizableRef}
                motionValues={motionValues.current}
                dispatchRegister={dispatchRegister.current}
                siblingSetters={activeSetters.current} />
        </motion.div >
    )
}

export default TransformableFrame;