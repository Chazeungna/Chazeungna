import React from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
const SearchResult = (props:any)=>{
    const navigate = useNavigate();
    console.log(props.data)
    return(    
    <div className={styles.container}>
        <div style={{marginLeft:"78vw", marginTop:10}} onClick={()=>props.setOpen(false)}>닫기</div>
        {
            props.data !== undefined ? props.data.map((key:any, index:number)=><div className={styles.spot} key={index} onClick={()=>navigate('/info',{state : key.spot_name})}>{key.spot_name}</div>) :null
        }
    </div>);
}
export default SearchResult;