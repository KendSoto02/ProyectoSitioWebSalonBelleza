import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Validations/AuthProvider";

const RutaPrivada = ({ path, element}) => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);

  return isLoggedIn ? (
    element
  ) : (
    <Navigate to="/AdminLogIn" replace />
  );
};

export default RutaPrivada;

