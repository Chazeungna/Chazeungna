import React,{useEffect, useState} from 'react';
import KakaoMap from '../../components/KakaoMap';
import styles from './styles.module.scss';
import axios from "axios";
import { server_debug } from '../../api';
import selectedPin from '../../recoil/selectedPin';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
interface Data{
    spot_name: string;
    spot_latitude:string;
    spot_longtitude:string;
}
function Main() {
    const [data, setData] = useState<Data[]|undefined>();
    const navigate = useNavigate();
    const [selectedSpot, setSelectedSpot]= useRecoilState<Data>(selectedPin) 
    const fetchSpotList = async () => {
        await axios
          .get(`${server_debug}/spot`)
          .then(async (res) => {
            if (res.status === 200) {
            setData(res.data);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      };
    useEffect(()=>{fetchSpotList()},[])
    return (
        <div>
            <div className={styles.container}>
               <div className={styles.title}>
                CHAZEUNGNA
                </div>
                <div  className={styles.content}>
                서울시 주차 정보를 확인해요!
                </div>
                <div className={styles.imageContainer}>
                    <img src='/assets/icons/search.png' className={styles.image}/>
                    {data!==undefined && <select className={styles.search} onChange={(e:any)=>{setSelectedSpot(data[e.target.value]);navigate('/info')}}>
                        <option value="" disabled selected>장소를 선택하세요.</option>
                        {data.map((key:Data, index:number)=><option key={index} value={index} >{key.spot_name}</option>)}
                    </select>}
                </div>
                <div className={styles.mapContainer}>
                    <KakaoMap version={1}/>
                </div>
            </div>

        </div>);
}
export default Main
;