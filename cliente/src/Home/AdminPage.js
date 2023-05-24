import React, { useEffect, useState } from "react";
import "./AdminPage.css";
import Header from "../Header/HeaderAdmin";

const AdminPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET para obtener los datos
    fetch("http://localhost:3001/obtener-datos")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="admin-page">
      <h1>Citas Agendadas</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>NombreCliente</th>
            <th>MedioContactoCliente</th>
            <th>FechaHora</th>
            <th>Servicio</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.IDCliente}>
              <td>{item.NombreCliente}</td>
              <td>{item.MedioContactoCliente}</td>
              <td>{item.FechaHora}</td>
              <td>{item.Descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
