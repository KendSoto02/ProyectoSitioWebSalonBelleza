import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>¡Bienvenidos al sitio oficial de Lady's Beauty Salon!</h1>
        <p>Estamos encantados de ofrecerte nuestros servicios de belleza 
        para que te sientas radiante y renovada. ¡Ven a vernos!</p>
        <Link to="/servicio" className="cta-button">Servicios</Link>
      </div>
    </section>
  );
}

export default HeroSection;
