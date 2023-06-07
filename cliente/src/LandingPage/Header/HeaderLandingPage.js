import React from "react";
import "./HeaderLandingPage.css";
import { Link } from "react-router-dom";
import { FaFacebook, FaTiktok, FaInstagram, FaYoutube} from "react-icons/fa";
import { AiOutlineWhatsApp } from 'react-icons/ai';

const HeaderLandingPage = () => {
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
            <Link to="/">Menú Principal</Link>
          </li>
          <li>
            <Link to="/agendarCita">Agendar Cita</Link>
          </li>
          <li>
            <Link to="/servicio">Servicios</Link>
          </li>
          <li>
            <Link to="/producto">Productos</Link>
          </li>
          <li>
            <Link to="/AdminLogIn">Administrador</Link>
          </li>
        </ul>
      </nav>
      <div className="social-icons">
        <a
          href="https://es-la.facebook.com/login/device-based/regular/login/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="social-icon facebook-icon"/>
        </a>
        <a
          href="https://www.tiktok.com/@leomessi__?lang=es"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok className="social-icon tiktok-icon"/>
        </a>
        <a
          href="https://www.instagram.com/leomessi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="social-icon instagram-icon"/>
        </a>

        <a
        href="https://api.whatsapp.com/send?phone=89904312"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiOutlineWhatsApp className="social-icon whatsapp-icon" />
      </a>
        
      </div>
    </header>
  );
};


// <a
//           href="https://www.youtube.com/leomessi/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaYoutube className="social-icon youtube-icon"/>
//         </a>
export default HeaderLandingPage;
