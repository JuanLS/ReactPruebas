import React, { useState, useEffect } from 'react';
import {TaskRow} from './componentes/TaskRow';
import {TaskBanner} from './componentes/TaskBanner';
import {TaskCreator} from './componentes/TaskCreator';
import {VisibilityControl} from './componentes/VisibilityControl';
import {UsuarioRow} from './componentes/UsuarioRow';
import { FiltrarUsuario } from './componentes/FiltrarUsuario';
import { MiC2 } from './componentes/MiC2';
import ReactPlayer from 'react-player'

function App() {

const [userName, setUserName] = useState('Juan')

const [taskItems, setTaskItems] = useState([
  {name: 'Primera Tarea', done: false},
  {name: 'Segunda Tarea', done: false},  
  {name: 'Tercera Tarea', done: true},  
  {name: 'Cuarta Tarea', done: false}
])

const [usuarioItems, setUsuarioItems] = useState([
  {nombre: 'Juan Eusebio', apellidos: 'Gonzalez Estevez', idU: 1},
  {nombre: 'Lucia', apellidos: 'Ruiz Perez', idU: 2},
  {nombre: 'Juan', apellidos: 'Gonzalez Ruiz', idU: 3}
])

const [nombreFiltro, setNombreFiltro] = useState('')

const [showCompleted, setShowCompleted] = useState(true);

/*Esta funcion se ejecuta cuando arranca la aplicacion*/
useEffect(() => {
  let data = localStorage.getItem('task');
  if (data != null) {
    setTaskItems(JSON.parse(data));
  } else {
    setUserName('Usuario de ejemplo');
    setTaskItems([
      {name: 'Primera Tarea de Ejemplo', done: false},
      {name: 'Segunda Tarea de Ejemplo', done: false},  
      {name: 'Tercera Tarea de Ejemplo', done: true},  
      {name: 'Cuarta Tarea de Ejemplo', done: false}
    ])
    setShowCompleted(true);
  }

  let data2 = localStorage.getItem('nombreFiltro');
  if (data2 != null) {
    setNombreFiltro(JSON.parse(data2))
  } else {
    setNombreFiltro('')
  }
}, [])


//Esta funcion se ejecutara cada vez que TaskItems cambie
useEffect(() => {
  localStorage.setItem('task', JSON.stringify(taskItems));
}, [taskItems])

//Cada vez que cambia el arregle de usuarios o el filtro del nombre de guarda su nuevo valor en localStorage y se ordena por nombre la lista
useEffect(() => {
  localStorage.setItem('nombreFiltro', JSON.stringify(nombreFiltro))
  setUsuarioItems(usuarioItems.sort((a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)))
}, [nombreFiltro, usuarioItems])


const mostrarUsuarioRow = () => (
  usuarioItems
    .filter(u => (u.nombre.indexOf(nombreFiltro) >= 0))
    .map(u => (<UsuarioRow u={u} key={u.idU}/>))
)


const createNewTask = taskName => {
  if (!taskItems.find(t => t.name === taskName)) {
    setTaskItems([...taskItems, {name: taskName, done: false}])
  }
}


const toggleTask = task =>
  setTaskItems(taskItems.map(t => (t.name === task.name ? {...t, done: !t.done} : t)))


const taskTableRows = (doneValue) => 
  taskItems
    .filter(task => task.done === doneValue)
    .map(task => (
    <TaskRow task={task} key={task.name} toggleTask={toggleTask}/>
  )
)

  return (

    <div>
      <TaskBanner userName={userName} taskItems={taskItems} />
      <TaskCreator callback={createNewTask}/>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Completada</th>
          </tr> 
        </thead>
        <tbody>
          {taskTableRows(false)} 
        </tbody>
      </table>

      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl
          description="tareas completadas"
          isChecked={showCompleted}
          callback={checked => setShowCompleted(checked)}
         />
      </div>

      {
       showCompleted && (
         <table className="table table-strped table-bordered">
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Completada</th>
            </tr>
          </thead>
          <tbody>
           {taskTableRows(true)} 
          </tbody>
         </table>
        )
      }


{/* Mostramos el input que filtrará la lista de usuarios */}

      <div>
        <FiltrarUsuario valorFiltro={nombreFiltro} metodoActualizarFiltro={setNombreFiltro}/>
      </div>
      

{/* Este modulo escribe en una tabla los dtos de los usuarios */}
      
      <div className="container-fluid mt-5">
        <h4 className="text-white  bg-primary text-center p-3">
          Usuarios
        </h4>     
        <table className="table table-strped table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
            </tr>
          </thead>
          <tbody>
            {mostrarUsuarioRow(usuarioItems)} 
          </tbody>
        </table>         
        {/* Ejemplo de cosas que se pueden pasar entre llaves y como se pueden anidar las condiciones*/}
        { nombreFiltro === 'Juan' && <h4 className="small">Se estan mostrando los Juanes</h4>}
        { 
          nombreFiltro === 'Lucia' ? 
            <h4 className="small">Se estan mostrando las Lucias</h4> 
          :
            nombreFiltro === '' ? 
              <h4 className="small">Se estan mostrando todos</h4> 
            : 
              <h4 className="small">No se estan mostrando las Lucias</h4> 
        }
      </div>

      <MiC2 clase='bg-primary'/> 
      <MiC2 clase='bg-danger' titulo="LatinSalsa" />      

      <div className="container center">
        <ReactPlayer 
            url='https://www.youtube.com/watch?v=uJo6GnDYi7Y' 
            playing 
            config={{youtube: {playerVars: { showinfo: 0 }}}}
            controls="true" 
            playbackRate="true" />
      </div>  
      

    </div>

  );
}

export default App;
