import React, { useEffect, useState } from "react";
import Header from "../../Header/HeaderAdmin";
import "../../forms/FormIngresarServicio";
import { useNavigate } from "react-router-dom";

const VerProductos = () => {
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate();


  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3001/ObtenerProductos");
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
  
  const eliminarProducto = async (idProducto) => {
    const confirmed = window.confirm("¿Estás seguro de eliminar el producto?");
    if (confirmed) {
      try {
        const id = parseInt(idProducto); // Convertir a número
        await fetch(`http://localhost:3001/eliminar-producto/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        await getData(); // Actualizar los datos y volver a aplicar el filtro
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  
  

  const redirigirEditarProducto = (item) => {
    navigate("/editar-producto", { state: { item } });
  };

  return (
    <div>
      <Header />
      <div className="servicio-container">
        <h2 className="galeria-h2">Productos</h2>
        <div className="gallery">
          {servicios.map((servicio) => (
            <div key={servicio.ProductoID} className="gallery-item">
              <img src={servicio.Foto} alt={servicio.Descripcion} />
              <p className="description">{servicio.NombreProducto}</p>
              <p className="description">{servicio.Descripcion}</p>
              <p className="price">Precio: {servicio.Precio}</p>
              <button
                className="delete-button"
                onClick={() => eliminarProducto(servicio.ProductoID)}
              >
                Eliminar
              </button>
              <button
                className="edit-button"
                onClick={() => redirigirEditarProducto(servicio)}
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

export default VerProductos;
