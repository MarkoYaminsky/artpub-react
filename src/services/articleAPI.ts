import axios from "axios";

const http = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getArticles = async () => {
  const response = await http.get("/articles/");

  return response.data;
};

export const getArticleById = async (id: string) => {
  const response = await http.get(`/articles/${id}`);

  return response.data;
};
