import React from 'react';

export const UsuarioRow = props => (
    <tr key={props.u.idU}>
        <td>{props.u.nombre}</td>
        <td>{props.u.apellidos}</td>
    </tr>
);
