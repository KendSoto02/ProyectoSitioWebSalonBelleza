import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminPage from "../Home/AdminPage";
import FormIngresarServicio from "../forms/FormIngresarServicio";
import Header from "../Header/HeaderAdmin";

const Links = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/agregar-servicio" element={<FormIngresarServicio/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default Links;
