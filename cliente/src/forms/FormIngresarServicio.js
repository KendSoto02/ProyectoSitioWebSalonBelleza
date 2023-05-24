import React, { useState } from "react";
import "./FormIngresarServicio.css";

const FormIngresarServicio = () => {
  const [imagen, setImagen] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto FormData para enviar el archivo
    const formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);

    // Realizar la solicitud POST con los datos
    fetch("http://localhost:3001/insertar-datos", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => alert(result))
      .catch((error) => console.log(error));

    // Restablecer los campos del formulario
    setImagen(null);
    setDescripcion("");
    setPrecio("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  return (
    <div className="formulario-container">
      
      <div className="card">
	  <h2>Ingresar Servicio</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="imagen">Imagen:</label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleImageChange}
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
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default FormIngresarServicio;
