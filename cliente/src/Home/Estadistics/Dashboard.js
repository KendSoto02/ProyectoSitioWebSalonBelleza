import React from "react";
import GraficoPastel from "./GraficoPastel";
import Header from "../../Header/HeaderAdmin";
import "./Dashoard.css";
import GraficoBarras from "./GraficoBarras";
import GraficoBarrasServicio from "./GraficoBarrasServicios";
const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <section className="section">
          <div className="column">
            <GraficoPastel />
          </div>
        </section>
        <section className="section">
          <div className="column">
            <GraficoBarrasServicio />
          </div>
        </section>
        <section className="section">
          <div className="column">
            <GraficoBarras />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
