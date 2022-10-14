import axios from "axios";

interface IUser {
  username: string;
  password: string;
}

const http = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const registerOrLoginAccount = async (option: "registration" | "login", data: IUser) => {
  const response = await http.post(`/user/${option}`, {
    username: data.username,
    password: data.password,
  });

  return response;
};
 

