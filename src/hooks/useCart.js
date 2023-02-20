import { AppContext } from "../store/app-context";
import { useContext } from "react";

export const useCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext);
  // console.log(cartItems);
  const price = cartItems.reduce(
    (sum, obj) => parseFloat(obj.price) * parseFloat(obj.amount) + sum,
    0
  );
  return { cartItems, setCartItems, price };
};
