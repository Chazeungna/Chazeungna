import React, { useState, useEffect } from 'react';
import Slider from 'react-slider';
import styles from './styles.module.scss';
import { server_debug } from '../../api';
import axios from 'axios';

const FilteringBox = () => {
  const [MIN, setMIN] = useState<number | null>(null);
  const [MAX, setMAX] = useState<number | null>(null);
  const [sliderRendered, setSliderRendered] = useState(false);

  const getMinmaxInfo = async () => {
    try {
      const response = await axios.get(`${server_debug}/filterinfo`);
      if (response.status === 200) {
        console.log(response.data);
        setMIN(Number(response.data[0].min));
        setMAX(Number(response.data[0].max));
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
              <div className={styles.button}>평일</div>
              <div className={styles.button}>주말</div>
            </div>
          </div>
          <div>
            <div style={{ textAlign: 'center', padding: 15, fontSize: 16, fontWeight: 500 }}>전기차 충전소</div>
            <div className={styles.buttonContainer}>
              <div className={styles.button}>있음</div>
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
          <div className={styles.applybutton}>적용</div>
        </div>
      </div>
    </div>
  );
};

export default FilteringBox;