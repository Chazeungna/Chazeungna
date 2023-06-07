import React,{ useState } from 'react';
import Slider from 'react-slider'
import styles from './styles.module.scss';

const MIN = 0;
const MAX = 3000; 

const FilteringBox = ()=>{
    const [ values, setValues]= useState([MIN,MAX])
    // console.log('values: ',values)
    const [selectedRadius, setSelectedRadius] = useState(null);

    const handleRadiusSelection = (radius:any) => {
      setSelectedRadius(radius);
    };
  
    const radiusOptions = [0.5, 1, 1.5];
    return(    
        <div className={styles.container}>        
    <div className={styles.filterbox}>
    <div>
          <div style={{ textAlign: 'center', padding: 15, fontSize: 16, fontWeight: 500 }}>원하는 반경을 선택하세요</div>
          <div className={styles.buttonContainer}>
            {radiusOptions.map((radius) => (
              <div
                key={radius}
                className={styles.button}
                style={{backgroundColor: selectedRadius === radius? '#775EEE':''}}
                onClick={() => handleRadiusSelection(radius)}
              >
                {`${radius}km`}
              </div>
            ))}
          </div>
        </div>

            <div style={{marginTop:20,marginBottom:10,flexDirection:'row',display:'flex',justifyContent:'center'}}>
                <div>
                    <div style={{textAlign:'center',padding:15,fontSize:16,fontWeight:500}}>요일을 선택하세요</div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.button}>평일</div>
                        <div className={styles.button}>주말</div>
                    </div>
                </div>
                <div>
                    <div style={{textAlign:'center',padding:15,fontSize:16,fontWeight:500}}>전기차 충전소</div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.button}>있음</div>
                    </div>
                </div>
            </div>

            <div className={styles.pricerangebox}>
                <div style={{textAlign:'center',padding:15,fontSize:16,fontWeight:500}}>원하는 요금 범위를 설정하세요
                </div>

                <div style={{width:271}}>
                    <input type="range" min="0"max="10000" value="0" ></input>
                </div>
                {/* <Slider className={"slider"} 
                    onChange={setValues}
                    value={values} 
                    min={MIN}
                    max={MAX}/>
                 */}
                

            </div> 

            <div style={{marginTop:20}}>
                <div className={styles.applybutton}>
                    적용
                </div>
            </div>
        </div>
    </div>
    
   
   
   
   
   
   
    
    
        );
}
export default FilteringBox;