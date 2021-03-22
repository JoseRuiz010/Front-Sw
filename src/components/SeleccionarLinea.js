import React from 'react'

import Lineas from './Lineas'
export default class SeleccionarLinea extends React.Component{
    constructor(props) {
        super(props);
        
       } 
         li=0;
        state={
           Lineas:[],
           numLinea:0,
           
       }
       user={}
         obtenerDatos=async ()=>{
        const data=  await fetch('http://localhost:1337/Lineas')
          const l=( await data.json());
          this.setState({Lineas:l})
          
        }
        componentDidMount(){
            this.obtenerDatos();

            if(localStorage.getItem('user')==""){
              window.location="/"
            }else{
            this.user=JSON.parse( localStorage.getItem('user'));
            console.log(`Usuario log ${this.user.user}`)
            }
           
          }
          setLinea=(id)=>{
          this.li=id;
          
          this.props.addLinea(id);
          //alert(`Selecciono la linea ${this.li}`);
          this.setState({numLinea:this.li})
          
       }
        

    render(){
        
        return(
         <div>
         
         
         <div className="row">
         <div className="col mx-auto">
           <h2>Lineas</h2>
         </div>
         <div className="col-12">
            <h1>Bienvenido {this.user.user}</h1>
         </div>
        
         <br></br>
         <hr></hr>
                {
                   this.state.Lineas.map(l=>(

                      <div key={l.id} className="col-4">
                       <Lineas tipoEmpleado={this.user.tipo_empleado.Descripcion} linea={l} setLinea={this.setLinea}></Lineas>
                      <br></br>
                      </div>
                    ))
                }
                </div>
         </div>

        )
        ;
    }
}