import { atom } from "recoil";
const selectedPark = atom({
  key: "selectedPark",
  default: null,
});

export default selectedPark;
