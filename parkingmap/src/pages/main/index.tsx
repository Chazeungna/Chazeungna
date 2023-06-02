import React from 'react';
import KakaoMap from '../../components/KakaoMap';
import styles from './styles.module.scss';
function Main() {
    return (
        <div>
            <div className={styles.title}>
                Seoul Parking Status
            </div>
            <div  className={styles.content}>
                서울 내 주차 정보를 확인해요!
            </div>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img src='/assets/icons/search.png' className={styles.image}/>
                    <input className={styles.search}/>
                </div>
                <div className={styles.mapContainer}>
                        <KakaoMap/>
                </div>
            </div>

        </div>);
}
export default Main
;