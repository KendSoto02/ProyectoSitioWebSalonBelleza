import React, { useState } from "react";
import "./FormIngresarServicio.css";
import Header from "../Header/HeaderAdmin";

const FormIngresarServicio = () => {
  const [FotoLink, setFotoLink] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(FotoLink);

    // Mostrar ventana emergente de confirmación
    const confirmed = window.confirm("¿Estás seguro ingresar este servicio?");

    if (confirmed) {
      // Realizar la solicitud POST con los datos
      fetch("http://localhost:3001/insertar-servicios", {
        method: "POST",
        body: JSON.stringify({ descripcion, precio, FotoLink }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.text())
        .then((result) => alert(result))
        .catch((error) => console.log(error));

      // Restablecer los campos del formulario
      setFotoLink("");
      setDescripcion("");
      setPrecio("");
    }
  };

  return (
    <div>
      <Header />
      <div className="formulario-container">
        <div className="card">
          <h2 className="agendar-h2">Ingresar Servicio</h2>
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
            <button type="submit">Agregar Servicio</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormIngresarServicio;
