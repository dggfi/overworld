import { motion, MotionValue, useMotionValue } from 'framer-motion';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import Resizer from './Resizer/Resizer';
import { MouseDispatchRegister } from '../../../types/transformable';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { getActiveControlsId } from '../../store/controls';
import Translater from './Translater/Translater';

const TransformableFrame: React.FC<{ children: JSX.Element }> = ({ children }) => {
    // Resize, Translate, Rotate

    // const renderCount = useRef<number>(0);
    const width = useMotionValue<string | number>('auto');
    const height = useMotionValue<string | number>('auto');
    const left = useMotionValue<string | number | null>('50%');
    const right = useMotionValue<string | number | null>(null);
    const top = useMotionValue<string | number | null>(null);
    const bottom = useMotionValue<string | number | null>(null);
    const minWidth = useMotionValue<string | number | null>(null);
    const minHeight = useMotionValue<string | number | null>(null);

    const [motionValues, setMotionValues] = useState<{ [key: string]: MotionValue }>({
        width, height,
        left, right,
        top, bottom,
        minWidth, minHeight
    })

    const [resizableStyles, setResizableStyles] = useState<CSSStyleDeclaration>(null!)

    const resizableRef = useRef<HTMLDivElement>(null!);

    // the styles declaration will probably never change,
    // wondering if the resizableRef dependency is pointless
    useEffect(() => {
        const styles = window.getComputedStyle(resizableRef.current);
        setResizableStyles(styles);
        width.jump(parseInt(styles.width, 10));
        height.jump(parseInt(styles.height, 10));
        left.jump(parseInt(styles.left, 10));
        right.jump(parseInt(styles.right, 10));
        top.jump(parseInt(styles.top, 10));
        bottom.jump(parseInt(styles.bottom, 10));
        minWidth.jump(width.get())
        minHeight.jump(height.get())
        let newValues = {
            width, height,
            left, right,
            top, bottom,
            minWidth, minHeight
        }
        setMotionValues(newValues)
    }, [resizableRef])

    // Callback buckets
    const dispatchRegister = useRef<MouseDispatchRegister>({});
    const dispatchOnMouseEnter: MouseEventHandler = (e) => {
        Object.values(dispatchRegister.current).forEach((v: MouseEventHandler) => v(e))
    }

    // State
    const activeSetters = useRef<{ [key: string]: React.Dispatch<boolean> }>({})

    // Controls
    const id = useRef<string>(uuidv4());
    const controlsId = useSelector(getActiveControlsId);
    const controlsActive = id.current === controlsId;
    console.log(`id: ${id.current}\n controlsId: ${controlsId}\n controlsActive: ${controlsActive}`)

    return (
        <motion.div
            ref={resizableRef}
            className='absolute select-none min-w-min min-h-min focus:ring-0'
            style={{
                width,
                height,
                left,
                right,
                top,
                bottom
            }}
            layout
            onMouseEnter={dispatchOnMouseEnter}
        >
            {children}
                <Resizer
                    parentId={id.current}
                    controlsActive={controlsActive}
                    parentRef={resizableRef}
                    parentStyles={resizableStyles}
                    motionValues={motionValues}
                    dispatchRegister={dispatchRegister.current}
                    siblingSetters={activeSetters.current} />
                <Translater
                    parentId={id.current}
                    controlsActive={controlsActive}
                    parentRef={resizableRef}
                    parentStyles={resizableStyles}
                    motionValues={motionValues}
                    dispatchRegister={dispatchRegister.current}
                    siblingSetters={activeSetters.current} />
        </motion.div >
    )
}

export default TransformableFrame;