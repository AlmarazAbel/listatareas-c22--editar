import ItemTarea from "./ItemTarea";

// 1. Recibimos "habilitarEdicion" en las props destructuradas
const ListaTarea = ({ listaTareas, borrarTarea, habilitarEdicion }) => {
  return (
    <ul className="list-group">
      {
        listaTareas.map((item, indice) => (
          <ItemTarea 
            key={indice} 
            item={item} 
            index={indice} // 2. Pasamos el índice (posición en el array)
            borrarTarea={borrarTarea} 
            habilitarEdicion={habilitarEdicion} // 3. Le pasamos la función a ItemTarea
          />
        ))
      }
    </ul>
  );
};

export default ListaTarea;