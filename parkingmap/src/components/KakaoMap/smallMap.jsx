import React, { useEffect, useState } from "react";
import axios from "axios";
import { server_debug } from "../../api";
import {useRecoilState} from 'recoil';
import selectedPin from "../../recoil/selectedPin";
import selectedPark from "../../recoil/selectedPark";
export default function SmallMapComponent() {
  const [data, setData] = useState([]);
  const [selectedSpot, setSelectedSpot] = useRecoilState(selectedPin);
  const [selectedParking,setSelectedPark] = useRecoilState(selectedPark);
  const fetchSpotList = async () => {
    try {
      const response = await axios.get(`${server_debug}/parkingspot/${selectedSpot.spot_name}`);
      if (response.status === 200) {
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
      const centerMarker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(selectedSpot.spot_latitude, selectedSpot.spot_longitude),
        title: "Center",
        image: new window.kakao.maps.MarkerImage(
          "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          new window.kakao.maps.Size(30, 30),
          { offset: new window.kakao.maps.Point(15, 15) }
        )
      });
  
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
          setSelectedPark(el.parking_name);
          });
        const content = `<div style="background: #fff; padding: 10px; font-size:15px; text-align:center; width:130px;
        ">
        ${el.parking_name}
      </div>`;

        var infowindow = new window.kakao.maps.InfoWindow({
          content: content // 인포윈도우에 표시할 내용
      });
        window.kakao.maps.event.addListener(marker, 'touchstart', makeOverListener(map, marker, infowindow));
        window.kakao.maps.event.addListener(marker, 'touchend', makeOutListener(infowindow));
      });
            
    }
  };
  function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}
function makeOutListener(infowindow) {
  return function() {
      infowindow.close();
  };
}
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
