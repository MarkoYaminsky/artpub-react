import React from "react";
import "./Article.scss";
import { IArticleGetResponse } from "../../types";
import cart from "../../assets/images/shoppingCart.svg";
import { addItemToCart } from "../../pages/Catalog/Catalog.slice";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux";

export const Article: React.FC<IArticleGetResponse> = (props) => {
  const dispatcher = useAppDispatch();
  return (
    <article className="articleCard">
      <div className="inner">
        <button onClick={() => dispatcher(addItemToCart(props.id))}>
          ${props.price}
          <img src={cart} alt="" />
        </button>
        <Link to={`${props.id}`} className="content">
          <h2>{props.title}</h2>
          {props.preview}
        </Link>
        <h3>{props.author}</h3>
      </div>
    </article>
  );
};
