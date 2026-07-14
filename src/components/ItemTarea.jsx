// Agregamos index y habilitarEdicion a las props destructuradas
const ItemTarea = ({ item, index, borrarTarea, habilitarEdicion }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {item} 
      <div>
        {/* Cambiamos 'tarea' por 'item' que es la variable que contiene el texto */}
        <button 
          onClick={() => habilitarEdicion(item, index)} 
          className="btn btn-sm btn-warning me-2"
        >
          Editar
        </button>
        <button 
          className="btn btn-danger btn-sm" 
          onClick={() => borrarTarea(item)}
        >
          Borrar
        </button>
      </div>
    </li>
  );
};

export default ItemTarea;