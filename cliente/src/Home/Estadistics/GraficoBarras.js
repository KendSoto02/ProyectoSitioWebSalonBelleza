import React from "react";
import { Bar, Chart } from "react-chartjs-2";
import "chart.js/auto";

const GraficoBarras = () => {
  const chartData = {
    labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    datasets: [
      {
        label: "Cantidad",
        data: [10, 8, 5, 12, 15],
        backgroundColor: "#FF6384",
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false, // Desactiva el mantenimiento del aspecto del gráfico
    responsive: true, // Permite que el gráfico se ajuste al contenedor
    scales: {
      y: {
        min: 0, // Establece el valor mínimo del eje y
        max: 20, // Establece el valor máximo del eje y
      },
    },
  };

  return (
    <div style={{ width: "450px", height: "330px" }}> {/* Establece el tamaño deseado */}
      <h2>Dias más demandados</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default GraficoBarras;
