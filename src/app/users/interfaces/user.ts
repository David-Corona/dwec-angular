export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  lat: number;
  lng: number;
  me?: boolean;
}
