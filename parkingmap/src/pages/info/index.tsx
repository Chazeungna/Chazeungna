import React, { useState } from 'react';
import styles from './styles.module.scss';
import KakaoMap from '../../components/KakaoMap';
import Detail from '../../components/details';
import FilteringBox from '../../components/filter';
import "./Table.scss";
import { useLocation } from 'react-router-dom';

function ParkingInfo() {
    const {state} = useLocation();
    const [filtering, setFiltering] = useState(false);  
    return (
    <div className={styles.container}>
        <div style={{marginTop: 30, marginBottom:20,height:"20%", fontSize:17}}>
            <span style={{fontSize: 25,fontWeight:400, color: '#775EEE'}}>{state}</span>
            의 주차정보 입니다</div>
            <KakaoMap version={0}/>
            <div style={{margin:"15px 0px"}}><span style={{fontSize:16,fontWeight:400,color:'#775EEE'}}>{state}</span>의 평균 주차 요금은 <span style={{fontSize: 16,fontWeight:400, color: '#775EEE'}}>2000원</span>입니다.</div>
            
            <div className={styles.filterbutton}>
                
                <img src="assets/icons/filter.png" width={"67px"} height={"34px"} onClick = {
                    ()=>{setFiltering(!filtering)}
                }></img>
            </div>
                {filtering ? <FilteringBox/> : null}            

            <Detail/>

            
            
        

        {/* <table className="user-table">
        <thead>
          <tr>
            <th>주차장명</th>
            <th>거리</th>
            <th>가격(시간당)</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td style={{textDecoration:'underline'}}>차증나 주차장</td>
                <td>520m</td>
                <td>0원 <img src='/assets/icons/down.png' className={styles.image}/></td>
            </tr>
            <tr>
                <td style={{textDecoration:'underline'}}>아주대 주차장</td>
                <td>700m</td>
                <td>0원 <img src='/assets/icons/down.png' className={styles.image}/></td>
            </tr>
            <tr>
                <td style={{textDecoration:'underline'}}>아주대 주차장</td>
                <td>750m</td>
                <td>0원 <img src='/assets/icons/down.png' className={styles.image}/></td>
            </tr>
            <tr>
                <td style={{textDecoration:'underline'}}>아주대 주차장</td>
                <td>800m</td>
                <td>0원 <img src='/assets/icons/down.png' className={styles.image}/></td>
            </tr>

        </tbody>
      </table> */}
      {/* </div> */}
    </div>);
}
export default ParkingInfo;