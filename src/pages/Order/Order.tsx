import React, { useContext, useState } from "react";
import "./Order.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, ModalWindow } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux";
import { getCartItemIds, orderItems } from "../Catalog";
import { useNavigate } from "react-router-dom";
import { NotFound } from "../NotFound";
import { PriceContext } from "../../context";

export const Order: React.FC = () => {
  const [modalWindowIsShown, setModalWindowIsShown] = useState(false);
  const isCartEmpty = useAppSelector(getCartItemIds).length === 0;
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const context = useContext(PriceContext);

  const confirmOrder = () => {
    setModalWindowIsShown(true);
  };

  const redirectAfterOrder = () => {
    setModalWindowIsShown(false);
    dispatcher(orderItems());
    navigate("/catalog");
  };

  return !isCartEmpty ? (
    <div className="order">
      <ModalWindow
        message="Thank you for using our service! Your order is sent for processing!"
        isShown={modalWindowIsShown}
        onClick={redirectAfterOrder}
      />
      <h1>Payment details</h1>
      <Formik
        onSubmit={confirmOrder}
        initialValues={{
          name: "",
          surname: "",
          email: "",
          phoneNumber: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          subscription: false,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "* Minimum of 3 symbols")
            .max(15, "* Maximum of 15 symbols")
            .matches(/^[a-zA-Z\s]*$/, "* Only letters are allowed")
            .required("* This field is required"),
          surname: Yup.string()
            .min(3, "* Minimum of 3 symbols")
            .max(15, "* Maximum of 15 symbols")
            .matches(/^[a-zA-Z\s]*$/, "* Only letters are allowed")
            .required("* This field is required"),
          email: Yup.string()
            .email("* Must be valid e-mail")
            .required("* This field is required"),
          phoneNumber: Yup.string()
            .trim()
            .matches(
              /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
              "* Invalid / unsupported phone format"
            ),
          cardNumber: Yup.string()
            .matches(
              /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
              "* Invalid card number format (might be spaces between numbers)"
            )
            .required("* This field is required"),
          expiryDate: Yup.string()
            .matches(
              /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
              "* Invalid expiry date format"
            )
            .required("* This field is required"),
          cvv: Yup.number()
            .typeError("* Must be a number")
            .min(100, "* Invalid format")
            .max(999, "* Invalid format")
            .required("* This field is required"),
        })}
      >
        <Form>
          <div className="text">
            <div className="name">
              <Field name="name" placeholder="Name" type="text"></Field>
              <ErrorMessage name="name" component="p" className="error" />
            </div>
            <div className="surname">
              <Field name="surname" placeholder="Surname" type="text"></Field>
              <ErrorMessage name="surname" component="p" className="error" />
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
            <div className="creditCard">
              <div className="cardNumber">
                <Field
                  name="cardNumber"
                  placeholder="Card number"
                  type="text"
                ></Field>
                <ErrorMessage
                  name="cardNumber"
                  component="p"
                  className="error"
                />
              </div>
              <div className="dateAndCvv">
                <div className="expiryDate">
                  <Field
                    name="expiryDate"
                    placeholder="Expiry date"
                    type="text"
                  ></Field>
                  <ErrorMessage
                    name="expiryDate"
                    component="p"
                    className="error"
                  />
                </div>
                <div className="cvv">
                  <Field name="cvv" placeholder="CVV" type="text"></Field>
                  <ErrorMessage name="cvv" component="p" className="error" />
                </div>
              </div>
            </div>
          </div>
          <label>
            <Field name="subscription" type="checkbox"></Field>
            Subscribe to our newsletter
          </label>
          <p className="totalPrice">Total price: ${context?.totalPrice}</p>
          <Button
            text="Confirm order"
            fontSize="3rem"
            type="submit"
            class="scale"
          />
        </Form>
      </Formik>
    </div>
  ) : (
    <NotFound />
  );
};
