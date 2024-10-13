import { useState } from 'react';

const useArray = <T>(defaultArray: T[]) => {
    const [array, setArray] = useState<T[]>(defaultArray);

    const push = (element: T) => {
        setArray((a: T[]) => [...a, element]);
    }
    const filter = (cb: any) => {
        setArray((a: T[]) => a.filter(cb))
    }
    const update = (index: number, newElement: T) => {
        setArray((a: T[]) => [
            ...a.slice(0, index), newElement, ...a.slice(index + 1, a.length)
        ])
    }
    const remove = (index: number) => {
        setArray((a: T[]) => [...a.slice(0, index), ...a.slice(index + 1, a.length)])
    }
    const clear = () => { setArray([]) };

    return { array, setArray, push, filter, update, remove, clear }
}

export default useArray;