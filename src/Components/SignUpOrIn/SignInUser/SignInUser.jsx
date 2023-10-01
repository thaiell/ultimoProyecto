import { auth } from "../../services/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import Grid from "@mui/material/Grid"
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignInUser = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [fieldEmpty, setFieldEmpty] = useState({ email: "", password: "" });

  const validateForm = () => {
    const updatedFieldEmpty = { ...fieldEmpty };
    let isValid = true;

    if (!userEmail) {
      updatedFieldEmpty.email = "Este campo es obligatorio";
      isValid = false;
    } else {
      updatedFieldEmpty.email = "";
    }

    if (!userPassword) {
      updatedFieldEmpty.password = "Este campo es obligatorio";
      isValid = false;
    } else {
      updatedFieldEmpty.password = "";
    }

    setFieldEmpty(updatedFieldEmpty);
    return isValid;
  };




  const signIn = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => console.log(error));
  };

  return (<>

        <form
          onSubmit={signIn}
          style={{
            border: "1px solid #ccc",
            padding: "30px 10px", 
            borderRadius: "5px",
            textAlign:"center"
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "35px",
              marginTop: "0",
            }}
          >Iniciar sesión
          </h2>
      <Grid container spacing={0.1} rowSpacing={1}>
        <Grid item xs={12}>
          <FormControl fullWidth style={{alignItems:"center", justifyContent:"center"}}>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              autoComplete="@gmail.com"
              helperText={fieldEmpty.email && <p style={{color:"red", margin:"0"}}>{fieldEmpty.email}</p>}
              style={{
                width: "80%",
                marginBottom: "20px"
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth style={{alignItems:"center"}}>
            <TextField
              label="Contraseña"
              name="password"
              variant="outlined"
              helperText={fieldEmpty.password && <p style={{ color: "red", margin: "0" }}>{fieldEmpty.password}</p>}
              style={{
                width: "80%",
                marginBottom: "20px",
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Grid>

      </Grid>
    </form>
        
        </>
  );
};

export default SignInUser;
