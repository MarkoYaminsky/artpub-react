import React, { useEffect, useState } from "react";
import { getArticleById } from "../../services";
import { IArticleGetResponse } from "../../types";
import { IItemInfo } from "../../types/IItemInfo";
import "./CartItem.scss";

import plus from "../../assets/images/plus.svg";
import minus from "../../assets/images/minus.svg";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux";
import { addItemToCart, removeItemFromCart } from "../../pages";

export const CartItem: React.FC<IItemInfo> = (props) => {
  const [cartItemInfo, setCartItemInfo] = useState<IArticleGetResponse>();
  const dispatcher = useAppDispatch();

  useEffect(() => {
    getArticleById(JSON.stringify(props.id)).then((data: IArticleGetResponse) =>
      setCartItemInfo(data)
    );
  }, [props]); 

  return (
    <div className="cartItem">
      <Link to={`/catalog/${props.id}`} className="preview">
        {cartItemInfo?.preview}
      </Link>
      <span className="info">
        {cartItemInfo?.title}, by {cartItemInfo?.author}{" "}
        {props.quantity !== 1 && `— ${props.quantity}`}
      </span>
      <p className="totalPrice">
        ${cartItemInfo?.price && cartItemInfo.price * props.quantity}
      </p>
      <div className="changeQuantity">
        <img
          src={plus}
          alt="plus"
          onClick={() => dispatcher(addItemToCart(props.id))}
        />
        <img
          src={minus}
          alt="minus"
          onClick={() => dispatcher(removeItemFromCart(props.id))}
        />
      </div>
    </div>
  );
};
