import React, { useState } from "react";
import "./FormIngresarServicio.css";
import HeaderLandingPage from "../LandingPage/Header/HeaderLandingPage";

const FormularioAgendarCita = ({ submitForm }) => {
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
      servicio.trim() === ""
    ) {
      alert("Por favor, asegúrate de llenar todos los campos");
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
    <div>
      <HeaderLandingPage />
      <div className="formulario-container">
        <div className="card">
          <h2 className="agendar-h2">Agendar Cita</h2>
          <form onSubmit={enviarDatos}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ingresar nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                placeholder="Ingresar teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="servicio">Servicio:</label>
              <select
                id="servio"
                name="servicio"
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
                required
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
            <div className="form-group">
              <label htmlFor="producto">Producto:</label>
              <select
                id="producto"
                name="producto"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
                required
              >
                <option value="Nada">Seleccionar producto</option>
                <option value="Jabon">Jabon</option>
                <option value="Colonia Mujer">Colonia Mujer</option>
                <option value="Crema de Piel">Crema de Piel</option>
                <option value="Crema para el cuerpo">
                  Crema para el cuerpo
                </option>
              </select>
            </div>
            <div className="form-fecha">
              <label htmlFor="fecha" className="label-all">
                Fecha:
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>
            <div className="form-hora">
              <label htmlFor="hora">Hora:</label>
              <input
                type="time"
                id="hora"
                name="hora"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
              />
            </div>
            <button type="submit">Agendar Cita</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioAgendarCita;
