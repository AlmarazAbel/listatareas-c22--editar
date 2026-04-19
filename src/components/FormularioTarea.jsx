
import { useState } from "react";
import ListaTarea from "./ListaTarea";

const FormularioTarea = () => {

  const[listaTareas,setListaTareas] =useState([])
  const[tarea,setTarea] =useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()

    //agregar tarea al arrat

    setListaTareas([...listaTareas,tarea])

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
      <ListaTarea></ListaTarea>
    </section>
  );
};

export default FormularioTarea;
