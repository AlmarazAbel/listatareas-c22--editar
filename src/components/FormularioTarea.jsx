import { useState, useEffect } from "react";
import ListaTarea from "./ListaTarea";

// URL de tu Backend (Modifícala si tu puerto o ruta es diferente)
const URL_API = "http://localhost:4000/api/tareas"; 

const FormularioTarea = () => {
  const [listaTareas, setListaTareas] = useState([]);
  const [tarea, setTarea] = useState('');
  const [editando, setEditando] = useState(false);
  const [indiceEditando, setIndiceEditando] = useState(null);

  // 1. CARGAR TAREAS AL INICIAR: Consultamos la API cuando se monta el componente
  useEffect(() => {
    obtenerTareas();
  }, []);

  const obtenerTareas = async () => {
    try {
      const respuesta = await fetch(URL_API);
      if (respuesta.ok) {
        const datos = await respuesta.json();
        setListaTareas(datos); // Guardamos el array de objetos que viene de la base de datos
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tareaLimpia = tarea.trim();
    if (tareaLimpia === '') return;

    // Validar si la tarea ya existe en el estado local (ignorando la que estamos editando)
    const tareaExiste = listaTareas.some(
      (itemTarea, index) => 
        itemTarea.nombreTarea.toLowerCase() === tareaLimpia.toLowerCase() && 
        (!editando || index !== indiceEditando)
    );

    if (tareaExiste) {
      return alert('La tarea ya existe');
    }

    try {
      if (editando) {
        // --- MODO EDICIÓN (PUT) ---
        const tareaAEditar = listaTareas[indiceEditando];
        const respuesta = await fetch(`${URL_API}/${tareaAEditar._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombreTarea: tareaLimpia }) // Cambia 'nombreTarea' si tu backend usa otro nombre
        });

        if (respuesta.ok) {
          obtenerTareas(); // Recargamos de la base de datos para ver los cambios
          setEditando(false);
          setIndiceEditando(null);
        }
      } else {
        // --- MODO CREACIÓN (POST) ---
        const respuesta = await fetch(URL_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombreTarea: tareaLimpia })
        });

        if (respuesta.ok) {
          obtenerTareas(); // Recargamos la lista actualizada
        }
      }
      setTarea(''); // Limpiamos el input
    } catch (error) {
      console.error("Error al procesar la tarea:", error);
    }
  };

  // --- BORRAR TAREA (DELETE) ---
  const borrarTarea = async (idTarea) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar esta tarea?");
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`${URL_API}/${idTarea}`, {
        method: "DELETE"
      });

      if (respuesta.ok) {
        obtenerTareas(); // Recargamos tras eliminar
        if (editando && listaTareas[indiceEditando]._id === idTarea) {
          cancelarEdicion();
        }
      }
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const habilitarEdicion = (nombreTarea, index) => {
    setTarea(nombreTarea);
    setEditando(true);
    setIndiceEditando(index);
  };

  const cancelarEdicion = () => {
    setTarea('');
    setEditando(false);
    setIndiceEditando(null);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex gap-2">
          <input
            type="text"
            className="form-control"
            id="inputTarea"
            placeholder="Ingresa una tarea"
            onChange={(e) => setTarea(e.target.value)}
            value={tarea}
            required
          />
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
      <ListaTarea 
        listaTareas={listaTareas} 
        borrarTarea={borrarTarea} 
        habilitarEdicion={habilitarEdicion} 
      />
    </section>
  );
};

export default FormularioTarea;