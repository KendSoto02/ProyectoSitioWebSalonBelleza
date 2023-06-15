import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../forms/FormIngresarServicio.css";
import Header from "../../Header/HeaderAdmin";
import { useNavigate } from "react-router-dom";

const EditarReservacion = () => {
  const location = useLocation();
  const { item } = location.state;
  const navigate = useNavigate();

  const [nombre, setNombre] = useState(item.NombreCliente);
  const [telefono, setTelefono] = useState(item.MedioContactoCliente);
  const [servicio, setServicio] = useState(item.Descripcion);
  const [producto, setProducto] = useState(item.NombreProducto);
  const [hora, setHora] = useState(item.Hora);
  const [correo, setCorreo] = useState(item.Correo);
  const [citaActiva, setCitaActiva] = useState(item.Estado);

  const formatDate = (inputDate) => {
    const parts = inputDate.split("/"); // Dividir la cadena de fecha en partes: día, mes, año
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // Reorganizar las partes en el formato deseado: año-mes-día
    return formattedDate;
  };

  const formattedFecha = formatDate(item.Fecha);
  const [fecha, setFecha] = useState(formattedFecha);

  const enviarDatos = (e) => {
    e.preventDefault();

    const confirmed =
      window.confirm(`¿Estás segura(o) que quieres editar la reservación con los siguientes datos?
    \nNombre: ${nombre}
    \nTeléfono: ${telefono}
    \nCorreo: ${correo}
    \nFecha: ${fecha}
    \nHora: ${hora}
    \nServicio: ${servicio}
    \nProducto: ${producto}`);

    if (confirmed) {
      // Validar que no haya campos en blanco
      var citaFormateada = 1;
      if (citaActiva === "Inactiva") {
        citaFormateada = 0;
      }

      const horaFormateada = hora + ":00.000";
      fetch(`http://localhost:3001/editar-reservacion/${item.ReservarCitaID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          telefono,
          fecha,
          hora: horaFormateada,
          servicio,
          producto,
          correo,
          citaActiva: citaFormateada,
        }),
      })
        .then((response) => response.text())
        .then((result) => {
          alert(result);
          // Redireccionar a "/admin" después de realizar las acciones
          navigate("/admin");
        })
        .catch((error) => console.log(error));

      // Restablecer los campos después de enviar los datos
      setNombre("");
      setTelefono("");
      setFecha("");
      setHora("");
      setServicio("");
      setProducto("");
    }
  };

  return (
    <div>
      <Header />
      <div className="formulario-container">
        <div className="card">
          <h2 className="agendar-h2">Editar Reservación</h2>
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
              <div className="form-group">
                <label htmlFor="citaActiva">Estado:</label>
                <select
                  id="CitaActiva"
                  name="CitaActiva"
                  value={citaActiva}
                  onChange={(e) => setCitaActiva(e.target.value)}
                  required
                >
                  <option value="Activa">Activa</option>
                  <option value="Inactiva">Inactiva</option>
                </select>
              </div>
            </div>

            <button type="submit">Editar Cita</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarReservacion;
