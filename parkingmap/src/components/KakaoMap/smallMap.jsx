import React, { useEffect, useState } from "react";
import axios from "axios";
import { server_debug } from "../../api";
import {useRecoilState} from 'recoil';
import selectedPin from "../../recoil/selectedPin";
export default function SmallMapComponent() {
  const [data, setData] = useState([]);
  const [selectedSpot, setSelectedSpot] = useRecoilState(selectedPin);
  const fetchSpotList = async () => {
    try {
      const response = await axios.get(`${server_debug}/parkingspot/${selectedSpot.spot_name}`);
      if (response.status === 200) {
        console.log(response.data)
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createMarkers = () => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(selectedSpot.spot_latitude, selectedSpot.spot_longitude),
        level: 7,
      };

      const map = new window.kakao.maps.Map(container, options);

      data.forEach((el) => {
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(
            el.latitude,
            el.longitude
          ),
          title: el.parking_name,
        });
        window.kakao.maps.event.addListener(marker, "click", () => {
          console.log(el)
        });
        
      });
    }
  };

  useEffect(() => {
    fetchSpotList();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      createMarkers();
    }
  }, [data]);

  return (
    <div id="map" style={{ width: "85vw", height: "30vh", borderRadius: 10 }}>
    </div>
  );
}
