import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Validations/AuthProvider";
import LoginForm from "./forms/adminLogIn";
import AdminPage from "./Home/AdminPage";
import FormIngresarServicio from "./forms/FormIngresarServicio";
import FormIngresarProducto from "./forms/FormIngresarProducto";
import LandingPage from "./LandingPage/LandingPage";
import Servicio from "./Catalog/Servicio/Servicio";
import Producto from "./Catalog/Productos/Producto";
import RutaPrivada from "./Links/RutaPrivada";
import FormularioAgendarCita from "./forms/form";
import EditarReservacion from "./Home/EditData/EditarReservación";
import EditarProducto from "./Home/EditData/EditarProducto";
import EditarServicio from "./Home/EditData/EditarServicio";
import VerProductos from "./Home/ShowCatalog/VerProductos";
import VerServicios from "./Home/ShowCatalog/VerServicios";
import Dashboard from "./Home/Estadistics/Dashboard";
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/agendarCita" element={<FormularioAgendarCita />} />
            <Route path="/servicio" element={<Servicio />} />
            <Route path="/producto" element={<Producto />} />
            <Route path="/AdminLogIn" element={<LoginForm />} />
            <Route
              path="/admin"
              element={<RutaPrivada path="/admin" element={<AdminPage />} />}
            />
            <Route
              path="/agregar-servicio"
              element={
                <RutaPrivada
                  path="/agregar-servicio"
                  element={<FormIngresarServicio />}
                />
              }
            />
            <Route
              path="/agregar-producto"
              element={
                <RutaPrivada
                  path="/agregar-producto"
                  element={<FormIngresarProducto />}
                />
              }
            />

            <Route
              path="/editar-cita"
              element={
                <RutaPrivada
                  path="/editar-cita"
                  element={<EditarReservacion />}
                />
              }
            />

            <Route
              path="/editar-servicio"
              element={
                <RutaPrivada
                  path="/editar-servicio"
                  element={<EditarServicio />}
                />
              }
            />

            <Route
              path="/editar-producto"
              element={
                <RutaPrivada
                  path="/editar-producto"
                  element={<EditarProducto />}
                />
              }
            />
            <Route
              path="/ver-producto"
              element={
                <RutaPrivada path="/ver-producto" element={<VerProductos />} />
              }
            />

            <Route
              path="/ver-servicio"
              element={
                <RutaPrivada path="/ver-servicio" element={<VerServicios />} />
              }
            />

            <Route
              path="/estadisticas"
              element={
                <RutaPrivada path="/estadisticas" element={<Dashboard />} />
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
