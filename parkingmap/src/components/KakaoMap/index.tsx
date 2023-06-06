import React, { useState } from 'react';
import MapComponent from './map';
import SmallMapComponent from './smallMap';
function KakaoMap(props: any) {
    const [isOpen, setIsOpen] = useState(false);

    const onClickPin = () => {
        setIsOpen(true);
    };

    return (
        <>
            {props.version ===1 ? <MapComponent/>: <SmallMapComponent/>}
        </>
    );
}

export default KakaoMap;
