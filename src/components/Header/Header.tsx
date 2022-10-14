import React, { useContext } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux";
import { getCartItemIds } from "../../pages";
import logout from "../../assets/images/logout.svg"
import { AppContext } from "../../context";

export const Header: React.FC = () => {
  const cartItems = useAppSelector(getCartItemIds);
  let cartItemsQuantity = 0;
  const context = useContext(AppContext);

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
        <img src={logout} alt="" onClick={() => context?.logout()} />
      </nav>
    </header>
  );
};
