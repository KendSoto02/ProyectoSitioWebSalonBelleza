import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Header/HeaderAdmin";
import "../../forms/FormIngresarServicio.css";
import { useNavigate } from "react-router-dom";


const EditarServicio = () => {
  const location = useLocation();
  const { item } = location.state;
  const [FotoLink, setFotoLink] = useState(item.FotoLink);
  const [descripcion, setDescripcion] = useState(item.Descripcion);
  const [precio, setPrecio] = useState(item.Precio);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Mostrar ventana emergente de confirmación
    const confirmed = window.confirm("¿Estás seguro de editar este Servicio?");
  
    if (confirmed) {
      // Realizar la solicitud PUT con los datos
      fetch(`http://localhost:3001/editar-servicio/${item.ServicioID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descripcion,
          precio,
          FotoLink
        }),
      })
        .then((response) => response.text())
        .then((result) => {
          alert(result);
          // Redireccionar a "/admin" después de realizar las acciones
          navigate("/ver-servicio");
  
          setDescripcion("");
          setFotoLink("");
          setPrecio("");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <Header />
      <div className="formulario-container">
        <div className="card">
          <h2 className="agendar-h2">Editar Servicio</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="urlImagen">URL de la imagen:</label>
              <input
                type="text"
                id="urlImagen"
                name="urlImagen"
                value={FotoLink}
                onChange={(e) => setFotoLink(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="precio">Precio:</label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
            </div>
            <button type="submit">Editar Servicio</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarServicio;
