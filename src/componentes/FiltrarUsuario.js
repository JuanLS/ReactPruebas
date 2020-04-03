//Este componente muestra la barra donde se filtraran los usuarios por nombre y contrendra toda la logica necesaria para filtrar
//Parametros:
//     

import React, { useState } from 'react';

export const FiltrarUsuario = props => {
    const actualizarNombreFiltro = e => props.metodoActualizarFiltro(e.target.value);

    const vaciarFiltro = () => props.metodoActualizarFiltro('');

return (
    
    <div className="container mt-5">
        <form>
            <div className="form-group">
                <label>Filtrar</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Indique el nombre por el que quiere filtrar"
                    value={props.valorFiltro}
                    onChange={actualizarNombreFiltro}>
                </input>
            </div>
            <button type="submit" className="btn btn-primary" onClick={vaciarFiltro}>Mostrar todos</button>
        </form>
    </div>

    )

}