import React,{useEffect, useState} from 'react';
import KakaoMap from '../../components/KakaoMap';
import styles from './styles.module.scss';
import SearchResult from '../../components/searchResult';
import axios from "axios";
import debounce from 'lodash/debounce';
import { server_debug } from '../../api';
function Main() {
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState("")
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
    const [openSearch, setOpensearch] = useState(false);
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
                    <input className={styles.search} placeholder='장소를 입력하세요.' onChange={(e)=>setInputValue(e.target.value)} onClick={()=>setOpensearch(true)}/>
                    {
                        openSearch ? <SearchResult data={data} setOpen={setOpensearch}/> : null
                    }
                </div>
                <div className={styles.mapContainer}>
                    <KakaoMap version={1}/>
                </div>
            </div>

        </div>);
}
export default Main
;