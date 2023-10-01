import React from 'react'
import { db } from '../../services/config'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import Button from '@mui/material/Button'

const EditableButton = ({ authUser }) => {

const verifyExistingDoc = async () => {
    const formResultsRef = doc(
        db, 
        "users", 
        authUser.uid, 
        "Historial de formularios", 
        "formResults"
        )

try {
    const formExists = await getDoc(formResultsRef)
    if(formExists.exists()){
        
        console.log(formExists.data())

        // RECUPERAR LA CANTIDAD DE REMERA Y CAMPERA QUE FUERON PUESTAS, DESCONTARLAS Y LUEGO SUMAR EL NUEVO VALOR
    }


} catch(error){
    console.error("Error al obtener el documento: " + error)
}




}

    return (
    <Button onClick={verifyExistingDoc}>

EDITAR

    </Button>
  )
}

export default EditableButton