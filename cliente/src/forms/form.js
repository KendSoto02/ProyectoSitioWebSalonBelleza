import React, { useState, useEffect } from "react";
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
  const handleServicioChange = (e) => {
    setServicio(e.target.value);
    setHora(""); // Restablece el valor de la hora a vacío
  };
  const fechaActual = new Date();
  fechaActual.setDate(fechaActual.getDate() - 1);
  const fechaAnterior = fechaActual.toISOString().split("T")[0];
  const [dataService, setDataService] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataHours, setDataHours] = useState([]);

  const generarOpcionesDeHora = () => {
    const horasExcluidas =  dataHours.map((item) => item.Hora);
    const opciones = [];
    const horaActual = new Date().getHours() + 1;
    const horaInicial = 8;
    const horaFinal = 17;

    for (let hora = horaInicial; hora <= horaFinal; hora++) {
      const horaFormateada = `${hora.toString().padStart(2, "0")}:00`;

      if (
        horasExcluidas.some((horaExcluida) =>
          horaExcluida.startsWith(`${hora.toString().padStart(2, "0")}:`)
        )
      ) {
        continue; // Salta a la siguiente iteración si la hora está excluida
      }

      if (hora >= horaActual) {
        opciones.push(horaFormateada);
      }
    }

    return opciones;
  };
  
  const generarOpcionesDeMediaHora = () => {
    const horasExcluidas = dataHours.map((item) => item.Hora); // Horas a excluir
    const opciones = [];
    const horaActual = new Date().getHours();
    const minutosActuales = new Date().getMinutes();
    const horaInicial = 8;
    const horaFinal = 17;
  
    for (let hora = horaInicial; hora <= horaFinal; hora++) {
      const horaFormateada = `${hora.toString().padStart(2, "0")}:00`;
      const mediaHoraFormateada = `${hora.toString().padStart(2, "0")}:30`;
  
      if (hora === horaFinal && horasExcluidas.includes(mediaHoraFormateada)) {
        break; // Detiene el bucle si la última media hora está excluida
      }
  
      if (hora >= horaActual || (hora === horaActual && minutosActuales < 30)) {
        if (!horasExcluidas.includes(horaFormateada)) {
          opciones.push(horaFormateada);
        }
      }
  
      if (!horasExcluidas.includes(mediaHoraFormateada)) {
        opciones.push(mediaHoraFormateada);
      }
    }
  
    return opciones;
  };

  const enviarDatos = async (e) => {
    e.preventDefault();

    // Validar que no haya campos en blanco
    if (!nombre || !telefono || !fecha || !hora || !servicio) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Combina la fecha y la hora en un solo campo
    const confirmed =
      window.confirm(`¿Estás segura(o) ${nombre} de agendar la cita con los siguientes datos?
    \nNombre: ${nombre}
    \nTeléfono: ${telefono}
    \nCorreo: ${correo}
    \nFecha: ${fecha}
    \nHora: ${hora}
    \nServicio: ${servicio}
    \nProducto: ${producto}`);

    if (confirmed) {
      const horaFormateada = hora + ":00.000";
      console.log(horaFormateada);
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

  const getDataService = async () => {
    try {
      const response = await fetch("http://localhost:3001/ObtenerServicio");
      const data = await response.json();
      setDataService(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataHours = async () => {
    try {
      const response = await fetch("http://localhost:3001/ObtenerHorasCitasActivas");
      const data = await response.json();
      setDataHours(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataProduct = async () => {
    try {
      const response = await fetch("http://localhost:3001/ObtenerProducto");
      const data = await response.json();
      setDataProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataService();
    getDataProduct();
    getDataHours();
  }, []);

  function DevolverFechaHora() {
    if (servicio == "Corte de cabello Hombre") {
      return EstablecerIntervalo("30");
    } else if (servicio == "Corte de Cabello Mujer") {
      return EstablecerIntervalo("60");
    } else if (servicio == "Pintar pelo") {
      return EstablecerIntervalo("60");
    } else if (servicio == "Uñas") {
      return EstablecerIntervalo("60");
    }
  }

  function EstablecerIntervalo(intervalo) {
    return (
      <div>
        <div className="form-fecha">
          <label htmlFor="fecha" className="label-all">
            Fecha:
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            min={fechaAnterior}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div className="form-hora">
          <label htmlFor="hora">Hora:</label>
          <select
            id="hora"
            name="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          >
            <option value="">Seleccionar hora</option>
            {intervalo === "30"
              ? generarOpcionesDeMediaHora(intervalo).map((horaOption) => (
                  <option key={horaOption} value={horaOption}>
                    {horaOption}
                  </option>
                ))
              : generarOpcionesDeHora(intervalo).map((horaOption) => (
                  <option key={horaOption} value={horaOption}>
                    {horaOption}
                  </option>
                ))}
          </select>
        </div>
      </div>
    );
  }

  const Servicio = () => {
    return (
      <div className="form-group">
        <label htmlFor="servicio">Servicio:</label>
        <select
          id="servicio"
          name="servicio"
          value={servicio}
          onChange={handleServicioChange}
          required
        >
          <option key="N/A" value="Escoger Opcion">
            Seleccionar Producto
          </option>
          {dataService.map((service, index) => (
            <option key={index} value={service.Descripcion}>
              {service.Descripcion}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const Producto = () => {
    return (
      <div className="form-group">
        <label htmlFor="producto">Producto:</label>
        <select
          id="producto"
          name="producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        >
          <option key="N/P" value="Escoger Opcion">
            Seleccionar Producto
          </option>
          {dataProduct.map((product, index) => (
            <option key={index} value={product.NombreProducto}>
              {product.NombreProducto}
            </option>
          ))}
        </select>
      </div>
    );
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

           <Servicio />
           <Producto />
            {DevolverFechaHora()}
            <button type="submit">Agendar Cita</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioAgendarCita;
