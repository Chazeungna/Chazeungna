import React, { useState } from 'react';
import styles from './styles.module.scss';
import CurrentInfo from './current.tsx';
function Detail() {
    const title = [['노상','노외'], ['유로','무료'],['EV','NEV']]
    const [manage, setManage] = useState(true);
    const [current, setCurrent] = useState(false);
    return (
    <div className={styles.container}>
        <div className={styles.infobox}>
                <div style={{fontSize:'24px', fontWeight:'600', margin:20}}>
                    주차장명 
                </div>
            <div className={styles.keywordbox}>
                <div className={styles.keywordCircle}>노외</div>
                <div className={styles.keywordCircle}>유료</div>
                <div className={styles.keywordCircle}>EV</div>      
            </div>

            <div className={styles.addressContainer}>
                    <img src="assets/icons/location.png" width="16px" height="16px" style={{marginLeft:20}}></img>
                    <div style = {{fontSize:14,fontWeight:400}}>경기도 수원시 영통구</div>

                    <img src="assets/icons/cards.png" width="16px" height="16px"></img>
                    <div style = {{fontSize:14,fontWeight:400,color:'#717171'}}> 약 500m</div>
            </div>
            <div className={styles.latestContainer}>
                <img src="assets/icons/car.png" width="16px" height="16px" style={{marginLeft:20}}></img>
                <div style = {{fontSize:14,fontWeight:400,marginTop:10,marginBottom:10,color:'black',marginLeft:10,textDecoration:'underline',
                position:'relative'}} onClick = {
                    ()=>{setCurrent(!current)}
                }>현재 주차 현황 보기</div>
            </div> 
                {current ?  <CurrentInfo/> : null}
            <div className={styles.line}></div>
            <div className={styles.categorybox}>
                <span style={{fontSize:13,fontWeight:400, color: `${manage?'#775EEE': 'black'}`}} onClick={()=>setManage(!manage)}>운영정보</span>
                <span style={{fontSize:13,fontWeight:400,color:`${!manage?'#775EEE': 'black'}`}} onClick={()=>setManage(!manage)}>요금정보</span>
            </div>
            <div className={styles.line}></div>
            { manage ? 
            <div className={styles.manageinfobox}>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 운영 요일 : 월 ~ 금</span>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 운영 시간 : 00:00 ~ 00:00</span>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 노외/노상 : 노외</span>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 전기차 충전소 현황 : 있음</span>
            </div> :   <div className={styles.manageinfobox}>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 기본 요금 : 2000원/1시간</span>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 추가 요금 : 500원/30분</span>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 평일 무료 운영 / 주말(공휴일) 유료 운영</span>
            
            </div>
            }
            
        </div>
    </div>
     
);
}
export default Detail