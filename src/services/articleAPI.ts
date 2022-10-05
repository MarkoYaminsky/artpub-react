import axios from "axios";

const http = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const getArticles = async (query_params?: string) => {
  const response = await http.get(
    `/articles` + query_params
  );
  
  return response.data;
};
