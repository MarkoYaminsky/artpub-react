import React, { ChangeEvent, useEffect, useState } from "react";
import "./Catalog.scss";
import { getArticles } from "../../services";
import { IArticleGetResponse } from "../../types";
import { Article } from "../../components";

export const Catalog: React.FC = () => {
  const [articlesData, setArticlesData] = useState<IArticleGetResponse[]>();
  const initialInputs = {
    searchInputValue: "",
    searchOption: "byTitle",
    sortOption: "byDate",
  };
  const [userInputs, setUserInputs] = useState(initialInputs);

  const getParams = () => {
    const param = userInputs.searchOption;
    let query;
    switch (param) {
      case "byTitle":
        query = `?title=${userInputs.searchInputValue}`;
        break;
      case "byAuthor":
        query = `?author=${userInputs.searchInputValue}`;
        break;
      default:
        query = "";
    }
    return query;
  };

  const sortData = (data: IArticleGetResponse[]) => {
    const sortOption = userInputs.sortOption;
    let sortingProperty: "title" | "author" | "price" | "id";
    switch (sortOption) {
      case "byTitle":
        sortingProperty = "title";
        break;
      case "byAuthor":
        sortingProperty = "author";
        break;
      case "byPrice":
        sortingProperty = "price";
        break;
      default:
        sortingProperty = "id";
    }

    const sortedData =
      sortingProperty !== "id"
        ? data.sort((a: IArticleGetResponse, b: IArticleGetResponse) =>
            a[sortingProperty] > b[sortingProperty] ? 1 : -1
          )
        : data.reverse();
    return sortedData;
  };

  const getArticlesData = () => {
    const params = getParams();
    getArticles(params).then((data) => {
      setArticlesData(data);
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setUserInputs((prevState) => {
      return { ...prevState, [target.name]: target.value };
    });
    if (target.name !== "searchInputValue") {
      getArticlesData();
    }
  };

  useEffect(() => {
    getArticlesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let typingTimer: ReturnType<typeof setTimeout>;
  const typingHandle = {
    out: () => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => getArticlesData(), 700);
    },
    in: () => {
      clearTimeout(typingTimer);
    },
  };

  
  const sortedData = articlesData ? sortData(articlesData) : [];
  const articles = sortedData.map((article) => (
    <Article key={article.id} {...article} />
  ));

  return (
    <div className="catalogPage">
      <aside>
        <input
          type="text"
          name="searchInputValue"
          value={userInputs.searchInputValue}
          onChange={handleChange}
          onKeyDown={typingHandle.in}
          onKeyUp={typingHandle.out}
          placeholder="Search..."
        />
        <h2>Search by</h2>
        <ul className="radioInputs search">
          <li>
            <label>
              <input
                type="radio"
                name="searchOption"
                checked={"byTitle" === userInputs.searchOption}
                value="byTitle"
                onChange={handleChange}
              />
              Title
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="searchOption"
                checked={"byAuthor" === userInputs.searchOption}
                value="byAuthor"
                onChange={handleChange}
              />
              Author
            </label>
          </li>
        </ul>
        <h2>Sort by</h2>
        <ul className="radioInputs sort">
          <li>
            <label>
              <input
                type="radio"
                name="sortOption"
                checked={"byDate" === userInputs.sortOption}
                value="byDate"
                onChange={handleChange}
              />
              Date
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="sortOption"
                checked={"byTitle" === userInputs.sortOption}
                value="byTitle"
                onChange={handleChange}
              />
              Title
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="sortOption"
                checked={"byAuthor" === userInputs.sortOption}
                value="byAuthor"
                onChange={handleChange}
              />
              Author
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="sortOption"
                checked={"byPrice" === userInputs.sortOption}
                value="byPrice"
                onChange={handleChange}
              />
              Price
            </label>
          </li>
        </ul>
      </aside>
      <section className="catalog">{articles}</section>
    </div>
  );
};
