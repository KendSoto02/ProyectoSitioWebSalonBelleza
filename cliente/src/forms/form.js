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
  const [correo, setCorreo] = useState("");

  const enviarDatos = async (e) => {
    e.preventDefault();

    // Validar que no haya campos en blanco
    if (!nombre || !telefono || !fecha || !hora || !servicio) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Combina la fecha y la hora en un solo campo
    const confirmed = window.confirm(`¿Estás segura(o) ${nombre} de agendar la cita con los siguientes datos?
    \nNombre: ${nombre}
    \nTeléfono: ${telefono}
    \nCorreo: ${correo}
    \nFecha: ${fecha}
    \nHora: ${hora}
    \nServicio: ${servicio}
    \nProducto: ${producto}`);

    
    if (confirmed) {
      const horaFormateada = hora + ":00.000";

      try {
        const response = await fetch("http://localhost:3001/enviar-datos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre,
            telefono,
            fecha,
            hora: horaFormateada,
            servicio,
            producto,
            correo,
          }),
        });

        if (response.ok) {
          const result = await response.text();
          alert(result);
          // Restablecer los campos después de enviar los datos
          setNombre("");
          setTelefono("");
          setFecha("");
          setHora("");
          setServicio("");
          setProducto("");
          setCorreo("");
        } else {
          throw new Error("Error de servidor");
        }
      } catch (error) {
        console.log(error);
        alert("Error de servidor");
      }
    }
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
              <label htmlFor="correo">Correo electrónico:</label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="Ingresar correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
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
                <option value="Corte de cabello Hombre">
                  Corte de cabello para Hombre
                </option>
                <option value="Corte de Cabello Mujer">
                  Corte de Cabello Mujer
                </option>
                <option value="Pintar pelo">Pintar Pelo</option>
                <option value="Uñas">Uñas</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="producto">Producto:</label>
              <select
                id="producto"
                name="producto"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
              >
                <option value="">Seleccionar producto</option>
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
