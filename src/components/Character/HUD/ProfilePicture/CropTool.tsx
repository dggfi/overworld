import React from 'react';

interface CropToolProps {
    src: ''
}

const CropTool: React.FC<CropToolProps> = ({src}) => {
    if (!src) {
        // Dispatch error
        return <></>
    }

    return (
        <div>

        </div>
    )
}

export default CropTool;