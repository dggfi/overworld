import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { ChangeEventHandler, MouseEventHandler, useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faImage } from '@fortawesome/sharp-solid-svg-icons/faImage';
import { faSquareDashed } from '@fortawesome/sharp-solid-svg-icons/faSquareDashed';
import { faEraser } from '@fortawesome/pro-solid-svg-icons/faEraser';

const HelperTextVariants: Variants = {
    'intiial': { opacity: .6 },
    'animate': { opacity: 1 },
    'exit': { opacity: .6 }
}

const HelperText: React.FC<{ children: string }> = ({ children }) => {
    return (
        <motion.div
            variants={HelperTextVariants}
            className='absolute -top-[125%] -left-1/2 rounded-lg -mb-4 bg-white border-b-gray-300 px-2 py-1 shadow-2xl font-semibold text-teko text-pink-900 text-nowrap'
        >
            {children}
        </motion.div>
    )
}

const ButtonsVariants: Variants = {
    'initial': { opacity: .6, y: '-1.6rem' },
    'animate': { opacity: 1, y: 0, scale: 1 },
    'whileHover:': { scale: 1.05 },
    'whileTap': { scale: .95 },
    'exit': { opacity: .6, y: '-1.6rem' }
}

interface ControlButtonProps {
    icon: IconProp,
    cb: Function,
    helperText: string
}

const ControlButton: React.FC<ControlButtonProps> = ({ icon, cb, helperText }) => {
    const [helperTextActive, setHelperTextActive] = useState<boolean>(false);

    const handleOnMouseEnter = useCallback(() => setHelperTextActive(true), [])
    const handleOnMouseLeave = useCallback(() => setHelperTextActive(false), [])


    return (
        <div
            className='relative'
        >
            <motion.button
                type='button'
                variants={ButtonsVariants}
                initial='initial'
                animate='animate'
                whileHover='whileHover'
                whileTap='whileTap'
                exit='exit'
                className=' rounded-md bg-white border-b-gray-700 shadow-2xl flex justify-center items-center'
                style={{ width: '2.8rem', height: '2.8rem' }}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                onClick={() => cb()}
            >
                <FontAwesomeIcon className='text-pink-300 text-2xl' icon={icon} />
            </motion.button>
            <AnimatePresence>
                {helperTextActive && <HelperText>{helperText}</HelperText>}
            </AnimatePresence>
        </div>
    )
}

interface FileButtonProps {
    icon: IconProp,
    cb: ChangeEventHandler<HTMLInputElement>,
    helperText: string
}

const FileButton: React.FC<FileButtonProps> = ({ icon, cb, helperText }) => {
    const [helperTextActive, setHelperTextActive] = useState<boolean>(false);

    const handleOnMouseEnter = useCallback(() => setHelperTextActive(true), [])
    const handleOnMouseLeave = useCallback(() => setHelperTextActive(false), [])

    return (
        <div
            className='relative'
        >
            <motion.div
                onChange={cb}
                variants={ButtonsVariants}
                initial='initial'
                animate='animate'
                whileHover='whileHover'
                whileTap='whileTap'
                exit='exit'
                className='rounded-md bg-white border-b-gray-500 shadow-xl flex justify-center items-center hover:cursor-pointer'
                style={{ width: '2.8rem', height: '2.8rem' }}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
            >
                <input type='file' className='absolute size-full file:bg-none file:border-none file:invisible hover:file:cursor-pointer' accept='image/*' onChange={cb} />
                <FontAwesomeIcon className='text-pink-300 text-2xl hover:cursor-pointer' icon={icon} />
                {/* // text-5xl bg-gradient-to-b from-pink-700 to-pink-300 text-transparent bg-clip-text drop-shadow-2xl */}
            </motion.div>
            <AnimatePresence>
                {helperTextActive && <HelperText>{helperText}</HelperText>}
            </AnimatePresence>
        </div>
    )
}

interface ProfilePictureControlsProps {
    imageCb: ChangeEventHandler<HTMLInputElement>,
    cropCb: MouseEventHandler<HTMLDivElement>,
    eraseCb: MouseEventHandler<HTMLDivElement>
}

const ProfilePictureControls: React.FC<ProfilePictureControlsProps> = ({ imageCb, cropCb, eraseCb }) => {

    return (
        <motion.div className='absolute top-0 right-0 pt-3 pr-3 flex gap-x-4'
            animate={{ transition: { staggerChildren: .25 } }}
            exit={{ transition: { staggerChildren: .1 } }}
        >
            {/* Upload picture button */}
            <FileButton cb={imageCb} icon={faImage} helperText='Select image' />
            <ControlButton cb={cropCb} icon={faSquareDashed} helperText='Crop' />
            <ControlButton cb={eraseCb} icon={faEraser} helperText='Erase' />
        </motion.div>
    )
}

export default ProfilePictureControls;