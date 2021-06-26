import { RolADM } from './rol.interface';
export interface UserADM {
  _id?: string;
  name: string;
  nametwo: string;
  lastnameone: string;
  lastnametwo: string;
  rol: RolADM;
  user: string;
  email: string;
  password: string;
  idimgData: string;
  createdAt: Date;
  updatedAt: Date;
}
