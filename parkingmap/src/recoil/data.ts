import { atom } from 'recoil';
interface Parking { 
  parking_name: string;
  latitude: string;
  longitude: string;
  charge: string;
  distance: number;
}

const parkingData = atom<Parking[] | null>({
  key: 'parkingData',
  default: null,
});

export default parkingData;
