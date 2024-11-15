import { MotionValue } from "framer-motion";
import { MouseEventHandler, Ref } from "react";

export interface ResizerBarProps {
    motionValues: { [key:string]: MotionValue },
    parentStyles: CSSStyleDeclaration,
    parentRef: Ref<HTMLDivElement>
}

export interface MouseDispatchRegister {
    [key: string]: MouseEventHandler
}