import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import KakaoMap from '../../components/KakaoMap';
import Detail from '../../components/details';
import "./Table.scss";
import {useNavigate} from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import selectedPin from '../../recoil/selectedPin';
import selectedPark from '../../recoil/selectedPark';
import { server_debug } from '../../api';
import parkingData from '../../recoil/data';
import axios from 'axios';
import FilteringBox from '../../components/filter';
interface Parking { 
    parking_name: string;
    latitude: string;
    longitude: string;
    charge: string;
    distance: number;
  }
  
function ParkingInfo() {
    const fetchSpotList = async () => {
        try {
          const response = await axios.get(`${server_debug}/parkingspot/${selectedSpot.spot_name}`);
          if (response.status === 200) {
            setData(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
    const fetchSpotAverage = async () => {
        try {
          const response = await axios.get(`${server_debug}/parkingdetail/average`);
          if (response.status === 200) {
            setAverage(response.data[0].average);
          }
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(()=>{fetchSpotList();fetchSpotAverage()},[])
    const [data, setData] = useRecoilState<Parking[] | null>(parkingData)
    const [filter, setfilter] = useState(false)
    const navigate = useNavigate();
    const [average,setAverage] = useState(0)
    const selectedSpot= useRecoilValue(selectedPin) 
    const [selectedParking, setSelectedParking]= useRecoilState<any>(selectedPark)
    return (
        
    <div className={styles.container}>
            <div style={{display:'flex',}}>
              <img src='/assets/icons/home.png' width="30px" height="30px" style={{position:'absolute', top:28, left:'3vw'}} onClick={()=>navigate('/')}/>
              <div style={{marginTop: 30, marginBottom:20,height:"20%", fontSize:17}}>
              <span style={{fontSize: 25,fontWeight:400, color: '#775EEE'}}>{selectedSpot.spot_name}</span>
              의 주차정보 입니다</div>
            </div>
            <KakaoMap version={0}/>
            <div style={{margin:"15px 0px"}}><span style={{fontSize:16,fontWeight:400,color:'#775EEE'}}>{selectedSpot.spot_name}
            </span>의 평균 주차 요금은 <span style={{fontSize: 16,fontWeight:400, color: '#775EEE'}}>{average}원</span>입니다.</div>
            
            <div className={styles.filterbutton} onClick={()=>{setSelectedParking(null);setfilter(!filter)}}>
                <img src="assets/icons/filter.png" width={"67px"} height={"34px"}></img>
            </div>
        {filter ? <FilteringBox setfilter={setfilter}/>:null}
        {selectedParking !==null ? <Detail/> :         
        <table className="user-table">
        <thead>
  
                <tr>
                    <th>주차장명</th>
                    <th>거리</th>
                    <th>가격(시간당)</th>
                </tr>
                </thead>
                <tbody>
                {data !== null
                  ? data.map((key: Parking, index: number) => (
                <tr key={index}>
                    <td style={{ textDecoration: 'underline'}} onClick={()=>setSelectedParking(key.parking_name)}>{key.parking_name}</td>
                    <td>{Math.ceil(key.distance)}m</td>
                    <td>{key.charge}원</td>
                </tr>
               ))
                : null}
                </tbody>
            </table>}
    </div>)
}
export default ParkingInfo;