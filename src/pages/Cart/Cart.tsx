import "./Cart.scss";

import { useAppSelector } from "../../redux";
import { getCartItemIds } from "../Catalog";
import { CartItem } from "../../components/CartItem";

export const Cart: React.FC = () => {
  const cartData = useAppSelector(getCartItemIds);
  const cartItems = cartData.map((item) => (
    <CartItem id={item.id} quantity={item.quantity} key={`cartitem-${item.id}`} />
  ));

  return <div className="cart">
    <div className="items">
      {cartItems}
    </div>
  </div>;
};
