import React, { MouseEventHandler, Ref, useState } from 'react';
import { motion, MotionValue, Variants } from 'framer-motion';

const BoxVariants: Variants = {
    'initial': {
        opacity: .3,
        width: '50%',
        height: '50%'
    },
    'animate': {
        opacity: .6,
        width: '100%',
        height: '100%',
        transition: {
            type: 'spring',
            duration: .2,
            stiffness: 150,
            damping: 10
        }
    },
    'dragging': {
        opacity: .1,
        width: '100%',
        height: '100%'
    },
    'whileHover': {
        opacity: .7
    },
    'exit': {
        width: '50%',
        height: '50%'
    },
}

interface DragBoxProps {
    parentRef: Ref<HTMLDivElement>,
    motionValues: { [key: string]: MotionValue }
}

const DragBox: React.FC<DragBoxProps> = ({ parentRef, motionValues }) => {
    const [dragging, setDragging] = useState<Boolean>(false);
    const {
        left, right,
        top, bottom
    } = motionValues;

    // @ts-ignore
    const targetStyles = getComputedStyle(parentRef.current);

    const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        setDragging(true);

        // @ts-ignore
        let parentRect: DOMRect = parentRef.current.getBoundingClientRect();

        left.jump(parentRect.left);
        top.jump(parentRect.top);
        right.jump(targetStyles.right);
        bottom.jump(targetStyles.bottom);
        typeof right.get() === 'string' && right.set(parseInt(right.get(), 10));
        typeof bottom.get() === 'string' && bottom.set(parseInt(bottom.get(), 10));

        let x = e.clientX;
        let y = e.clientY;
        let dX = 0;
        let dY = 0;

        // let initialRight = parentStyles.right;
        // let initialBottom = parentStyles.bottom;

        const windowHandleOnMouseMove = (e: MouseEvent) => {
            dX = e.clientX - x;
            dY = e.clientY - y;

            left.set(left.get() + dX);
            top.set(top.get() + dY);
            right.set(right.get() - dX);
            bottom.set(bottom.get() - dY)

            x = e.clientX;
            y = e.clientY;
        }

        const windowHandleOnMouseUp = (e: MouseEvent) => {
            setDragging(false);
            window.removeEventListener('mousemove', windowHandleOnMouseMove);
            window.removeEventListener('mouseup', windowHandleOnMouseUp)
        }

        window.addEventListener('mousemove', windowHandleOnMouseMove)
        window.addEventListener('mouseup', windowHandleOnMouseUp)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='absolute top-0 left-0 size-full flex justify-center items-center'
        >
            <motion.div
                className='bg-gradient-to-br from-pink-500 to-white rounded-md hover:cursor-grab active:cursor-grabbing'
                variants={BoxVariants}
                initial='initial'
                animate={dragging ? 'dragging' : 'animate'}
                whileHover={dragging ? 'dragging' : 'whileHover'}
                exit='exit'
                onMouseDown={handleMouseDown}
                layout
            />
        </motion.div>
    )
}

export default DragBox;