import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminPage.css";
import Header from "../Header/HeaderAdmin";

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3001/obtener-datos");
      const data = await response.json();
      setData(data);
      setFilteredData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const applyFilter = () => {
    let filteredResult = [...data];

    if (filter === "nombre") {
      filteredResult.sort((a, b) =>
        a.NombreCliente.localeCompare(b.NombreCliente)
      );
    } else if (filter === "fecha-antigua") {
      filteredResult.sort((a, b) => a.Fecha.localeCompare(b.Fecha));
    } else if (filter === "fecha-reciente") {
      filteredResult.sort((a, b) => b.Fecha.localeCompare(a.Fecha));
    } else if (filter === "servicio") {
      filteredResult.sort((a, b) => a.Descripcion.localeCompare(b.Descripcion));
    } else if (filter === "corte-hombre") {
      filteredResult = filteredResult.filter((item) =>
        item.Descripcion.toLowerCase().includes("corte de cabello hombre")
      );
    } else if (filter === "corte-mujer") {
      filteredResult = filteredResult.filter((item) =>
        item.Descripcion.toLowerCase().includes("corte de cabello mujer")
      );
    } else if (filter === "pintar-pelo") {
      filteredResult = filteredResult.filter((item) =>
        item.Descripcion.toLowerCase().includes("pintar pelo")
      );
    }
 

    setFilteredData(filteredResult);
  };

  useEffect(() => {
    applyFilter();
  }, [filter]);

  const eliminarCita = async (idCita) => {
    const confirmed = window.confirm(
      "¿Estás seguro de eliminar la reservación?"
    );
    if (confirmed) {
      try {
        await fetch("http://localhost:3001/eliminar-reservacion", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ IdCita: idCita }),
        });
        await getData(); // Actualizar los datos y volver a aplicar el filtro
      } catch (error) {
        console.log(error);
      }
    }
  };

  const redirigirEditarCita = (item) => {
    navigate("/editar-cita", { state: { item } });
  };

  return (
    <div>
      <Header />
      <div className="admin-page">
        <h1 className="h1-letra">Citas Agendadas</h1>
        <div className="filter-section">
          <label htmlFor="filter">Filtrar por:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="nombre">Nombre por orden alfabetico (A-Z)</option>
            <option value="fecha-antigua">Fecha (Más reciente)</option>
            <option value="fecha-reciente">Fecha (Más antigua)</option>
            <option value="servicio">Servicios:</option>
            <option value="corte-hombre">- Corte de cabello Hombre</option>
            <option value="corte-mujer">- Corte de cabello mujer</option>
            <option value="pintar-pelo">- Pintar pelo</option>
          </select>
        </div>
        <div className="data-section">
          {filteredData.map((item) => (
            <div key={item.ReservarCitaID} className="data-item">
              <h3>Nombre: {item.NombreCliente}</h3>
              <p>Contacto: {item.MedioContactoCliente}</p>
              <p>Correo: {item.Correo}</p>
              <p>Fecha: {item.Fecha}</p>
              <p>Hora: {item.Hora}</p>
              <p>Servicio: {item.Descripcion}</p>
              <p>Producto: {item.NombreProducto}</p>
              <p>Estado: {item.Estado}</p>
              <button
                className="delete-button"
                onClick={() => eliminarCita(item.ReservarCitaID)}
              >
                Eliminar
              </button>
              <button
                className="edit-button"
                onClick={() => redirigirEditarCita(item)}
              >
                Editar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
