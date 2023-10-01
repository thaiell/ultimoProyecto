import React from 'react'
import { Container, TableContainer, Table, TableCell, TableHead, TableBody, Button } from '@mui/material'

const SchoolsFormConfig = ({ escuelas }) => {
 
 

 
 
  return (
    <>
    ACA VA A SER TODA LA TABLA CON TODA LA INFO DE TODOS LOS COLEGIOS
    {/* HACER TODA UNA TABLA QUE MUESTRE TODAS LAS ESCUELAS
    CON UN RECUENTO DE CUANTOS FORMULARIOS FUERON ENVIADOS, CUANTOS FALTAN,
    EL TIEMPO LIMITE QUE LE QUEDAN A TODOS, y LOS QUE NO TIENEN TIEMPO LIMITE
    PORQUE NO FUERON ACTIVADOS TODAVIA
    HACER UN BOTON PARA ACTIVARLES UN TIEMPO DE 21 DIAS Y LOS QUE SI FUERON
    Y ESTAN CONTANDO UN BOTON QUE SIRVA PARA CANCELAR EL TIEMPO O PAUSARLO*/}
    
<Container>


<TableContainer>
    <Table>
      <TableHead>
        <TableCell>Escuela</TableCell>
        <TableCell>Formularios entregados</TableCell>
        <TableCell>Fecha de inicio de formulario</TableCell>
        <TableCell>Fecha limite de formulario</TableCell>
        <TableCell>  Btn   </TableCell>
      </TableHead>
    {escuelas.map((escuela, index) => {
      return (
        <TableBody key={`${escuela}-table-${index}`}>
          <TableCell>{escuela}</TableCell>
          <TableCell> </TableCell>
          <TableCell> </TableCell>
          <TableCell> <Button> </Button> </TableCell>
        </TableBody>
      )
    })} 
    
    
  </Table>

</TableContainer>






</Container>





    
    </>
  )
}

export default SchoolsFormConfig