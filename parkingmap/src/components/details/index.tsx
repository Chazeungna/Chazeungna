import React from 'react';
import styles from './styles.module.scss';

function Detail() {
    const title = [['노상','노외'], ['유로','무료'],['EV','NEV']]
    return (
    <div className={styles.container}>
        <div style={{marginTop:350,marginBottom:20,height:"20%",fontSize:16}}>
            <span style={{fontSize:16,fontWeight:400,color:'#775EEE'}}>홍대입구역</span>의 평균 주차 요금은 <span style={{fontSize: 14,fontWeight:400, color: '#775EEE'}}>2000원</span>입니다
        </div>
        
        <div className={styles.mapbox}></div>    

        
        <div className={styles.infobox}>
            <div className={styles.namecontainer}>
                <div style={{marginTop:0,marginLeft:0,padding:10}}>
                    <span style={{fontSize:24,fontWeight:600,color:'black'}}>주차장명</span>
                </div>
            </div>
        

            <div className={styles.keywordbox}>
                <div style={{marginLeft:10, marginTop:5,marginBottom:10}}></div>
                <div className={styles.keywordCircle}>노외</div>
                <div className={styles.keywordCircle}>유료</div>
                <div className={styles.keywordCircle}>EV</div>

                {/* {title.map((key, index)=>{return <div>{key[0]}</div>})} */}
                    
            </div>

            <div className={styles.addressContainer}>
                <div className={styles.icons}>
                    <img src="assets/icons/location.png" width="16px" height="16px" style={{marginLeft:20}}></img>
                </div>
                
                <div className={styles.address}>
                    <div style={{marginTop:0,marginBottom:0,marginLeft:15,height:14,fontSize:14}}>
                            <span style = {{fontSize:14,fontWeight:400,color:'black'}}>경기도 수원시 영통구</span>
                    </div>
                </div>

                <div className={styles.icons}>
                    <img src="assets/icons/cards.png" width="16px" height="16px"></img>
                </div>  
            </div>

            <div className={styles.latestContainer}>
                <div className={styles.icons}>
                    <img src="assets/icons/car.png" width="16px" height="16px" style={{marginLeft:20}}></img>
                </div>

                <div className={styles.latestinfo}>
                    <div style={{marginTop:10,marginBottom:10,marginLeft:5,height:14,fontSize:14}}>
                            <span style = {{fontSize:14,fontWeight:400,color:'black',marginLeft:15}}>현재 주차 대수 / 총 주차 대수</span>
                    </div>
                </div>  
            </div>
            
            <div className={styles.line}></div>
            <div className={styles.categorybox}>
                <span style={{fontSize:12,fontWeight:400,color:'#775EEE'}}>운영정보</span>
                <span style={{fontSize:12,fontWeight:400,color:'black'}}>요금정보</span>
            </div>
            <div className={styles.line}></div>

            <div className={styles.manageinfobox}>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 운영 요일 : 월 ~ 금</span>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 운영 시간 : 00:00 ~ 00:00</span>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 노외/노상 : 노외</span>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 전기차 충전소 현황 : 있음</span>
                
            </div>

            
        </div>

        <div className={styles.infobox}>
            <div className={styles.namecontainer}>
                <div style={{marginTop:0,marginLeft:0,padding:10}}>
                    <span style={{fontSize:24,fontWeight:600,color:'black'}}>주차장명</span>
                </div>
            </div>
        

            <div className={styles.keywordbox}>
                <div style={{marginLeft:10, marginTop:5,marginBottom:10}}></div>
                <div className={styles.keywordCircle}>노외</div>
                <div className={styles.keywordCircle}>유료</div>
                <div className={styles.keywordCircle}>EV</div>

                {/* {title.map((key, index)=>{return <div>{key[0]}</div>})} */}
                    
            </div>

            <div className={styles.addressContainer}>
                <div className={styles.icons}>
                    <img src="assets/icons/location.png" width="16px" height="16px" style={{marginLeft:20}}></img>
                </div>
                
                <div className={styles.address}>
                    <div style={{marginTop:0,marginBottom:0,marginLeft:15,height:14,fontSize:14}}>
                            <span style = {{fontSize:14,fontWeight:400,color:'black'}}>경기도 수원시 영통구</span>
                    </div>
                </div>

                <div className={styles.icons}>
                    <img src="assets/icons/cards.png" width="16px" height="16px"></img>
                </div>  
            </div>

            <div className={styles.latestContainer}>
                <div className={styles.icons}>
                    <img src="assets/icons/car.png" width="16px" height="16px" style={{marginLeft:20}}></img>
                </div>

                <div className={styles.latestinfo}>
                    <div style={{marginTop:10,marginBottom:10,marginLeft:5,height:14,fontSize:14}}>
                            <span style = {{fontSize:14,fontWeight:400,color:'black',marginLeft:15}}>현재 주차 대수 / 총 주차 대수</span>
                    </div>
                </div>  
            </div>
            
            <div className={styles.line}></div>
            <div className={styles.categorybox}>
                <span style={{fontSize:12,fontWeight:400,color:'black'}}>운영정보</span>
                <span style={{fontSize:12,fontWeight:400,color:'#775EEE'}}>요금정보</span>
            </div>
            <div className={styles.line}></div>

            <div className={styles.manageinfobox}>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 기본 요금 : 2000원/1시간</span>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 추가 요금 : 500원/30분</span>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 평일 무료 운영 / 주말(공휴일) 유료 운영</span>
            
            </div>

            
        </div>


        

       
    </div>
     
);
}
export default Detail

