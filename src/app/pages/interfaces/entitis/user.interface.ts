export interface User {
  _id?: string;
  name: string;
  nametwo: string;
  lastnameone: string;
  lastnametwo: string;
  rol: string;
  permissions: [string];
  user: string;
  email: string;
  password: string;
  idimgData: string;
  createdAt: Date;
  updatedAt: Date;
}
