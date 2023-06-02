import React from 'react';
import styles from './styles.module.scss';
import Detail from '../../components/details';
import "./Table.scss";

function ParkingInfo() {
    return (
    <div className={styles.container}>
        <div style={{marginTop: 30, marginBottom:20,height:"20%", fontSize:17}}>
            <span style={{fontSize: 25,fontWeight:400, color: '#775EEE'}}>홍대입구역</span>
            의 주차정보 입니다</div>
            <Detail/>
            
        {/* <div className={styles.keyinfobox}>
            <div style={{textAlign:'center', padding:15, fontSize:'1.1em',fontWeight:'500'}}>현재 근처의 주차장은 
            <span style={{color:'blue', fontSize:'1.5em', fontWeight:"600", margin:2}}> 29</span>개 있으며,<br/>평균 가격은 시간 당 
            <span style={{color:'purple', fontSize:'1.5em', fontWeight:"600", margin:2}}> 2000</span><span>원</span>
            에 형성되어 있습니다.</div>
        </div>
        <div className={styles.optionTitle}>원하는 반경을 선택하세요!</div>
        <div className={styles.buttonContainer}>
            <div className={styles.button}style={{backgroundColor:"rgba(0,0,0,0.35)"}}>500m</div>
            <div className={styles.button}style={{backgroundColor:"rgba(0,0,0,0.35)"}}>1km</div>
            <div className={styles.button}>1.5km</div>
        </div>            

        <div className={styles.optionTitle}>기타 원하는 옵션을 선택하세요!</div>
        <div className={styles.buttonContainer}>
            <div className={styles.button}>무료만!</div>
            <div className={styles.button}style={{backgroundColor:"rgba(0,0,0,0.35)"}}>전기차만!</div>
        </div>


        <select style={{margin:"15px 0 10px 270px", borderRadius:5,padding:2.3,}}>
            <option>거리순</option>
            <option>가격순</option>
            <option>주차규모순</option>
        </select>
        <div className="content" style={{marginBottom:50}}> */}
        {/* <table className="user-table">
        <thead>
          <tr>
            <th>주차장명</th>
            <th>거리</th>
            <th>가격(시간당)</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td style={{textDecoration:'underline'}}>차증나 주차장</td>
                <td>520m</td>
                <td>0원 <img src='/assets/icons/down.png' className={styles.image}/></td>
            </tr>
            <tr>
                <td style={{textDecoration:'underline'}}>아주대 주차장</td>
                <td>700m</td>
                <td>0원 <img src='/assets/icons/down.png' className={styles.image}/></td>
            </tr>
            <tr>
                <td style={{textDecoration:'underline'}}>아주대 주차장</td>
                <td>750m</td>
                <td>0원 <img src='/assets/icons/down.png' className={styles.image}/></td>
            </tr>
            <tr>
                <td style={{textDecoration:'underline'}}>아주대 주차장</td>
                <td>800m</td>
                <td>0원 <img src='/assets/icons/down.png' className={styles.image}/></td>
            </tr>

        </tbody>
      </table> */}
      {/* </div> */}
    </div>);
}
export default ParkingInfo;