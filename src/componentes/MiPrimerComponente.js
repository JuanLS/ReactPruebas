import React, {Component} from 'react';

class MiPrimerComponente extends Component{

    render(){
        let datos = {
            año: 2001,
            directores: ['Juan Gonzalez', 'Lucia Ruiz'],
            frase: 'Cumpliendo sueños'
        };

        return (
            <React.Fragment>
                <h1>{'Desde ' + datos.año}</h1>
                <h3>{datos.frase}</h3>
                <ol>
                    {
                        datos.directores.map((director, i) => {
                            return (
                                <li key={i}>
                                    {director}
                                </li>
                            )
                        })
                    }
                </ol>
            </React.Fragment>
        )
    }
}

export default MiPrimerComponente;