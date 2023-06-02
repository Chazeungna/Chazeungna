import React, { useState } from 'react';
import { Map, MarkerClusterer, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import AreaInfoOverlay from './\bAreaInfoOverlay';
import clusterPositionsData from './clusterPositionsData.json';

function KakaoMap() {
    const [isOpen, setIsOpen] = useState(false);

    const onClickCluster = () => {
        setIsOpen(true);
    };

    return (
        <>
            <Map
                center={{ lat: 37.332495, lng: 127.112503 }}
                style={{ width: '93vw', height: '70vh' , borderRadius:20}}
                level={8}
            >
                <MarkerClusterer averageCenter={true} minLevel={5} onClusterclick={onClickCluster}>
                    {clusterPositionsData.positions.map((pos) => (
                        <MapMarker key={`${pos.lat}-${pos.lng}`} position={pos} />
                    ))}
                </MarkerClusterer>
            </Map>
            {isOpen && (
                <div>
                    <AreaInfoOverlay setIsOpen={setIsOpen} />
                </div>
            )}
        </>
    );
}

export default KakaoMap;
