import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="column">
        <img src="img/img-4.png" alt="Logo de la empresa" class="logo-img"/>
      </div>
      <div className="column">
        <p>Derechos de autor © 2023. Todos los derechos reservados.</p>
      </div>
      <div className="column">
        <p>Teléfono: 2433-7890</p>
        <p>Correo: ladySalon@gmail.com</p>
      </div>
    </footer>
  );
}

export default Footer;
