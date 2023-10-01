import { useState, useContext } from "react";
import { db } from "../services/config";
import { doc, setDoc, collection, FieldValue } from "firebase/firestore";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  Container,
  Grid,
  Tooltip, IconButton
} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { getTodayDate } from "../Hooks/Hooks";
import SignOut from "../SignUpOrIn/SignOut/SignOut"

import { getDate_Month_Year } from "../Hooks/Hooks";
import EditableButton from "./EditableButton/EditableButton";

const EscuelaRegistroUsuario = ({ escuela }) => {
  const authUser = useContext(AuthContext);

  if (!authUser) {
    return <Navigate to="/" state={escuela} />;
  }

  const [talleRemera, setTalleRemera] = useState("");
  const [cantidadRemera, setCantidadRemera] = useState("");
  const [talleCampera, setTalleCampera] = useState("");
  const [nombreRemera, setNombreRemera] = useState("");


const [fieldEmpty, setFieldEmpty] = useState({nombreRemera: "", talleRemera: "", cantidadRemera: "", talleCampera: ""})



  const talles = ["XS", "S", "M", "L", "XL", "XXL"];
  const cantidades = ["1", "2", "3"];

const validateForm = () => {
    const updatedFieldEmpty = {...fieldEmpty};
    let isValid = true;

    if(!nombreRemera){
        updatedFieldEmpty.nombreRemera = "Este campo es obligatorio"
        isValid = false;
    } else {
        updatedFieldEmpty.nombreRemera = "";
    }
    if(!talleRemera){
        updatedFieldEmpty.talleRemera = "Este campo es obligatorio"
        isValid = false;
    } else {
        updatedFieldEmpty.talleRemera = "";
    }

    if(!cantidadRemera){
        updatedFieldEmpty.cantidadRemera = "Este campo es obligatorio";
        isValid = false;
    } else {
        updatedFieldEmpty.cantidadRemera = "";
    }

    if(!talleCampera){
        updatedFieldEmpty.talleCampera = "Este campo es obligatorio";
        isValid = false;
    } else {
        updatedFieldEmpty.talleCampera = "";
    }
    setFieldEmpty(updatedFieldEmpty)
    return isValid;
}

  const handleForm = async (e) => {
    e.preventDefault();

if(!validateForm()){
    return;
}


await setDoc(doc(collection(db, "users", authUser.uid, "Historial de formularios"), `formResults`), {
  cantidadRemera: cantidadRemera,
  nombreDelDiseño: nombreRemera,
  talleCampera: talleCampera,
  talleRemera: talleRemera,
  diaActualizado: getTodayDate("/")
})
/* LA FUNCION DE ABAJO CREA EN LA ESCUELA, ESTE AÑO SI NO ESTA LO CREA, y DENTRO CREA
  CAMPERASORDERED Y REMERAS ORDERED. EL TEMA ES QUE TENGO QUE HACER SI EL ARCHIVO
  ES EDITADO, QUE SE TIENE QUE RESTAR EL ANTERIOR NUMERO Y SUMAR EL NUEVO */
  /* LAS RESTAS SE PUEDEN HACER CON FIELDVALUE.INCREMENT(-camperasORDERED) */


await setDoc(doc(db, "schoolForms", escuela), getDate_Month_Year("year"), {
  totalOrderCount: {
    camperasOrdered: FieldValue.increment(1),
    remerasOrdered: FieldValue.increment(cantidadRemera)
  },

})

  };

  

  const handleCancelation = () => {
    // Implementa la lógica de cancelación aquí
  };



  
  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        {escuela}
      </Typography>

      <form onSubmit={handleForm}>
        <Grid container spacing={2} style={{marginBottom:"75px", justifyContent:"center"}} >
          {/* --------------- REMERAS ---------------- */}
          <Grid item xs={12} sm={10} md={6}>
            <img
              src="https://images.squarespace-cdn.com/content/v1/56a5f5ef5827c35bf58e8e02/1517306531940-MSJ88JW0TQR1WNLNCZK5/Algo_Logo.jpeg"
              alt="Tabla de talles de remera - PuntoES Uniformes"
              style={{ width: "100%" }}
            />
          </Grid>

<Grid item xs={12} sm={12} md={6}>
    {/* TALLES REMERA */}
<Typography variant="h6" align="center">
    Remera
</Typography>
<TableContainer style={{overflow:"hidden"}}>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Talle</TableCell>
            
                {talles.map((talle, index) => (
                      <TableCell key={`talleRemeraHeader-${index}`}
                      sx={{textAlign: "center"}}>
                        {talle}
                      </TableCell>
                    ))}
            </TableRow>
        </TableHead>
                <TableBody>

                <TableRow>
                    <TableCell>Seleccione su talle</TableCell>
                
                    {talles.map((talle, index) => (
                      <TableCell key={`talleRemera-${index}`} 
                      sx={{textAlign: "center"}}>
                        <Radio
                          name="talleRemera"
                          value={talle}
                          checked={talle === talleRemera}
                          onChange={(e) => setTalleRemera(e.target.value)}
                        />
                      </TableCell>
                    ))}
                
                </TableRow>

                </TableBody>
 
                


<TableHead>
   <TableRow>

    <TableCell>Cantidad</TableCell>

    {cantidades.map((cantidad, index) => (
        <TableCell key={`cantidadRemera-${index}`} 
        sx={{textAlign: "center"}}>
            {cantidad}
        </TableCell>
    ))}
   </TableRow>
</TableHead>

<TableBody>
    <TableRow>
        <TableCell>Seleccione su cantidad</TableCell>

        {cantidades.map((cantidad, index) => (
        <TableCell key={`cantidadRemera-${index}`}>
            <Radio 
            name="cantidadRemera"
            value={cantidad}
            checked={cantidad === cantidadRemera}
            onChange={(e) => setCantidadRemera(e.target.value)} 
                />
        </TableCell>
    ))}
    </TableRow>
 
</TableBody> 
    </Table>  
</TableContainer>

</Grid>
        {
                (fieldEmpty.cantidadRemera || fieldEmpty.talleRemera) && (
                    <Typography variant="p" color={"red"}>{fieldEmpty.talleCampera}</Typography>
                )
        }
</Grid>

        {/* --------------------- CAMPERAS ---------------------- */}
        <Grid container spacing={2} style={{justifyContent:"center"}}>
          <Grid item xs={12} sm={10} md={6}>
            <img
              src="https://images.squarespace-cdn.com/content/v1/56a5f5ef5827c35bf58e8e02/1517306531940-MSJ88JW0TQR1WNLNCZK5/Algo_Logo.jpeg"
              alt="Tabla de talles de campera - PuntoES Uniformes"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" align="center">
              Campera
            </Typography>
            <TableContainer style={{overflow:"hidden"}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Talle</TableCell>
                    {talles.map((talle, index) => (
                      <TableCell key={`talleCamperaHeader-${index}`}
                      sx={{textAlign: "center"}}>
                        {talle}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{textAlign: "center"}}>Selecciona un talle</TableCell>
                    {talles.map((talle, index) => (
                      <TableCell key={`talleCampera-${index}`}
                      sx={{textAlign: "center"}}>
                        <Radio
                          name="talleCampera"
                          value={talle}
                          checked={talle === talleCampera}
                          onChange={(e) => setTalleCampera(e.target.value)}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="body2" sx={{ mt: 2 }}>
              La cantidad de camperas está predeterminada a 1
            </Typography>
            
            
          </Grid>
          {
                fieldEmpty.talleCampera && <Typography variant="p" color={"red"}>{fieldEmpty.talleCampera}</Typography>
            }
</Grid>



<Grid container justifyContent="center" alignItems="center" spacing={2} sx={{padding:"0"}} style={{marginTop:"50px"}}>

<Grid item xs={12} sx={{marginBottom:"25px"}}>
          <Typography variant="h6" align="center">
            Ingrese el nombre que irá en la remera/campera  
          </Typography>
    </Grid>

    <Grid item xs={5} sm={3} sx={{"&.MuiGrid-item":{
        padding: "0"
    }}}>

          <TextField
            fullWidth
            variant="outlined"
            value={nombreRemera}
            onChange={(e) => setNombreRemera(e.target.value)}            
            />
            </Grid>


            <Grid item xs={.5} sx={{"&.MuiGrid-item":{
        padding: "0"
    }}} >
    <Tooltip 
      title="Tenga en cuenta que los emojis podrán verse afectados al pegarlos desde Whatsapp a nuestro formulario, pero no se preocupe; los emojis se verán como se ven en Whatsapp"
    >
      <IconButton>
        <InfoOutlinedIcon />
      </IconButton>
    </Tooltip>
  </Grid>  
{fieldEmpty.nombreRemera && (
  <Grid item xs={12}  textAlign={"center"} sx={{ "&.MuiGrid-item": { padding: "0" } }}>
    <Typography  variant="p" color={"red"} >{fieldEmpty.nombreRemera}</Typography>
</Grid>
)}
</Grid>
  






        <Grid
          container
          justifyContent="center"
          spacing={2}
          sx={{ mt: 3, textAlign: "center" }}
        >


          <Grid item xs={8} sm={6}>
            <Button
              onClick={handleCancelation}
              variant="outlined"
              fullWidth
            >
              Cancelar 
            </Button>
          </Grid>


          <Grid item xs={8} sm={6}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Enviar
            </Button>
          </Grid>

<Grid item xs={12}>
  <EditableButton authUser={authUser}/>
</Grid>
        </Grid>
      </form>


      <SignOut />
    </Container>
  );
};

export default EscuelaRegistroUsuario;

