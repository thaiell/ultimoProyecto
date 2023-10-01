import { AuthContext } from "../Context/AuthContext";
import { useContext, useState } from "react";
import SignInUser from "../SignUpOrIn/SignInUser/SignInUser";
import SignUpUser from "../SignUpOrIn/SignUpUser/SignUpUser";
import ContinueWithGoogle from "../SignUpOrIn/ContinueWithGoogle/ContinueWithGoogle";
import { useLocation, Navigate } from "react-router-dom";

const Inicio = () => {
  const authUser = useContext(AuthContext);

  const location = useLocation();
  const escuela = location.state || null;

  const [upOrInSwitch, setUpOrInSwitch] = useState(true);

  return (
    <>
      {!authUser ? (
        <section style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <img src="../../img/PuntoESLogo.jpg" alt="PuntoES Logo Oficial" />
          </div>

          <div>
            <div
              style={{ minWidth: "350px", maxWidth: "350px", margin: "0 auto" }}>


              {upOrInSwitch ? <SignInUser /> : <SignUpUser escuela={escuela} />}


            </div>
            <p style={{ textAlign: "center" }}>o</p>

            <ContinueWithGoogle />

            <button
              style={{
                display: "block",
                margin: "18px auto",
                border: "0",
                backgroundColor: "white",
                color: "#236DFF",
                cursor: "pointer",
              }}
              onClick={() => setUpOrInSwitch(!upOrInSwitch)}
            >
              {upOrInSwitch
                ? "Registrarse con PuntoES"
                : "Inicar sesión con PuntoES"}
            </button>
          </div>
        </section>
      ) : (
        <Navigate to={`/formulario/registro/escuela/${escuela}`}/>
      )}
    </>
  );
};

export default Inicio;
