import React, { useState } from "react";
//import { Link } from "react-router-dom";
export default class SupCalidad extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      Hallazgos: [],
      cantDef: [],
      pies: [],
    };
  }
  CantidadDefectos = [];
  pies = [];
  cargarDefectos = () => {
    if (localStorage.getItem("Hallazgos") == "") {
      this.state.data.map((i) => {
        this.CantidadDefectos.push({
          id: i.id,
          Descripcion: i.Descripcion,
          izquierdo: {
            pies: this.state.pies[1],
            cantidad: 0,
          },
          derecho: {
            pies: this.state.pies[0],
            cantidad: 0,
          },
          cantidad: 0,
        });
      });
      this.setState({ cantDef: this.CantidadDefectos });
      console.log(this.state.cantDef);
      console.log(this.state.pies);
    }else{
        this.setState({ cantDef: JSON.parse(localStorage.getItem("Hallazgos"))  });
        this.CantidadDefectos=JSON.parse(localStorage.getItem("Hallazgos"));
    }
  };

  componentDidMount() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios = async () => {
    const data = await fetch("http://localhost:1337/Defectos");
    const user = await data.json();
    this.setState({ data: user });
    this.obtenerPies();
  };
  obtenerPies = async () => {
    const pies = await fetch("http://localhost:1337/Pies");
    const p = await pies.json();
    this.setState({ pies: p });

    this.cargarDefectos();
  };

  agregarDerecha(id) {
    let defecto = {};
    let b = true;
    this.CantidadDefectos.map((i) => {
      i.id === id ? (i.derecho.cantidad = i.derecho.cantidad + 1) : (b = false);
    });
   // console.log(this.CantidadDefectos);
    this.setState({ cantDef: this.CantidadDefectos });
    this.registrar();
  }

  agregarIzquierdo(id) {
    let defecto = {};
    let b = true;
    this.CantidadDefectos.map((i) => {
      i.id === id
        ? (i.izquierdo.cantidad = i.izquierdo.cantidad + 1)
        : (b = false);
    });
   // console.log(this.CantidadDefectos);
    this.setState({ cantDef: this.CantidadDefectos });
    this.registrar();
  }
  quitarDerecha(id) {
    let defecto = {};
    let b = true;
    this.CantidadDefectos.map((i) => {
      i.id === id ? (i.derecho.cantidad = i.derecho.cantidad - 1) : (b = false);
    });
    console.log(this.CantidadDefectos);
    this.setState({ cantDef: this.CantidadDefectos });
    this.registrar();
  }

  quitarIzquierdo(id) {
    let defecto = {};
    let b = true;
    this.CantidadDefectos.map((i) => {
      i.id === id
        ? (i.izquierdo.cantidad = i.izquierdo.cantidad - 1)
        : (b = false);
    });
    //console.log(this.CantidadDefectos);
    this.setState({ cantDef: this.CantidadDefectos });
    this.registrar();
  }
  registrar() {
    localStorage.setItem("Hallazgos", JSON.stringify(this.state.cantDef));
  }

  render() {
    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Principal
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Inspeccion
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Hermanado
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link disabled"
                      href="#"
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      Disabled
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="Container">
            <div className="col-6  mx-auto justify-content-center">
              <br></br>
              <div className="card ">
                <h5 className="card-header">Pares de Primera</h5>
                <div className="card-body">
                  <button className="btn btn-danger">-</button> cant{" "}
                  <button className=" btn btn-success">+</button>
                </div>
              </div>
            </div>

            <br></br>
            <div className="col-8  mx-auto   justify-content-center">
              <div className="card ">
                <h5 className="card-header">Defectos</h5>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Defectos</th>
                        <th scope="col">Izquierdo</th>
                        <th scope="col">Derecho</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.cantDef.map((d) => (
                        <tr
                          key={d.id}
                          className={d.id > 5 ? "bg-info" : "bg-light"}
                        >
                          <th scope="row">{d.id}</th>
                          <td>{d.Descripcion}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => this.quitarIzquierdo(d.id)}
                            >
                              -
                            </button>{" "}
                            {d.izquierdo.cantidad}
                            <button
                              className=" btn btn-success"
                              onClick={() => this.agregarIzquierdo(d.id)}
                            >
                              +
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => this.quitarDerecha(d.id)}
                            >
                              -
                            </button>{" "}
                            {d.derecho.cantidad}
                            <button
                              className=" btn btn-success"
                              onClick={() => this.agregarDerecha(d.id)}
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
