import "./Login.scss";
import { Formik, Field, ErrorMessage, Form } from "formik";
import React, { useContext, useState } from "react";
import { Button, ModalWindow } from "../../components";
import { AppContext } from "../../context";
import { registerOrLoginAccount } from "../../services/authenticationAPI";
import { IUser } from "../../types/IUser";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const context = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalWindowShown, setIsModalWindowShown] = useState(false);
  const navigate = useNavigate();

  context?.logout()

  const tryLogin = (values: IUser) => {
    registerOrLoginAccount("login", values)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem(
            "artpubAuthCredentials",
            JSON.stringify(response.data)
          ); 
          context?.login();
          navigate("/");
        }
      })
      .catch((e: AxiosError) => {
        setErrorMessage(e.response?.data as string);
        setIsModalWindowShown(true);
      });
  };

  return (
    <div className="login">
      <ModalWindow
        message={`Error: ${errorMessage}`}
        isShown={isModalWindowShown}
        onClick={() => setIsModalWindowShown(false)}
      />
      <h1>Log into account</h1>
      <Formik
        onSubmit={(values) => tryLogin(values)}
        initialValues={{
          username: "",
          password: "",
        }}
      >
        <Form>
          <div className="username">
            <Field name="username" placeholder="Username" type="text"></Field>
            <ErrorMessage name="username" component="p" className="error" />
          </div>
          <div className="password">
            <Field
              name="password"
              placeholder="Password"
              type="password"
            ></Field>
            <ErrorMessage name="password" component="p" className="error" />
          </div>
          <Button text="Submit" fontSize="3rem" type="submit" class="scale" />
        </Form>
      </Formik>
      <h2>Doesn't have an account yet? <Link to="/registration">Sign up</Link></h2>
    </div>
  );
};
