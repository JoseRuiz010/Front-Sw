import React from "react";
import { Link } from "react-router-dom";
export default class Login extends React.Component {
    constructor(props) {
        super(props);
       
        
      } 
      state = {
            data:[],
            form:{
                user:'',
                pass:''
            },
            isUserValido:false
           
        };
      componentDidMount(){
        this.obtenerUsuarios();
        localStorage.setItem('user','');
      }

     obtenerUsuarios=async()=>{
        const data=  await fetch('http://localhost:1337/Empleados')
        const  user= await data.json();
        this.setState({data:user});
     }


      handleChange=e=>{
        this.setState({
            form:{
                ...this.state.form,[e.target.name]:e.target.value
               }
        })
     //   console.log(this.state.form);
       }

      guardar=()=>{
         // console.log(this.state.form);
          //console.log(this.state.data);
          this.validarUsuario();
      }
      validarUsuario=()=>{
          let b=true;
          this.setState({isUserValido:false})
          let form=this.state.form;
          let users=this.state.data
          users.map(u=>u.user===form.user & u.pass===form.pass ? this.cambiarStado(u):b=false )
          
        console.log(this.state.isUserValido);
      }
      cambiarStado=(u)=>{
         this.setState({ isUserValido:true})
         console.log("validado",u)
         this.props.addUSer(u)
        
        
      }
    

  render() {
    
     if(this.state.data.length<1){
       return(
         <h1>Ocurrio un error</h1>
       )
     }

    return (
      <div>
        
        {
            this.state.data.map(u=>(
                <li key={u.id}>{u.user}-{u.pass}</li>
            ))
        }
        <div className="container mx-auto">
          <form >
            <div className="col-6 mx-auto">
              <div className="card">
                <div className="card-header text-center">Loggin</div>
                <br></br>
                <div className="col">
                  <input
                    className="form-control py-2"
                    placeholder="User"
                    name="user"
                    onChange={this.handleChange}
                  ></input>
                   
                  <br />
                  <input
                    className="form-control py-2"
                    placeholder="Password"
                    name="pass"
                    onChange={this.handleChange}
                  ></input>

                  <br />

                  <Link to={this.state.isUserValido===true?"/SelccionarLinea":"/"} onClick={this.guardar} className="btn btn-primary">
                Sign up
              </Link>

                  <br></br>
                </div>
              </div>
            </div>
          </form>
        </div>
        ;
      </div>
    );
  }
}
