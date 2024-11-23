import React, { ChangeEventHandler, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import ProfilePictureControls from './ProfilePictureConrols';

const CharacterProfilePicture: React.FC = ({ }) => {
    const [src, setSrc] = useState<string>('');

    // Settings
    // const [borderStyle, setBorderStyle] = useState<'simple' | 'custom'>('simple');
    const [borderShape, setBorderShape] = useState<'square' | 'rounded' | 'circle'>('circle');
    const [realShape, setRealShape] = useState<'square' | 'rect'>('square');

    setBorderShape;
    setRealShape;

    const width = useMotionValue('0rem');
    const height = useMotionValue('0rem');
    const borderRadius = useMotionValue('0px');
    // const scale = useMotionValue(1);

    useEffect(() => {
        switch (borderShape) {
            case 'square': borderRadius.jump('0px');
            case 'rounded': borderRadius.jump('0.375rem');
            case 'circle': borderRadius.jump('9999px');
        }
    }, [borderShape])

    useEffect(() => {
        switch (realShape) {
            case 'square': height.set(width.get());
        }
    }, [realShape])

    // Refs
    const portraitZoneRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        if (!portraitZoneRef.current) return;
        if (!src) {
            width.set('7.2rem');
            height.set('7.2rem');
        } else {
            let rect = portraitZoneRef.current.getBoundingClientRect();
            let w = `${rect.width / 10}rem`;
            let h = `${rect.height / 10}rem`;
            width.set(w);
            height.set(h);
        }
    }, [])

    // Controls
    const imageButtonCb: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        if (!e.target.files) return;
        let f = e.target.files[0];
        if (!f) return;
        let p = window.electron.showFilePath(f);
        p = `local:\\\\${p}`;
        setSrc(p);
    }, [])

    const cropButtonCb: MouseEventHandler<HTMLDivElement> = useCallback(() => {
        console.log("Cropping...");
    }, [])

    const eraseButtonCb: MouseEventHandler<HTMLDivElement> = useCallback(() => {
        console.log("Erasing...")
        setSrc('');
    }, [])

    return (
        <div
            className='relative'
        >
            {/* Image */}
            <motion.div
                ref={portraitZoneRef}
                className='flex justify-center items-center bg-clip-border'
                layout
                style={{ width, height }}
            >
                {src ?
                    <motion.img
                        src={src}
                        className='inline-block'
                        style={{
                            width, height,
                            // scale,

                        }}
                    /> :
                    <motion.div
                        style={{ width, height }}
                        className='flex justify-center items-center  rounded-full bg-pink-50 text-teko'
                    >
                        <span className='text-5xl bg-gradient-to-b from-pink-700 to-pink-300 text-transparent bg-clip-text drop-shadow-2xl'>?</span>
                    </motion.div>
                }
            </motion.div>
            {/* Controls */}
            <ProfilePictureControls imageCb={imageButtonCb} cropCb={cropButtonCb} eraseCb={eraseButtonCb} />
        </div>
    )
}

export default CharacterProfilePicture;