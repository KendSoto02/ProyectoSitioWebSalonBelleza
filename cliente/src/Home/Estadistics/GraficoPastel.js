import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "./Dashoard.css"; // Importa el archivo CSS

const GraficoPastel = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const dummyData = [
      { DiaSemana: "Lunes", Frecuencia: 10 },
      { DiaSemana: "Martes", Frecuencia: 8 },
      { DiaSemana: "Miércoles", Frecuencia: 5 },
      { DiaSemana: "Jueves", Frecuencia: 12 },
      { DiaSemana: "Viernes", Frecuencia: 15 },
    ];

    const labels = dummyData.map((item) => item.DiaSemana);
    const data = dummyData.map((item) => item.Frecuencia);
    const backgroundColors = ["#FF6384", "#36A2EB", "#FFCE56", "#33FF99", "#FF9900"];

    const chartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors,
        },
      ],
    };

    setChartData(chartData);
  };

  return (
    <section className="pie-chart-container">
      <h1>Dashboard</h1>
      {chartData && (
        <Pie
          data={chartData}
          options={{
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      )}
    </section>
  );
};

export default GraficoPastel;
