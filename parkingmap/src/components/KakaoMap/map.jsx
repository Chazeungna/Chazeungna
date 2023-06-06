import React, { useEffect, useState } from "react";
import axios from "axios";
import { server_debug } from "../../api";
import {useRecoilState} from 'recoil';
import { useNavigate } from "react-router-dom";
import selectedPin from "../../recoil/selectedPin";
export default function MapComponent() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [selectedSpot, setSelectedSpot] = useRecoilState(selectedPin);
  const fetchSpotList = async () => {
    try {
      const response = await axios.get(`${server_debug}/spot`);
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
        center: new window.kakao.maps.LatLng(37.531394, 126.982999),
        level: 8,
      };

      const map = new window.kakao.maps.Map(container, options);

      data.forEach((el) => {
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(
            el.spot_latitude,
            el.spot_longitude
          ),
          title: el.spot_name,
        });
        window.kakao.maps.event.addListener(marker, "click", () => {
          setSelectedSpot(el);
          navigate('/info')
          console.log(el)
        });
        const content = `<div style="background: #fff; padding: 10px; font-size:15px; text-align:center; width:130px;
        ">
        ${el.spot_name}
      </div>`;

        var infowindow = new window.kakao.maps.InfoWindow({
          content: content // 인포윈도우에 표시할 내용
      });
        window.kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        window.kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
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
    <div id="map" style={{ width: "92%", height: "94%", borderRadius: 20, cursor:'pointer' }}>
    </div>
  );
}
