import { User } from "src/app/auth/interfaces/user";

export interface SvComment {
  comment: string;
  date?: string;
  id?: number;
  user?: User;
}
