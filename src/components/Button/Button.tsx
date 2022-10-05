import React from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  fontSize: string;
  href?: string;
  class?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      className={props.class ? props.class + " button" : "button"}
      style={{
        fontSize: props.fontSize,
      }}
      type={props.type || "button"}
    >
      {props.text}
    </button>
  );
};