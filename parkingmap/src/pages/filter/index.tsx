import React from 'react';
import styles from './styles.module.scss';
function Filter() {
    return (
    <div className={styles.container}>

    
        <div className={styles.filterbox}>
            <div>
                <div style={{textAlign:'center',padding:15,fontSize:16,fontWeight:500}}>원하는 반경을 선택하세요</div>
                <div className={styles.buttonContainer}>
                    <div className={styles.button}>500m</div>
                    <div className={styles.button}>1.0km</div>
                    <div className={styles.button}>1.5km</div>
                </div>
            </div>

            <div style={{marginTop:20,marginBottom:10,flexDirection:'row',display:'flex',justifyContent:'center'}}>
                <div>
                    <div style={{textAlign:'center',padding:15,fontSize:16,fontWeight:500}}>요일을 선택하세요</div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.button}>평일</div>
                        <div className={styles.button}>주말</div>
                    </div>
                </div>
                <div>
                    <div style={{textAlign:'center',padding:15,fontSize:16,fontWeight:500}}>전기차 충전소</div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.button}>있음</div>
                    </div>
                </div>
            </div>

                <div>
                    <div style={{marginTop:10,marginBottom:20}}>
                        <div style={{textAlign:'center',padding:15,fontSize:16,fontWeight:500}}>원하는 요금 범위를 설정하세요</div>
                        <div style={{flexDirection:'row',display:'flex',justifyContent:'center'}}>
                            <div className={styles.slider}></div>
                            <div className={styles.sliderbutton}></div>
                        </div>
                    </div>
                </div>

                <div style={{marginTop:60}}>
                    <div className={styles.applybutton}>
                        적용
                    </div>
                </div>


        </div>
    </div>

    
    );
}
export default Filter