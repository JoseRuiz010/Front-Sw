import React, { useState } from "react";
import Navcalidad from "./navcalidad";
import { useForm } from "react-hook-form";
import {
   
  Button,
  
  Modal,
  ModalHeader,
  FormGroup,
  ModalFooter,
  ModalBody,
} from "reactstrap";

export default function ModalOp(props){
    const {register, errors, handleSubmit}= useForm();

    const [modal, setModal]= useState(false);
    const [colors, setColors] = useState([]);
    const [models, setModels] = useState([]);

    const mostrarModal = () => {
      setModal(true);
    };
    const ocultarModal = () => {
      setModal(false);
    };
  
    React.useEffect(()=>{
      obtenerDatos();
      mostrarModal();
  },[])
  
  
  const obtenerDatos=async ()=>{
        const colores=  await fetch('http://localhost:1337/Colors');
        setColors( await colores.json()) ;
        const modelos=  await fetch('http://localhost:1337/Modelos');
        setModels( await modelos.json());
      }

      const onSubmit=(data,e)=>{
          console.log(data);
          props.agregarOP(data);
        }
    return(
     <>
      <Modal isOpen={modal}> 
      <form onSubmit={handleSubmit(onSubmit())}>
        <ModalHeader>
          <div>
            <h3>Crear OP</h3>
          </div>
        </ModalHeader>
       
        <ModalBody>
        
          <FormGroup>
             <label>Numero:</label>
            <input className="form-control" name="numero" type="text"
            ref={
                register({
                  required:{value:true,message:"Debe ingresar un numero de OP"}
                })
                
            }
            ></input>
             <span className="text-danger tezt-small d-block mb-2">
                    {errors?.numero?.message}
                   </span>
          </FormGroup>

          <FormGroup>
            <label>Color:</label>
            <select className="form-control" name="color"
            ref={register({required:{value:true,message:"Debe seleccionar un color"}})}
            >
             
            {
                colors.map(m=>(
                <option key={m.id}  >{m.Descripcion}</option> 
                ))
            }
             
            </select>
            <span className="text-danger tezt-small d-block mb-2">
                    {errors?.color?.message}
                   </span>
          </FormGroup>
          <FormGroup>
            <label>Modelo:</label>
            <select name="modelo" className="form-control" ref={register({required:{value:true,message:"Debe seleccionar un Modelo"}})}>
            {
                models.map(m=>(
                <option key={m.id}>SKU: {m.SKU}, Denominacion: {m.Denominacion} </option> 
                ))
            }
              
            </select>
            <span className="text-danger tezt-small d-block mb-2">
                    {errors?.modelo?.message}
                   </span>
          </FormGroup>
          <FormGroup>
             <label>Inicio:</label>
            <input name="inicio" value={new Date()} className="form-control" disabled={true} name="inicio" type="text" 
            ref={register({required:{value:true,message:"Debe ingresar una fecha"}})}
            ></input>
             <span className="text-danger tezt-small d-block mb-2">
                    {errors?.inicio?.message}
                   </span>
          </FormGroup>
         
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ocultarModal}>Insertar</Button>
          <Button color="danger" onClick={ocultarModal}>
            Cancelar
          </Button>
        </ModalFooter>
         </form>
      </Modal>


     </>





    );

}