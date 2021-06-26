export interface Card {
  _id: string;
  type: string;
  description: string;
  price: number;
  allcard: number;
  active: boolean;
  idimgData: string;
  createdAt: Date;
  updatedAt: Date;
}
