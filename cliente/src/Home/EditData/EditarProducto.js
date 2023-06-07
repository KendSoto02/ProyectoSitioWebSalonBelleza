import React, { useState } from "react";
import "../../forms/FormIngresarServicio.css";
import Header from "../../Header/HeaderAdmin";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const EditarProducto = () => {
  const location = useLocation();
  const { item } = location.state;
  const [nombreProducto, setNombreProducto] = useState(item.NombreProducto);
  const [descripcion, setDescripcion] = useState(item.Descripcion);
  const [foto, setFoto] = useState(item.Foto);
  const [precio, setPrecio] = useState(item.Precio);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Mostrar ventana emergente de confirmación
    const confirmed = window.confirm("¿Estás seguro de editar este Producto?");
  
    if (confirmed) {
      // Realizar la solicitud PUT con los datos
      fetch(`http://localhost:3001/editar-producto/${item.ProductoID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreProducto,
          descripcion,
          foto,
          precio
        }),
      })
        .then((response) => response.text())
        .then((result) => {
          alert(result);
          // Redireccionar a "/admin" después de realizar las acciones
          navigate("/ver-producto");
  
          setNombreProducto("");
          setDescripcion("");
          setFoto("");
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
          <h2 className="agendar-h2">Editar Producto</h2>
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
            <button type="submit">Editar Producto</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
