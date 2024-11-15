import React, { useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
// import useClickoutside from '../../../hooks/useClickoutside';


interface ICharacterProfilePictureProps {
    src: string,
    userWidth: number | string,
    userHeight: number | string,
}

// const shapeStyles = {
//     'round': 'rounded-full',
//     'square': ' '
// }

const CharacterProfilePicture: React.FC<ICharacterProfilePictureProps> =({ src='', userWidth=0, userHeight=0 }) => {
    // Rect state
    const width = useMotionValue(userWidth);
    const height = useMotionValue(userHeight);
    
    // Refs
    const topRef = useRef<HTMLDivElement>(null!);

    return (
        <motion.div
            ref={topRef}
            style={{
                backgroundImage: src ? src : '',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                width,
                height
            }}
            className='flex justify-center aspect-square items-center rounded-full bg-clip-border bg-gray-400'
            layout
        >
            <p className='text-3xl text-teko'>{!src && '?'}</p>  
        </motion.div>
    )
}

export default CharacterProfilePicture;