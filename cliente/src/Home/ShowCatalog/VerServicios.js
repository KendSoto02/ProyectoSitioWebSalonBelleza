import React, { useEffect, useState } from "react";
import Header from "../../Header/HeaderAdmin";
import "../../forms/FormIngresarServicio";
import { useNavigate } from "react-router-dom";

const VerServicios = () => {
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate();


  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3001/obtener-servicio");
      const data = await response.json();
      setServicios(data);
      console.log(servicios);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getData();
  }, []);
  

  const eliminarServicio = async (IdServicio) => {
    const confirmed = window.confirm("¿Estás seguro de eliminar el servicio?");
    if (confirmed) {
      try {
        const id = parseInt(IdServicio); 
        await fetch(`http://localhost:3001/eliminar-servicio/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        await getData(); 
      } catch (error) {
        console.log(error);
      }
    }
  };


  const redirigirEditarServicio = (item) => {
    navigate("/editar-servicio", { state: { item } });
  };
  return (
    <div>
      <Header />
      <div className="servicio-container">
        <h2 className="galeria-h2">Galería de Servicios</h2>
        <div className="gallery">
          {servicios.map((servicio) => (
            <div key={servicio.ServicioID} className="gallery-item">
              <img src={servicio.FotoLink} alt={servicio.Descripcion} />
              <p className="description">{servicio.Descripcion}</p>
              <p className="price">Precio: {servicio.Precio}</p>
              <button
                className="delete-button"
                onClick={() => eliminarServicio(servicio.ServicioID)}
              >
                Eliminar
              </button>
              <button
                className="edit-button"
                onClick={() => redirigirEditarServicio(servicio)}
              >
                Editar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerServicios;
