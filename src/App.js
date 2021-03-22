 
import React from "react";
import Login from "./components/Login";
import SeleccionarLinea from "./components/SeleccionarLinea";
import SupCalidad from "./components/SupCalidad";
import SupLinea from "./components/SupLinea";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


export default class App extends React.Component {
  constructor() {
    super();
    this.state={
    user:{},
    estado:true
  }
   
  } 
  linea=0;
  addLinea=(id)=>{
    this.linea=id;
    
  }
  addUSer=(u)=>{
  this.setState({user:u});
  localStorage.setItem('user',JSON.stringify(u));

  //console.log("APP", this.state.user)
  }
  render() {
    return (
      <div className="">
     
        <Router>
          <Switch>
          <Route path="/SupCalidad" exact>
                <SupCalidad></SupCalidad>
          </Route>
          <Route path="/SupLinea" exact>
               <SupLinea></SupLinea>
          </Route>
          <Route path="/SelccionarLinea" exact>
              <SeleccionarLinea user={this.state.user} addLinea={this.addLinea}></SeleccionarLinea>
            </Route>
            <Route path="/" exact>
              <Login addUSer={this.addUSer}></Login>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
