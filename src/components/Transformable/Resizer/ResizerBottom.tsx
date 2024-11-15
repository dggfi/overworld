import React, { MouseEventHandler, useRef, useState } from 'react';
import { ResizerBarProps } from '../../../../types/transformable';
import { motion, Variants } from 'framer-motion';

const bottomDragVariants: Variants = {
    'initial': {
        opacity: 0,
        y: -10
    },
    'animate': {
        opacity: 1,
        y: 0,
        transition: {
            duration: .5,
            type: 'spring',
            stiffness: 100,
            damping: 5
        }
    },
    'whileHover': {
        opacity: .9
    },
    'exit': {
        opacity: 0
    }
}

const bottomDragBarVariants: Variants = {
    'inactive': {
        opacity: 0,
        y: 10
    },
    'tentative': {
        opacity: .5,
        y: 10,
    },

    'active': {
        opacity: 1,
        y: 0
    }
}


const ResizerBottom: React.FC<ResizerBarProps> = ({ parentStyles, parentRef, motionValues }) => {
    // State
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    // Closure
    const drag = useRef<boolean>(false);
    const {
        top, bottom,
        height, minHeight
    } = motionValues;
    const mainRef = useRef<HTMLDivElement>(null!);
    const barRef = useRef<HTMLDivElement>(null!);


    // Handlers
    const handleOnMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        setIsActive(true);
        drag.current = true;
        top.jump(parentStyles.top);
        bottom.jump(null);

        const handleOnMouseMove = (e: MouseEvent) => {
            if (!drag.current) return;
            //@ts-ignore
            let rect: DOMRect = parentRef.current.getBoundingClientRect();
            let newHeight = (e.clientY - rect.top);
            if (newHeight < minHeight.get()) {
                newHeight = minHeight.get();
            }
            height.set(newHeight);
        }

        const handleOnMouseUp = (e: MouseEvent) => {
            setIsActive(false);
            window.removeEventListener('mouseup', handleOnMouseUp);
            window.removeEventListener('mousemove', handleOnMouseMove);
        }

        window.addEventListener('mouseup', handleOnMouseUp);
        window.addEventListener('mousemove', handleOnMouseMove)
    }

    const resolve = () => {
        if (isActive) return 'active';
        if (isHovering) return 'tentative';
        return 'inactive'
    }

    return (
        <motion.div
            ref={mainRef}
            className='absolute bottom-0 right-0 w-full -mb-3 h-2 bg-gray-200 bg-opacity-100 rounded-md shadows-2xl shadow-inner hover:cursor-row-resize'
            variants={bottomDragVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            whileHover='whileHover'
            onMouseDown={handleOnMouseDown}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            layout
        >
            <motion.div
                ref={barRef}
                className='size-full bg-pink-300 rounded-md shadow-xl bg-opacity-100 relative z-20 pointer-events-none'
                variants={bottomDragBarVariants}
                animate={resolve()}
                layout
            />
        </motion.div>
    )
}

export default ResizerBottom;