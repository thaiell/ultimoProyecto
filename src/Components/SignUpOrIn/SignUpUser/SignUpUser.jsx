import { auth, db } from "../../services/config.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, collection, addDoc, deleteDoc } from "firebase/firestore";
import { useState } from "react";

import Grid from "@mui/material/Grid"
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { getTodayDate } from "../../Hooks/Hooks.jsx";

const SignUpUser = ({ escuela }) => {
  const [name, setName] = useState("");
  const [kidsName, setKidsName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

/* ERRORES */
const [emailInUse, setEmailInUse] = useState(false);
const [passwordWeak, setPasswordWeak] = useState(false);
const [passwordShort, setPasswordShort] = useState(false);
const [fieldEmpty, setFieldEmpty] = useState({name: "", kidsName:"" , email: "", password: "", confirmPassword: ""})



const validateForm = () => {
  const updatedFieldEmpty = { ...fieldEmpty };
    let isValid = true;

    if (!name) {
      updatedFieldEmpty.name = "Este campo es obligatorio";
      isValid = false;
    } else {
      updatedFieldEmpty.name = "";
    }

    if(!kidsName) {
      updatedFieldEmpty.kidsName = "Este campo es obligatorio";
      isValid = false;
    } else {
      updatedFieldEmpty.kidsName = "";
    }

    if (!email) {
      updatedFieldEmpty.email = "Este campo es obligatorio";
      isValid = false;
    } else {
      updatedFieldEmpty.email = "";
    }

    if (!password) {
      updatedFieldEmpty.password = "Este campo es obligatorio";
      isValid = false;
    } else {
      updatedFieldEmpty.password = "";
    }

    if (!confirmPassword) {
      updatedFieldEmpty.confirmPassword = "Este campo es obligatorio";
      isValid = false;
    } else {
      updatedFieldEmpty.confirmPassword = "";
    }

    if (password !== confirmPassword) {
      setPasswordWeak(false);
      updatedFieldEmpty.confirmPassword = "Las contraseñas no coinciden";
      isValid = false;
    } else {
      updatedFieldEmpty.confirmPassword = "";
    }

    if (password.length < 6) {
      setPasswordShort(true);
      isValid = false;
    } else {
      setPasswordWeak(false);
    }

    setFieldEmpty(updatedFieldEmpty);
    return isValid;
}


  const createUserHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userCredential");
console.log(userCredential);
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // REGISTRAR USUARIO EN BASE DE DATOS FIRESTORE



await setDoc(doc(db, "users", userCredential.user.uid), {
        name: name,
        nombreAlumno: kidsName,
        email: email,
        schoolFrom: escuela,
        userCreatedIn: getTodayDate("/")
       })
  
  } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setEmailInUse(true);
      } else {
        setEmailInUse(false)
      }

      console.error(error);
    }
  };


return (
  <>
        <form
          onSubmit={createUserHandler} 
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
          >Registrarse
          </h2>
      <Grid container spacing={0.1} rowSpacing={1}>


        <Grid item xs={12}>
          <FormControl fullWidth style={{alignItems:"center", justifyContent:"center"}}>
            <TextField
              label="Nombre"
              name="nameInput"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText={fieldEmpty.name && <p style={{color:"red", margin:0}}>{fieldEmpty.name}</p>}
              style={{
                width: "80%",
                marginBottom: "20px"
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth style={{alignItems:"center", justifyContent:"center"}}>
            <TextField
              label="Nombre del Alumno"
              name="kidsNameInput"
              variant="outlined"
              value={kidsName}
              onChange={(e) => setKidsName(e.target.value)}
              helperText={fieldEmpty.kidsName && <p style={{color:"red", margin:0}}>{fieldEmpty.kidsName}</p>}
              style={{
                width: "80%",
                marginBottom: "20px"
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth style={{alignItems:"center", justifyContent:"center"}}>
            <TextField
              label="Email"
              name="emailInput"
              variant="outlined"
              value={email}
              type="email"
              autoComplete="@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              helperText={fieldEmpty.email && <p style={{color:"red", margin:0}}>{fieldEmpty.email}</p> || emailInUse && <p style={{color:"red", margin:0}}>Este email esta en uso, pruebe con otro</p>}
              style={{
                width: "80%",
                marginBottom: "20px"
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth style={{alignItems:"center", justifyContent:"center"}}>
            <TextField
              label="Contraseña"
              name="passwordInput"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={passwordShort && <p style={{color:"red", margin:0}}>Tu contraseña debe contener al menos 6 caracteres</p> || fieldEmpty.password && <p style={{color:"red", margin:0}}>{fieldEmpty.password}</p>}
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
              label="Confirmá tu contraseña"
              name="confirmPasswordInput"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              helperText={fieldEmpty.confirmPassword && <p style={{color:"red", margin:0}}>{fieldEmpty.confirmPassword}</p> || passwordWeak && <p style={{color:"red", margin:0}}>Las contraseñas no coinciden</p>}
              style={{
                width: "80%",
                marginBottom: "20px",
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
          Registrarse
          </Button>
        </Grid>
      </Grid>
    </form>
</>
  );
}

export default SignUpUser;
