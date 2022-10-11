import "./Cart.scss";

import { useAppSelector } from "../../redux";
import { getCartItemIds } from "../Catalog";
import { CartItem } from "../../components/CartItem";
import { Button, ModalWindow } from "../../components";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Cart: React.FC = () => {
  const cartData = useAppSelector(getCartItemIds);
  const [modalWindowIsShown, setModalWindowIsShown] = useState(false);

  const cartItems = cartData.map((item) => (
    <CartItem
      id={item.id}
      quantity={item.quantity}
      key={`cartitem-${item.id}`}
    />
  ));

  return (
    <div className="cart">
      <ModalWindow
        message="The cart is empty!"
        isShown={modalWindowIsShown}
        onClick={() => setModalWindowIsShown(false)}
      />
      <div className="items">{cartItems}</div>
      {cartData.length === 0 ? (
        <Button text="Make an order" fontSize="2.5rem" class="scale" onClick={() => setModalWindowIsShown(true)} />
      ) : (
        <Link to="/cart/order">
          <Button text="Make an order" fontSize="2.5rem" class="scale" />
        </Link>
      )}
    </div>
  );
};
