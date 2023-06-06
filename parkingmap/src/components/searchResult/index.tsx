import React from 'react';
import styles from './styles.module.scss';

const SearchResult = (props:any)=>{
    console.log(props.data)
    return(    
    <div className={styles.container}>
        {
            props.data !== undefined ? props.data.map((key:any, index:number)=><div className={styles.spot} key={index}>{key.spot_name}</div>) :null
        }
    </div>);
}
export default SearchResult;