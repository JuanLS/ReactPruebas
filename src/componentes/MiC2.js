import React, { useState } from 'react';

export const MiC2 = props => {
    const [titulo, setTitulo] = useState(props.titulo == null ? 'Titulo por defecto' : props.titulo);
    const [clase, setClase] = useState(props.clase == null ? 'Titulo por defecto' : props.clase);

return (
        <h4 className={`${clase} text-white text-center mt-5 p-2`}>
            {titulo}
        </h4>
    )

}

