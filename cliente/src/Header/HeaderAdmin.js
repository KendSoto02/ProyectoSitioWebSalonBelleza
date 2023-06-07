import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../LandingPage/Header/HeaderLandingPage.css";

const Header = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleMouseEnter = () => {
    setShowSubMenu(true);
  };

  const handleMouseLeave = () => {
    setShowSubMenu(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/">
          <img src="img/img-4.png" alt="Logo de la empresa" />
        </a>
      </div>
      <nav className="navigation">
        <ul className="menu">
          <li>
            <Link to="/admin">Citas Registradas</Link>
          </li>
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <a>Agregar</a>
            {showSubMenu && (
              <ul className="submenu">
                <li>
                  <Link to="/agregar-servicio">Servicio</Link>
                </li>
                <li>
                  <Link to="/agregar-producto">Producto</Link>
                </li>
              </ul>
            )}
          </li>
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <a>Ver</a>
            {showSubMenu && (
              <ul className="submenu">
                <li>
                  <Link to="/ver-servicio">Servicios</Link>
                </li>
                <li>
                  <Link to="/ver-producto">Productos</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/AdminLogIn">Salir</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
