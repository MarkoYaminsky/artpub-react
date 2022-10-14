import React, { ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context";

interface IWithAuthProps {
  children: ReactElement;
}

export const WithAuth: React.FC<IWithAuthProps> = (props) => {
  const context = useContext(AppContext);
  const credentials = localStorage.getItem("artpubAuthCredentials");
  
  if (!credentials) {
    context?.logout();
  }

  return !context?.isAuthenticated ? (
    <Navigate to="/login" />
  ) : (
    <>{props.children}</>
  );
};
