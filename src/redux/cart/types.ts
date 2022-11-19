export type TCartItem = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
}

export interface ICartSliceState {
  totalPrice: number;
  items: TCartItem[]
}
