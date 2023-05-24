import React from "react";
import { Link } from "react-router-dom";
import "./HeaderAdmin.css";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/citas">Citas</Link>
          </li>
          <li>
            <Link to="/estadisticas">Estadísticas</Link>
          </li>
          <li>
            <Link to="/salir">Salir</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
