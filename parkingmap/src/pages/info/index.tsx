import React, { useState } from 'react';
import styles from './styles.module.scss';
import KakaoMap from '../../components/KakaoMap';
import Detail from '../../components/details';
import "./Table.scss";
import {useNavigate} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import selectedPin from '../../recoil/selectedPin';
import selectedPark from '../../recoil/selectedPark';
interface Spot { 
    spot_name: string;
    spot_latitude: number;
    spot_longitude: number;
  }
function ParkingInfo() {
    const navigate = useNavigate();
    const [filtering, setFiltering] = useState(false); 
    const selectedSpot= useRecoilValue(selectedPin) 
    const selectedParking= useRecoilValue(selectedPark)
    return (
        
    <div className={styles.container}>
            <div style={{marginTop: 30, marginBottom:20,height:"20%", fontSize:17}}>
            <span style={{fontSize: 25,fontWeight:400, color: '#775EEE'}}>{selectedSpot.spot_name}</span>
        의 주차정보 입니다</div>
            <KakaoMap version={0}/>
            <div style={{margin:"15px 0px"}}><span style={{fontSize:16,fontWeight:400,color:'#775EEE'}}>{selectedSpot.spot_name}
            </span>의 평균 주차 요금은 <span style={{fontSize: 16,fontWeight:400, color: '#775EEE'}}>2000원</span>입니다.</div>
            
            <div className={styles.filterbutton} onClick={()=>navigate('/filter')}>
                <img src="assets/icons/filter.png" width={"67px"} height={"34px"}></img>
            </div>
        {selectedParking !==null ? <Detail/> : null}
        <table className="user-table">
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
                        <td>2000원</td>
                        {/* <td>0원 <img src='/assets/icons/down.png' className={styles.image}/></td> */}
                    </tr>
                </tbody>
            </table>
    </div>);
}
export default ParkingInfo;