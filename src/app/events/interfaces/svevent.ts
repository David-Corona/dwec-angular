import { User } from "src/app/auth/interfaces/user";

export interface SVEvent {
  id?: number;
  title: string;
  description: string;
  price: number;
  lat: number;
  lng: number;
  address: string;
  image: string;
  date: string;
  creator?: User;
  distance?: number;
  numAttend?: number;
  attend?: boolean;
  mine?: boolean;
}
