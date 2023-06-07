import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import HeaderLandingPage from "../LandingPage/Header/HeaderLandingPage";
import { AuthContext } from "../Validations/AuthProvider";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de credenciales
    if (username === "Lady" && password === "1") {
      setErrorMessage("");
      setUsername("");
      setPassword("");
      login();
      navigate("/admin");
    } else {
      setErrorMessage("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div> 
      <HeaderLandingPage/>
      <div className="login-form">
        <div className="login-card">
          <img src="img/img-4.png" alt="Imagen de inicio de sesión" className="login-image" />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Usuario:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div className="password">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
