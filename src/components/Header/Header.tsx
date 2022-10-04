import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

export const Header: React.FC = (p) => {
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
          <span>Cart</span>
        </Link>
        <Link to="/contact">
          <span>Contact us</span>
        </Link>
      </nav>
    </header>
  );
};
