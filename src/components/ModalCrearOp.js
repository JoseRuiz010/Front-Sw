import React from 'react';

import {
   
    Button,
    
    Modal,
    ModalHeader,
    FormGroup,
    ModalFooter,
    ModalBody,
  } from 'reactstrap';
  
export default class ModalCrearOp extends React.Component{

  constructor(props){
      super(props)
     
  }

    render(){

      return(
          <div>
              <h1>Crear OP</h1>

              <>
      <Modal isOpen={this.props.isOpen}> 
      <form >
        <ModalHeader>
          <div>
            <h3>Crear OP</h3>
          </div>
        </ModalHeader>
       
        <ModalBody>
        
          <FormGroup>
             <label>Numero:</label>
            <input className="form-control" name="numero" type="text"
           
            ></input>
             
          </FormGroup>

          <FormGroup>
            <label>Color:</label>
            
            
          </FormGroup>
          <FormGroup>
            <label>Modelo:</label>
             
          </FormGroup>
          <FormGroup>
             <label>Inicio:</label>
            <input name="inicio" value={new Date()} className="form-control" disabled={true} name="inicio" type="text" 
            
            ></input>
            
          </FormGroup>
         
        </ModalBody>
        <ModalFooter>
          <Button color="primary" >Insertar</Button>
          <Button color="danger" onClick={this.props.toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
         </form>
      </Modal>


     </>





          </div>
      );

    }

}
