import { atom } from "recoil";
const selectedPin = atom({
  key: "selectedPin",
  default: null,
});

export default selectedPin;
