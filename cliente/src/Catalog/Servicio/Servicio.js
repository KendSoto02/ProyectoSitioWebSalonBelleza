import React, { useEffect, useState } from "react";
import "./Servicio.css";
import HeaderLandingPage from "../../LandingPage/Header/HeaderLandingPage";

const Servicio = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET para obtener los datos
    fetch("http://localhost:3001/obtener-servicio")
      .then((response) => response.json())
      .then((data) => setServicios(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <HeaderLandingPage />
      <div className="servicio-container">
        <h2 className="galeria-h2">Galería de Servicios</h2>
        <div className="gallery">
          {servicios.map((servicio) => (
            <div key={servicio.ServicioID} className="gallery-item">
              <img src={servicio.FotoLink} alt={servicio.Descripcion} />
              <p className="description">{servicio.Descripcion}</p>
              <p className="price">Precio: {servicio.Precio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Servicio;
