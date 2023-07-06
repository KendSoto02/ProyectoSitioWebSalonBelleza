import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "./Dashoard.css"; // Importa el archivo CSS

const GraficoPastel = () => {
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3001/ProductosSolicitados");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createChartData = () => {
    const labels = data.map((item) => item.Producto);
    const datos = data.map((item) => item.Seleccionados);
    const backgroundColors = ["#FF6384", "#36A2EB", "#FFCE56", "#33FF99", "#FF9900"];

    const chartData = {
      labels,
      datasets: [
        {
          data: datos,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors,
        },
      ],
    };

    setChartData(chartData);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      createChartData();
    }
  }, [data]);

  return (
    <section className="pie-chart-container">
      <h1>Productos mas vendidos</h1>
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
