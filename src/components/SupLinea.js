import React from "react";
//import { Link } from "react-router-dom";
import ModalCrearOp from './ModalCrearOp'
export default class SupLineaalidad extends React.Component {
    
    constructor(){
        super();
        this.state={
            isOpen:false
        }
    }
     toggleModal=()=>this.setState({isOpen:!this.state.isOpen})
    render(){
        return(
      <div >
       <h1>SupLinea</h1>
        <button className="btn btn-primary" onClick={this.toggleModal}>Crear OP</button>
         <ModalCrearOp isOpen={this.state.isOpen} toggleModal={this.toggleModal} ></ModalCrearOp>
      </div>

        );
    }
}