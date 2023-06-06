import React, { useState } from 'react';
import MapComponent from './map';
function KakaoMap(props: any) {
    const [isOpen, setIsOpen] = useState(false);

    const onClickPin = () => {
        setIsOpen(true);
    };

    return (
        <>
            <MapComponent/>
        </>
    );
}

export default KakaoMap;
