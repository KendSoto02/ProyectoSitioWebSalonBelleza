import React, { useState } from "react";
import "./FormIngresarServicio.css";
import Header from "../Header/HeaderAdmin";

const FormIngresarProducto = () => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mostrar ventana emergente de confirmación
    const confirmed = window.confirm("¿Estás seguro de ingresar este Producto?");

    if (confirmed) {
      // Realizar la solicitud POST con los datos
      fetch("http://localhost:3001/insertar-productos", {
        method: "POST",
        body: JSON.stringify({
          NombreProducto: nombreProducto,
          Descripcion: descripcion,
          Foto: foto,
          Precio: precio,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.text())
        .then((result) => alert(result))
        .catch((error) => console.log(error));

      // Restablecer los campos del formulario
      setNombreProducto("");
      setDescripcion("");
      setFoto("");
      setPrecio("");
    }
  };

  return (
    <div>
      <Header />
      <div className="formulario-container">
        <div className="card">
          <h2 className="agendar-h2">Ingresar Producto</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombreProducto">Nombre del producto:</label>
              <input
                type="text"
                id="nombreProducto"
                name="nombreProducto"
                value={nombreProducto}
                onChange={(e) => setNombreProducto(e.target.value)}
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
              <label htmlFor="foto">Foto:</label>
              <input
                type="text"
                id="foto"
                name="foto"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
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
            <button type="submit">Agregar Producto</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormIngresarProducto;
