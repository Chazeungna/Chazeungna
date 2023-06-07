import { atom } from "recoil";
interface Data{
  spot_name: string;
  spot_latitude:string;
  spot_longtitude:string;
}
const selectedPin = atom<Data>({
  key: "selectedPin",
  default: {
    spot_name: "",
    spot_latitude: "",
    spot_longtitude: "",
  },
});

export default selectedPin;
