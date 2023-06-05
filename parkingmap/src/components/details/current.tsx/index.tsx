import React from 'react';
import styles from './styles.module.scss';

const CurrentInfo = ()=>{
    return(    
    <div className={styles.latestInfoBox}>
        <div style={{marginTop:5,fontSize:16, fontWeight:400,color:'black'}}>주차 현황</div>
        <div style={{marginTop:5,fontSize:20, fontWeight:600,color:'#775EEE'}}>50 / 70</div>   
        <div className={styles.updateContainer}>
            <div style={{marginTop:7,fontSize:12,fontWeight:400,color:'#717171'}}>2023.06.04 21:13</div>
            <div className={styles.icons}>
                <img src="assets/icons/refresh.png" width="16px" height="16px" style={{marginLeft:3}}></img>
            </div>
        </div>
    </div>);
}
export default CurrentInfo;