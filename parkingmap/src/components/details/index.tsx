import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import CurrentInfo from './current.tsx';
import selectedPark from '../../recoil/selectedPark';
import {useRecoilState } from 'recoil';
import { server_debug } from '../../api';
import axios from 'axios';
interface DetailType { 
    parking_name: string;
    parking_address: string;
    distance: number;
    ev_charger_: number;
    weekday_oper_info : string;
    saturday_oper_info:string;
    holiday_oper_info:string;
    phone_no :string;
    oper_status:string;
    free:number;
    basic_charge: string;
    additional_charge:string;
  }
  
function Detail() {
    const [manage, setManage] = useState(true);
    const [current, setCurrent] = useState(false);
    const [data,setData] = useState<DetailType>()
    const [selectedParking, setSelectedParking] = useRecoilState(selectedPark);
    const handleCopyClipBoard = async (text: string) => {
        try {
          await navigator.clipboard.writeText(text);
          alert('클립보드에 링크가 복사되었습니다.');
        } catch (e) {
          alert('복사에 실패하였습니다');
        }
    };
    const fetchDetail = async () => {
        try {
          const response = await axios.get(`${server_debug}/detail/${selectedParking}`);
          if (response.status === 200) {
            setData(response.data[0]);
          }
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(()=>{fetchDetail()},[selectedParking]);
    return (
    <div className={styles.container}>
        {data!==undefined && data!== null ?<div className={styles.infobox}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{fontSize:'20px', fontWeight:'600', margin:20}}>
                    {selectedParking}
                </div>
                <div style={{fontSize:'15px', fontWeight:'400', margin:20}} onClick={()=>setSelectedParking(null)}>닫기</div>
            </div>
            <div style={{display:'flex'}}>
                <div className={styles.keywordbox}>
                    <div className={styles.keywordCircle}>{data.oper_status}</div>
                    <div className={styles.keywordCircle}>{data.free === 1 ? '무료' : '유료'} </div>
                    {data.ev_charger_ === 1 ? <div className={styles.keywordCircle}>EV</div> : null}    
                </div>
                <div style = {{fontSize:14,fontWeight:400,color:'#717171', width:60, marginRight:15}}>{Math.ceil(data.distance)} m</div>  
            </div>
            <div className={styles.addressContainer}>
                    <img src="assets/icons/location.png" width="16px" height="16px" style={{margin:"0 10px 0 25px"}}/>
                    <div style = {{fontSize:13,fontWeight:400}}>{data.parking_address}</div>
                    <img src="assets/icons/cards.png" width="16px" height="16px" style={{margin:"0px 10px"}} onClick={()=>handleCopyClipBoard(data.parking_address)}/>
            </div>
            <div className={styles.latestContainer}>
                <img src="assets/icons/car.png" width="16px" height="16px" style={{marginLeft:20}}></img>
                <div style = {{fontSize:13,fontWeight:400,marginTop:15,marginBottom:15,color:'black',marginLeft:10,textDecoration:'underline',
                position:'relative'}} onClick = {
                    ()=>{setCurrent(!current)}
                }>현재 주차 현황 보기</div>
            </div> 
                {current ?  <CurrentInfo address={data.parking_address} /> : null}
            <div className={styles.line}></div>
            <div className={styles.categorybox}>
                <span style={{fontSize:13,fontWeight:400, color: `${manage?'#775EEE': 'black'}`}} onClick={()=>setManage(!manage)}>운영정보</span>
                <span style={{fontSize:13,fontWeight:400,color:`${!manage?'#775EEE': 'black'}`}} onClick={()=>setManage(!manage)}>요금정보</span>
            </div>
            <div className={styles.line}></div>
            { manage ? 
            <div className={styles.manageinfobox}>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- 전화번호 : {data.phone_no}</span>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- {data.weekday_oper_info}</span>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- {data.saturday_oper_info}</span>
                <span style={{fontSize:14,fontWeight:400,color:'black'}}>- {data.holiday_oper_info}</span>
            </div> :   <div className={styles.manageinfobox} style={{marginTop:20}}>
                <span style={{fontSize:15,fontWeight:500,color:'black'}}>- 기본 요금 : {data.basic_charge}</span>
                <span style={{fontSize:15,fontWeight:500,color:'black'}}>- 추가 요금 : {data.additional_charge !== null ?data.additional_charge : "없음"}</span>            
            </div>
            }
            
        </div> : null}
    </div>
     
);
}
export default Detail