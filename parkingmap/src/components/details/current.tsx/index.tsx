import React,{useState, useEffect} from 'react';
import styles from './styles.module.scss';
import { server_debug } from '../../../api';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import selectedPark from '../../../recoil/selectedPark';
import { formatTime } from '../../../utils/dateFormat';
interface curInfo {
    cur_parking : string;
    capacity: string;
}
const CurrentInfo = (props: {address : string})=>{
    const [name, setName] = useRecoilState(selectedPark)
    const [data, setData] = useState<curInfo>()
    const [date, setDate] = useState("데이터 불러오는 중입니다.")
    const fetchCurrentInfo = async () => {
        const addressInfo =props.address.split(' ')[1]
        setDate("데이터를 불러오는 중입니다.")
        setData(undefined)
        console.log(addressInfo)
        try {
          const response = await axios.get(`${server_debug}/currentinfo/${addressInfo}/${name}`);
          if (response.status === 200) {
            setDate(formatTime(new Date()))
            setData(response.data[0])
          }
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(()=>{fetchCurrentInfo()},[name]);
    return(    
    <div className={styles.latestInfoBox}>
        <div style={{marginTop:5,fontSize:16, fontWeight:400,color:'black'}}>주차 현황</div>

        <div style={{marginTop:5,fontSize:18, fontWeight:600,color:'#775EEE'}}>{data === undefined ? "로딩중" : `${data.cur_parking}/${data.capacity}`}</div>   
        <div className={styles.updateContainer}>
            <div style={{marginTop:7,fontSize:12,fontWeight:400,color:'#717171'}}>{date}</div>
            <div className={styles.icons} onClick={()=>{fetchCurrentInfo()}}>
                <img src="assets/icons/refresh.png" width="16px" height="16px" style={{marginLeft:3}}></img>
            </div>
        </div>
    </div>);
}
export default CurrentInfo;