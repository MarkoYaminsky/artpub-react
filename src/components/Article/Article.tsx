import React from "react";
import "./Article.scss";
import { IArticleGetResponse } from "../../types";

export const Article: React.FC<IArticleGetResponse> = (props) => {
  return (
    <article className="articleCard">
      <div className="inner">
        <span>${props.price}</span>
        <div className="content">
          <h2>{props.title}</h2>
          {props.preview}
        </div>
        <h3>{props.author}</h3>
      </div>
    </article>
  );
};
