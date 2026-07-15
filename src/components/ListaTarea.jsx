import ItemTarea from "./ItemTarea";

const ListaTarea = ({ listaTareas, borrarTarea, habilitarEdicion }) => {
  return (
    <ul className="list-group">
      {
        listaTareas.map((tarea, indice) => (
          <ItemTarea 
            key={tarea._id} // Usamos el id de MongoDB como key única
            item={tarea} 
            index={indice} 
            borrarTarea={borrarTarea} 
            habilitarEdicion={habilitarEdicion} 
          />
        ))
      }
    </ul>
  );
};

export default ListaTarea;