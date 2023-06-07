import React from 'react';
import './TwoColumnSection.css';


const TwoColumnSection = () => {
  return (
    <section className="two-column-section">
      <div className="column">
        <div className="image-container">
          <img src="img/img-4.png" alt="Imagen de la sección" />
        </div>
      </div>
      <div className="column">
        <h2>!En nuestro salón de belleza podrás hacerte de todo!</h2>
        <p>En Lady's Beauty Salon nos encanta hacerte la vida más fácil. Por eso, con solo un clic puedes reservar tu cita en línea 
        y también explorar nuestro catálogo de productos y cortes de pelo. ¡Agenda tu cita hoy mismo!</p>
        <a href="#servicios">Ver servicios</a>
      </div>
    </section>
  );
}

export default TwoColumnSection;
