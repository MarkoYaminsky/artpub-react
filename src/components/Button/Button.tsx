import React, { MouseEventHandler } from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  fontSize: string;
  href?: string;
  class?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      className={props.class ? props.class + " button" : "button"}
      style={{
        fontSize: props.fontSize,
      }}
      type={props.type || "button"}
      onClick={props.onClick ? props.onClick : () => null}
    >
      {props.text}
    </button>
  );
};