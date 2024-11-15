import React, { MouseEventHandler, useRef, useState } from 'react';
import { ResizerBarProps } from '../../../../types/transformable';
import { motion, Variants } from 'framer-motion';

const leftDragVariants: Variants = {
    'initial': {
        opacity: 0,
        x: 10
    },
    'animate': {
        opacity: 1,
        x: 0,
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

const leftDragBarVariants: Variants = {
    'inactive': {
        opacity: 0,
        x: -10
    },
    'tentative': {
        opacity: .5,
        x: -10,
    },

    'active': {
        opacity: 1,
        x: 0
    }
}


const ResizerLeft: React.FC<ResizerBarProps> = ({ parentStyles, parentRef, motionValues }) => {
    // State
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    // Closure
    const drag = useRef<boolean>(false);
    const {
        left, right,
        width, minWidth
    } = motionValues;
    const mainRef = useRef<HTMLDivElement>(null!);
    const barRef = useRef<HTMLDivElement>(null!);

    // Handlers
    const handleOnMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        setIsActive(true);
        drag.current = true;
        
        // @ts-ignore
        let parentRect: DOMRect = parentRef.current.getBoundingClientRect();
        
        left.jump(null);
        right.jump(parentStyles.right);
        
        const handleOnMouseMove = (e: MouseEvent) => {
            if (!drag.current) return;

            let newWidth = (parentRect.right - e.clientX);
            if (newWidth < minWidth.get()) {
                newWidth = minWidth.get(); 
            }
            width.set(newWidth);
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
            className='absolute top-0 left-0 h-full -ml-3 w-2 bg-gray-200 bg-opacity-100 rounded-md shadows-2xl shadow-inner hover:cursor-col-resize'
            variants={leftDragVariants}
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
                variants={leftDragBarVariants}
                animate={resolve()}
                layout
            />
        </motion.div>
    )
}

export default ResizerLeft;