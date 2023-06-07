import React, { useState, useEffect } from 'react';
import Slider from 'react-slider';
import styles from './styles.module.scss';
import { server_debug } from '../../api';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import parkingData from '../../recoil/data';
interface Parking { 
    parking_name: string;
    latitude: string;
    longitude: string;
    charge: string;
    distance: number;
  }
const FilteringBox = (props:any) => {
  const [MIN, setMIN] = useState<number | null>(null);
  const [MAX, setMAX] = useState<number | null>(null);
  const [sliderRendered, setSliderRendered] = useState(false);
  const [data, setData] = useRecoilState<Parking[] | null>(parkingData)
  const getMinmaxInfo = async () => {
    try {
      const response = await axios.get(`${server_debug}/filterinfo`);
      if (response.status === 200) {
        setMIN(Number(response.data[0].min));
        setMAX(Number(response.data[0].max));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFilteringResult = async (day: number, ev:boolean, min:number, max:number,distance: number) => {
    try {
      const response = await axios.get(`${server_debug}/filterinfo/info?day=${day}&distance=${distance}&min=${min}&max=${max}&ev=${ev}`);
      if (response.status === 200) {
        setData(response.data)

      }
    } catch (error) {
      console.log(error);
    }
  };
  const [selectedRadius, setSelectedRadius] = useState(null);
  const handleRadiusSelection = (radius: any) => {
    setSelectedRadius(radius);
  };

  useEffect(() => {
    getMinmaxInfo();
  }, []);

  useEffect(() => {
    if (MIN !== null && MAX !== null) {
      setSliderRendered(true);
    }
  }, [MIN, MAX]);

  const radiusOptions = [0.5, 1, 1.5];
  const [values, setValues] = useState<number[]>([MIN || 0, MAX || 0]);
  const [day, setDay] = useState<number>(-1)
  const [ev, setEv] = useState<boolean>(false);
  const onClickhandler = (day: number, ev:boolean, min:number, max:number, distance: number|null)=>{
    if (day == -1){
        alert("평일, 주말을 선택하세요.");
    } 
    if (distance === null){
        alert("반경 정보를 선택하세요.");
    } 
    if (day!==-1 && distance!==null){
        fetchFilteringResult(day, ev, min, max, 1000*distance);
        props.setfilter(false);
    }

  }
  return (
    <div className={styles.container}>
      <div className={styles.filterbox}>
        <div>
          <div style={{ textAlign: 'center', padding: 15, fontSize: 16, fontWeight: 500 }}>
            원하는 반경을 선택하세요
          </div>
          <div className={styles.buttonContainer}>
            {radiusOptions.map((radius) => (
              <div
                key={radius}
                className={styles.button}
                style={{ backgroundColor: selectedRadius === radius ? '#775EEE' : '' }}
                onClick={() => handleRadiusSelection(radius)}
              >
                {`${radius}km`}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20, marginBottom: 10, flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
          <div>
            <div style={{ textAlign: 'center', padding: 15, fontSize: 16, fontWeight: 500 }}>요일을 선택하세요</div>
            <div className={styles.buttonContainer}>
              <div className={styles.button} style={{ backgroundColor: day===0 ? '#775EEE' : '' }} onClick={()=>setDay(0)}>평일</div>
              <div className={styles.button}  style={{ backgroundColor: day===1 ? '#775EEE' : '' }} onClick={()=>setDay(1)}>주말</div>
            </div>
          </div>
          <div>
            <div style={{ textAlign: 'center', padding: 15, fontSize: 16, fontWeight: 500 }}>전기차 충전소</div>
            <div className={styles.buttonContainer}>
            <div className={styles.button}  style={{ backgroundColor: ev ? '#775EEE' : '' }} onClick={()=>setEv(!ev)}>있음</div>
            </div>
          </div>
        </div>

        {sliderRendered && (
          <div>
            <div style={{ textAlign: 'center', padding: 15, fontSize: 16, fontWeight: 500 }}>
              원하는 요금 범위를 설정하세요
				<div style={{marginTop:10,fontWeight:600}}>{values[0]} 원 ~ {values[1]} 원 </div>
            </div>
            <Slider
              className={styles.slider}
              thumbClassName={styles.thumb}
              onChange={(values) => setValues(values)}
              value={values}
              min={MIN || 0}
              max={MAX || 0}
            />
          </div>
        )}



        <div style={{ marginTop: 20 }}>
          <div className={styles.applybutton} onClick={()=>onClickhandler(day, ev,values[0], values[1], selectedRadius)}>적용</div>
        </div>
      </div>
    </div>
  );
};

export default FilteringBox;