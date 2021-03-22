import React from "react";
import {Link  } from "react-router-dom";

export default class Linea extends React.Component {
  constructor(props) {
    super(props);
    
  }
  seleccionoLinea=(id)=>{
   
    this.props.setLinea(id)
  }
  render() {
    //
    return (
      <div>
      <h6>{this.props.tipoEmpleado}</h6>
       
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Linea : {this.props.linea.numero}</h5>
            <Link
             
              onClick={() => this.seleccionoLinea(this.props.linea.numero)}
              className="btn btn-primary" 
              to={this.props.tipoEmpleado==="SuperVisordeCalidad"? "/SupCalidad":"/SupLinea"}
            >
              Igresar
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
