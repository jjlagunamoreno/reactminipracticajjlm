import React, { Component } from 'react';
// implementamos la libreria de axios
import axios from 'axios';

export default class PracticaEquipos extends Component {
    cajaEquipos = React.createRef();
    cajaJugadores = React.createRef();

    state = {
        equipos: [],
        jugadores: []
    }

    // buscamos a los jugadores según el valor proporcionado en el input 'cajaJugadores' con trim() para lo que sea*
    buscarJugadores = (e) => {
        e.preventDefault();
        let inputValorJugador = this.cajaJugadores.current.value.trim();

        console.log("Buscando jugador por... ", inputValorJugador);
        const urlGetJugadoresNombres = "https://apiejemplos.azurewebsites.net/api/Jugadores/";

        axios.get(urlGetJugadoresNombres).then(response => {
            const jugadores = response.data;
            const seleccionJugadores = jugadores.filter(jugador =>
                jugador.nombre.toLowerCase().includes(inputValorJugador.toLowerCase())
            );

            this.setState({
                jugadores: seleccionJugadores
            });

            console.log("Jugadores encontrados: ", seleccionJugadores);
        })
    }

    // mostramos la selección del equipo seleccionado en base a su valor en value 'idEquipo'
    buscarSeleccionEquipos = (e) => {
        e.preventDefault();
        let selectedEquipoId = this.cajaEquipos.current.value;
        console.log("Equipo seleccionado ID: ", selectedEquipoId);

        const urlGetJugadores = "https://apiejemplos.azurewebsites.net/api/Jugadores/JugadoresEquipos/";
        axios.get(urlGetJugadores + selectedEquipoId).then(response => {
            console.log(response.data);
            const seleccionJugadores = response.data;
            this.setState({
                jugadores: seleccionJugadores
            });
        });
    }

    // cargar los equipos en el select
    loadEquipos = () => {
        const urlGetEquipos = "https://apiejemplos.azurewebsites.net/api/Equipos";
        axios.get(urlGetEquipos).then(response => {
            const equiposExtraidos = response.data;
            this.setState({
                equipos: equiposExtraidos
            });
        });
    }
    componentDidMount = () => {
        this.loadEquipos();
    }
    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <h1>Mini Práctica React</h1>

                <form onSubmit={this.buscarJugadores}>
                    <label>Nombre Jugador: </label>
                    <input type='text' ref={this.cajaJugadores} />
                    <button>Buscar por NOMBRE</button>
                </form>
                <hr />
                <form onSubmit={this.buscarSeleccionEquipos}>
                    <label>Seleccione un equipo</label>
                    <select ref={this.cajaEquipos}>
                        {
                            this.state.equipos.map((equipo, index) => {
                                return (
                                    <option key={index} value={equipo.idEquipo}>
                                        {equipo.nombre}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <button>Buscar Jugadores</button>
                </form>
                <hr />
                <table style={{ borderCollapse: "collapse", border: "1px solid black" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid black" }}>Imagen</th>
                            <th style={{ border: "1px solid black" }}>Nombre</th>
                            <th style={{ border: "1px solid black" }}>Posición</th>
                            <th style={{ border: "1px solid black" }}>País</th>
                            <th style={{ border: "1px solid black" }}>Fecha Nacimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.jugadores.map((jugador, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ border: "1px solid black" }}>
                                            <img style={{ width: "100px", height: "100px" }} src={jugador.imagen} alt={jugador.nombre} />
                                        </td>
                                        <td style={{ border: "1px solid black" }}>{jugador.nombre}</td>
                                        <td style={{ border: "1px solid black" }}>{jugador.posicion}</td>
                                        <td style={{ border: "1px solid black" }}>{jugador.pais}</td>
                                        <td style={{ border: "1px solid black" }}>{jugador.fechaNacimiento}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
        )
    }
}
