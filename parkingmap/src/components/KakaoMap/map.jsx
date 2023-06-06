import React, { useEffect, useState } from "react";
import axios from "axios";
import { server_debug } from "../../api";

export default function MapComponent() {
  const [data, setData] = useState([]);

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
        new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(
            el.spot_latitude,
            el.spot_longitude
          ),
          title: el.spot_name,
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
    <div id="map" style={{ width: "95%", height: "95%", borderRadius: 20 }}></div>
  );
}
