
import { useState } from "react";
import ListaTarea from "./ListaTarea";
import ItemTarea from "./ItemTarea";

const FormularioTarea = () => {

  const[listaTareas,setListaTareas] =useState([])
  const[tarea,setTarea] =useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
    const tareaBuscada = listaTareas.find((itemTarea)=> itemTarea.toLocaleLowerCase() === tarea.toLocaleLowerCase())
    console.log(tareaBuscada)
    if(tareaBuscada){
      return alert('la tarea ya existe')
    }
    //agregar tarea al array
    setListaTareas([...listaTareas,tarea.trim()])

    //limpiar el form
    setTarea('')
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex ">
          <input
            type="text"
            className="form-control"
            id="inputTarea"
            placeholder="Ingresa una tarea"
            onChange={(e)=>setTarea(e.target.value)}
            value={tarea}
          />
          <button className="btn btn-primary">Enviar</button>
        </div>
      </form>
      <ListaTarea listaTareas={listaTareas}></ListaTarea>
    </section>
  );
};

export default FormularioTarea;
