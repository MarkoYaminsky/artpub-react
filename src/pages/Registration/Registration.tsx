import "./Registration.scss";
import { Formik, Field, ErrorMessage, Form } from "formik";
import React, { useContext, useState } from "react";
import { Button, ModalWindow } from "../../components";
import { AppContext } from "../../context";
import * as Yup from "yup";
import { registerOrLoginAccount } from "../../services/authenticationAPI";
import { IUser } from "../../types/IUser";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Registration: React.FC = () => {
  const context = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalWindowShown, setIsModalWindowShown] = useState(false);
  const navigate = useNavigate();

  context?.logout();

  const tryLogin = (values: IUser) => {
    registerOrLoginAccount("registration", values)
      .then((response) => {
        if (response.status === 201) {
          localStorage.setItem(
            "artpubAuthCredentials",
            JSON.stringify(response.data)
          );
          context?.login();
          navigate("/");
        }
      })
      .catch((e: AxiosError) => {
        console.log(e);

        setErrorMessage("User with this username already exists");
        setIsModalWindowShown(true);
      });
  };

  return (
    <div className="registration">
      <ModalWindow
        message={`Error: ${errorMessage}`}
        isShown={isModalWindowShown}
        onClick={() => setIsModalWindowShown(false)}
      />
      <h1>Register account</h1>
      <Formik
        onSubmit={(values) =>
          tryLogin({ username: values.username, password: values.password })
        }
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, "* Minimum of 3 symbols")
            .max(20, "* Maximum of 20 symbols")
            .matches(/[a-zA-Z0-9_ ]/, "No special symbols allowed!")
            .required("* This field is required"),
          password: Yup.string()
            .required("* This field is required")
            .min(8, "* Password must be at least 8 characters long")
            .matches(
              /^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$$/,
              "* Password should contain 1 of both lowercase, uppercase and special symbols, and 1 digit"
            ),
          confirmPassword: Yup.string()
            .required("* This field is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
        })}
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
            <ErrorMessage
              name="confirmPassword"
              component="p"
              className="error"
            />
          </div>
          <div className="password">
            <Field
              name="confirmPassword"
              placeholder="Confirm password"
              type="password"
            ></Field>
            <ErrorMessage
              name="confirmPassword"
              component="p"
              className="error"
            />
          </div>
          <Button text="Submit" fontSize="3rem" type="submit" class="scale" />
        </Form>
      </Formik>
      <h2>
        Already have an account? <Link to="/login">Sign in</Link>
      </h2>
    </div>
  );
};
