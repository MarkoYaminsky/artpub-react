import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components";
import { getArticleById } from "../../services";
import { IArticleGetResponse } from "../../types";
import { NotFound } from "../NotFound";
import "./Item.scss";
import heartSub from "../../assets/images/heartSub.svg";
import heartUnsub from "../../assets/images/heartUnsub.svg";
import { useAppDispatch } from "../../redux";
import { addItemToCart } from "../Catalog";

export const Item: React.FC = () => {
  const [articleData, setArticleData] = useState<IArticleGetResponse>();
  const [isSuccessful, setIsSuccessful] = useState<boolean>();
  const [isFavorite, setIsFavorite] = useState<boolean>();
  const { articleId } = useParams();
  const dispatcher = useAppDispatch();

  useEffect(() => {
    getArticleById(articleId!)
      .then((data) => setArticleData(data))
      .then(() => setIsSuccessful(true))
      .catch(() => setIsSuccessful(false));
  }, [articleId]);

  return (
    <div className="item">
      {isSuccessful ? (
        <div className="success">
          <aside className="preview">
            <p>{articleData?.preview}</p>
          </aside>
          <main>
            <div className="priceBlock">
              <h2>Price - ${articleData?.price}</h2>
              <div className="buttons">
                <Button text="Buy now" fontSize="1.2rem" class="scale" onClick={() => dispatcher(addItemToCart(parseInt(articleId!)))}/>
                <img
                  src={isFavorite ? heartSub : heartUnsub}
                  alt="heart"
                  className="heart"
                  onClick={() => setIsFavorite((prevState) => !prevState)}
                />
              </div>
            </div>
            <div className="infoBlock">
              <h1>{articleData?.title}</h1>
              <div className="author">
                <h2>Created by {articleData?.author}</h2>
                <Button text="Subscribe" fontSize="1.1rem" class="scale" />
              </div>
            </div>
          </main>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};
