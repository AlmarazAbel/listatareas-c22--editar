import { useState } from "react";
import ListaTarea from "./ListaTarea";

const FormularioTarea = () => {
  const [listaTareas, setListaTareas] = useState([]);
  const [tarea, setTarea] = useState('');
  
  // NUEVOS ESTADOS: Para saber si estamos editando y qué índice estamos editando
  const [editando, setEditando] = useState(false);
  const [indiceEditando, setIndiceEditando] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tareaLimpia = tarea.trim();

    if (tareaLimpia === '') return;

    // Validar si la tarea ya existe (ignorando la que estamos editando actualmente)
    const tareaExiste = listaTareas.some(
      (itemTarea, index) => 
        itemTarea.toLowerCase() === tareaLimpia.toLowerCase() && 
        (!editando || index !== indiceEditando)
    );

    if (tareaExiste) {
      return alert('La tarea ya existe');
    }

    if (editando) {
      // --- MODO EDICIÓN ---
      const nuevasTareas = [...listaTareas];
      nuevasTareas[indiceEditando] = tareaLimpia;
      setListaTareas(nuevasTareas);
      
      // Resetear estados de edición
      setEditando(false);
      setIndiceEditando(null);
    } else {
      // --- MODO CREACIÓN ---
      setListaTareas([...listaTareas, tareaLimpia]);
    }

    // Limpiar el input
    setTarea('');
  };

  const borrarTarea = (nombreTarea) => {
    const tareasFiltradas = listaTareas.filter((item) => item !== nombreTarea);
    setListaTareas(tareasFiltradas);
    
    // Si borramos la tarea que estábamos editando, cancelamos la edición
    if (editando && listaTareas[indiceEditando] === nombreTarea) {
      cancelarEdicion();
    }
  };

  // NUEVA FUNCIÓN: Se ejecutará cuando el usuario haga clic en "Editar" desde la lista
  const habilitarEdicion = (nombreTarea, index) => {
    setTarea(nombreTarea);
    setEditando(true);
    setIndiceEditando(index);
  };

  // NUEVA FUNCIÓN: Por si el usuario quiere arrepentirse de editar
  const cancelarEdicion = () => {
    setTarea('');
    setEditando(false);
    setIndiceEditando(null);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex gap-2"> {/* Agregado gap-2 para separar los botones */}
          <input
            type="text"
            className="form-control"
            id="inputTarea"
            placeholder="Ingresa una tarea"
            onChange={(e) => setTarea(e.target.value)}
            value={tarea}
            required
          />
          
          {/* Si está editando, mostramos "Guardar" y el botón de "Cancelar" al lado */}
          {editando ? (
            <>
              <button className="btn btn-warning" type="submit">Guardar</button>
              <button className="btn btn-secondary" type="button" onClick={cancelarEdicion}>
                Cancelar
              </button>
            </>
          ) : (
            <button className="btn btn-primary" type="submit">Enviar</button>
          )}
        </div>
      </form>
      
      {/* Pasamos la función habilitarEdicion al componente ListaTarea */}
      <ListaTarea 
        listaTareas={listaTareas} 
        borrarTarea={borrarTarea} 
        habilitarEdicion={habilitarEdicion} 
      />
    </section>
  );
};

export default FormularioTarea;