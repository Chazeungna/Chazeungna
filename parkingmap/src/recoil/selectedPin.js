import { atom } from "recoil";
const selectedPin = atom({
  key: "selectedPin",
  default: {
    spot_name: "",
    spot_latitute: 0,
    spot_longtitute: 0,
  },
});

export default selectedPin;
