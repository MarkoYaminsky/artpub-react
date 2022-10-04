import "./ModalWindow.scss";
import React, { MouseEventHandler } from "react";

interface IModalWindowProps {
  message: string;
  isShown: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ModalWindow:React.FC<IModalWindowProps> = (props: IModalWindowProps) => {
  return (
    <div className={props.isShown ? "modalWindow isShown" : "modalWindow"} id="modal">
      <div className={props.isShown ? "curtain isShown" : "curtain"}></div>
      <p>{props.message}</p>
      <button onClick={props.onClick}>OK</button>
    </div>
  );
}