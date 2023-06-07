import React from "react";
import { Link } from "react-router-dom";
import "./HeaderAdmin.css";

const HeaderPrincipalPage = () => {
  return (
    <header className="header">
      <nav>
        <div className="nav-left">
          <ul className="nav-links">
            <li>
              <Link to="/admin" className="nav-link">
                Citas
              </Link>
            </li>
            <li>
              <Link to="/agregar-servicio" className="nav-link">
                Agregar Servicio
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link">
                Administracion
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderPrincipalPage;
