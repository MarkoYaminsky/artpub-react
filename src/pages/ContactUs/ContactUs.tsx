import React, { useState } from "react";
import "./ContactUs.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, ModalWindow } from "../../components";

export const ContactUs: React.FC = () => {
  const [modalWindowIsShown, setModalWindowIsShown] = useState(false);

  return (
    <div className="contactUs">
      <ModalWindow
        message="Thank you for your feedback! We will text you soon"
        isShown={modalWindowIsShown}
        onClick={() => setModalWindowIsShown(false)}
      />
      <h1>Contact Us</h1>
      <Formik
        onSubmit={() => setModalWindowIsShown(true)}
        initialValues={{
          fullName: "",
          email: "",
          phoneNumber: "",
          subscription: false,
          message: "",
        }}
        validationSchema={Yup.object({
          fullName: Yup.string()
            .min(6, "* Minimum of 6 symbols")
            .max(30, "* Maximum of 30 symbols")
            .matches(/^[a-zA-Z\s]*$/, "* Invalid format")
            .required("* This field is required"),
          email: Yup.string()
            .email("* Must be valid e-mail")
            .required("* This field is required"),
          phoneNumber: Yup.string().matches(
            /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
            "* Invalid format"
          ),
        })}
      >
        <Form>
          <div className="text">
            <div className="fullname">
              <Field
                name="fullName"
                placeholder="Full name"
                type="text"
              ></Field>
              <ErrorMessage name="fullName" component="p" className="error" />
            </div>
            <div className="email">
              <Field name="email" placeholder="E-mail" type="text"></Field>
              <ErrorMessage name="email" component="p" className="error" />
            </div>
            <div className="phoneNumber">
              <Field
                name="phoneNumber"
                placeholder="Phone (optional)"
                type="text"
              ></Field>
              <ErrorMessage
                name="phoneNumber"
                component="p"
                className="error"
              />
            </div>
            <Field
              name="message"
              component="textarea"
              placeholder="Message"
            ></Field>
          </div>
          <label>
            <Field name="subscription" type="checkbox"></Field>
            Subscribe to our newsletter
          </label>
          <Button text="Submit" fontSize="3rem" type="submit" class="scale" />
        </Form>
      </Formik>
    </div>
  );
};
