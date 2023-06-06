import { atom } from "recoil";
const selectedPark = atom({
  key: "selectedPark",
  default: {
    parking_name: "",
    latitute: 0,
    longtitute: 0,
  },
});

export default selectedPark;
