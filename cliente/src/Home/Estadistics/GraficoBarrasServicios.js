import React, { useEffect, useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import "chart.js/auto";

const GraficoBarrasServicio = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3001/ServiciosSolicitados");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const labels = data.map((item) => item.Servicio);
  const datos = data.map((item) => item.Solicitudes);
  const backgroundColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#33FF99",
    "#FF9900",
    "#CDA776",
    "#F7464A",
    "#46BFBD",
    "#FDB45C",
    "#949FB1",
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Cantidad de Servicios",
        data: datos,
        backgroundColor: backgroundColors.slice(0, data.length),
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: Math.max(...datos) + 10,
      },
    },
  };

  return (
    <div style={{ width: "450px", height: "330px" }}>
      <h2>Servicios más demandados</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default GraficoBarrasServicio;
