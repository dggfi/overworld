import { useState } from 'react';

const useToggle = (defaultValue: boolean) => {
    const [value, setValue] = useState<boolean>(defaultValue);

    function toggleValue(truth?: boolean) {
        setValue(currentTruth => value ?? !truth)
    }

    return [value, toggleValue];
}

export default useToggle;