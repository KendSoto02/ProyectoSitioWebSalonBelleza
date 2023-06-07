import React, { useEffect, useState } from "react";
import HeaderLandingPage from "../../LandingPage/Header/HeaderLandingPage";
import "../Servicio/Servicio.css";

const Producto = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        const response = await fetch("http://localhost:3001/ObtenerProductos");
        const data = await response.json();
        setServicios(data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerServicios();
  }, []);

  return (
    <div>
      <HeaderLandingPage />
      <div className="servicio-container">
        <h2 className="galeria-h2">Productos</h2>
        <div className="gallery">
          {servicios.map((servicio) => (
            <div key={servicio.ProductoID} className="gallery-item">
              <img src={servicio.Foto} alt={servicio.Descripcion} />
              <p className="description">{servicio.NombreProducto}</p>
              <p className="description">{servicio.Descripcion}</p>
              <p className="price">Precio: {servicio.Precio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Producto;
