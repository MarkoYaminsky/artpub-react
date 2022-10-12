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

  const filterArticlesData = (data: IArticleGetResponse[]) => {
    const param = userInputs.searchOption;
    let filterOption: "title" | "author";
    switch (param) {
      case "byTitle":
        filterOption = "title";
        break;
      case "byAuthor":
        filterOption = "author";
        break;
      default:
        filterOption = "title";
    }

    const filteredData = data.filter((item) =>
      item[filterOption].includes(userInputs.searchInputValue)
    );

    return filteredData;
  };

  const getArticlesData = () => {
    getArticles().then((data) => {
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
  }, []);

  const sortedData = articlesData ? sortData(articlesData) : [];
  const normalizedData = filterArticlesData(sortedData);
  const articles = normalizedData.map((article) => <Article {...article} key={`article-${article.id}`} />);

  return (
    <div className="catalogPage">
      <aside>
        <input
          type="text"
          name="searchInputValue"
          value={userInputs.searchInputValue}
          onChange={handleChange}
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
