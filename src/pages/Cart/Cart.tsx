import "./Cart.scss";

import { useAppSelector } from "../../redux";
import { getCartItemIds } from "../Catalog";
import { CartItem } from "../../components/CartItem";
import { Button, ModalWindow, WithAuth } from "../../components";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../context";

const CartComponent: React.FC = () => {
  const cartData = useAppSelector(getCartItemIds);
  const [modalWindowIsShown, setModalWindowIsShown] = useState(false);
  const context = useContext(AppContext);

  const getTotalPrice = () => {
    const allPrices = Array.from(document.querySelectorAll(".totalPrice"));
    let totalPrice = 0;
    allPrices.forEach(
      (price) => (totalPrice += parseInt(price.innerHTML.slice(1)))
    );;

    return totalPrice;
  };

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
        <Button
          text="Make an order"
          fontSize="2.5rem"
          class="scale"
          onClick={() => setModalWindowIsShown(true)}
        />
      ) : (
        <Link to="/cart/order">
          <Button
            text="Make an order"
            fontSize="2.5rem"
            class="scale"
            onClick={() => context?.setTotalPrice(getTotalPrice())}
          />
        </Link>
      )}
    </div>
  );
};

export const Cart: React.FC = () => <WithAuth><CartComponent /></WithAuth>
