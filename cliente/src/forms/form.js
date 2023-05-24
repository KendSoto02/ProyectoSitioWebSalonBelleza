import React, { useState } from "react";
import "./formLogIn.css";

function Formulario({ submitForm }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [servicio, setServicio] = useState("");
  const [producto, setProducto] = useState("");

  const enviarDatos = (e) => {
    e.preventDefault();

    // Validar que no haya campos en blanco
    if (
      nombre.trim() === "" ||
      telefono.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      servicio.trim() === "" ||
      producto.trim() === ""
    ) {
      alert("Por favor, asegurate de llenar todos los campos");
      return;
    }

    // Combina la fecha y la hora en un solo campo
    const fechaHora = new Date(`${fecha}T${hora}`);
    // Convierte la fecha y hora en formato ISO 8601 para que sea compatible con SQL Server
    const fechaHoraISO = fechaHora.toISOString();

    fetch("http://localhost:3001/enviar-datos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        telefono,
        fechaHora: fechaHoraISO,
        servicio,
        producto,
      }),
    })
      .then((response) => response.text())
      .then((result) => alert(result))
      .catch((error) => console.log(error));

    // Restablecer los campos después de enviar los datos
    setNombre("");
    setTelefono("");
    setFecha("");
    setHora("");
    setServicio("");
    setProducto("");
  };

  return (
    <div className="form-content-right">
      <form onSubmit={enviarDatos} className="form" noValidate>
        <h1>Agendar Cita</h1>
        <div className="form-inputs">
          <label className="form-label">Nombre:</label>
          <input
            className="form-input"
            type="text"
            name="nombre"
            placeholder="Ingresar nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Teléfono:</label>
          <input
            className="form-input"
            type="text"
            name="telefono"
            placeholder="Ingresar teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Fecha:</label>
          <input
            className="form-input"
            type="date"
            name="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Hora:</label>
          <input
            className="form-input"
            type="time"
            name="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Servicio:</label>
          <select
            className="form-input"
            name="servicio"
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
          >
            <option value="">Seleccionar servicio</option>
            <option value="Corte de Cabello Hombre">
              Corte de cabello para Hombre
            </option>
            <option value="Corte de Cabello Mujer">
              Corte de Cabello Mujer
            </option>
            <option value="Pintar Pelo">Pintar Pelo</option>
          </select>
        </div>
        <div className="form-inputs">
          <label className="form-label">Producto:</label>
          <select
            className="form-input"
            name="producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
          >
            <option value="">Seleccionar producto</option>
            <option value="Keratina">Keratina</option>
            <option value="Gel">Gel</option>
            <option value="Crema para el cabello">Crema para el cabello</option>
          </select>
        </div>
        <button className="form-input-btn" type="submit">
          Agendar Cita
        </button>
      </form>
    </div>
  );
}

export default Formulario;
