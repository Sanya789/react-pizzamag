import { TCartItem } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLockalStorage = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
const totalPrice = calcTotalPrice(items)
return {
  items: items as TCartItem[],
  totalPrice,
};
}
