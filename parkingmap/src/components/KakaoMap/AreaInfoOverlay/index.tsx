import React from 'react';
import styles from './styles.module.scss';

function AreaInfoOverlay({ setIsOpen }: any) {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div style={{fontWeight:600, margin: 10}}>홍대입구의 주차장 Top3</div>
                <select style={{margin:10, borderRadius:5}}>
                    <option>가격순</option>
                    <option>주차규모순</option>
                    <option>전기차충전소</option>
                </select>
            </div>
            <div className={styles.priority}>
                <img src='/assets/icons/1.png' className={styles.image}/>
                <div style={{margin:5, fontSize:'0.9em', fontWeight:500}}>아주주차장</div>
            </div>
            <div className={styles.priority}>
                <img src='/assets/icons/2.png' className={styles.image}/>
                <div style={{margin:5, fontSize:'0.9em', fontWeight:500}}>아주주차장</div>
            </div>
            <div className={styles.priority}>
                <img src='/assets/icons/3.png' className={styles.image}/>
                <div style={{margin:5, fontSize:'0.9em', fontWeight:500}}>아주주차장</div>
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.button1} onClick={() => setIsOpen(false)}>자세히보기</div>
                <div className={styles.button2} onClick={() => setIsOpen(false)}>닫기</div>
            </div>
        </div>
    );
}

export default AreaInfoOverlay;
