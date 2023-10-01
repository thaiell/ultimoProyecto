import { AuthProvider } from "./Components/Context/AuthContext";
import Inicio from "./Components/Inicio/Inicio";
import EscuelaRegistroUsuario from "./Components/EscuelaRegistroUsuario/EscuelaRegistroUsuario";
import SchoolsFormConfig from "./Components/AdminSection/SchoolsFormConfig/SchoolsFormConfig";
/* REACT ROUTER DOM */
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const escuelas = ["Girasoles", "San Rafael", "Presencia"];

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Inicio />} />
            {/*  <Route path="/terminosycondiciones" element={<TerminosYCondiciones />} /> */}
            {escuelas.map((escuela, index) => (
              <Route
                key={index}
                path={`/formulario/registro/escuela/${escuela}`}
                element={<EscuelaRegistroUsuario escuela={escuela} />}
              />
            ))}


            <Route path="/admin/schools/config" element={<SchoolsFormConfig escuelas={escuelas} />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
