import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux";
import { getCartItemIds } from "../../pages";

export const Header: React.FC = () => {
  const cartItems = useAppSelector(getCartItemIds);
  let cartItemsQuantity = 0;
  cartItems.forEach((item) => {
    cartItemsQuantity += item.quantity;
  });

  return (
    <header>
      <nav className="landing">
        <Link to="/">
          <span>Home</span>
        </Link>
      </nav>
      <nav className="pages">
        <Link to="/catalog">
          <span>Catalog</span>
        </Link>
        <Link to="/cart">
          <span>
            Cart {cartItemsQuantity !== 0 && `(${cartItemsQuantity})`}
          </span>
        </Link>
        <Link to="/contact">
          <span>Contact us</span>
        </Link>
      </nav>
    </header>
  );
};
