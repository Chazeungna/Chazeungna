import React from 'react';
import styles from '../info/styles.module.scss';
import FilteringBox from '../../components/filter';
import { useNavigate } from 'react-router-dom';
function Filter() {
    const navigate = useNavigate();
    return (
    <div style={{marginTop:20}}> 
        <div className={styles.filterbutton} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100vw'}}>
            <img src="assets/icons/filter.png" width={"67px"} height={"34px"} style={{marginLeft:'5vw'}}></img>
            <div style={{marginRight:'5vw'}} onClick={()=>navigate('/info')}>닫기</div>
        </div>       
        <FilteringBox/>
    </div>

    
    );
}
export default Filter