const ItemTarea = ({ item, index, borrarTarea, habilitarEdicion }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {/* 1. Mostramos el nombre de la tarea desde el objeto */}
      {item.nombreTarea} 
      
      <div>
        <button 
          onClick={() => habilitarEdicion(item.nombreTarea, index)} 
          className="btn btn-sm btn-warning me-2"
        >
          Editar
        </button>
        {/* 2. Pasamos el _id de la tarea para poder borrarla en la base de datos */}
        <button 
          className="btn btn-danger btn-sm" 
          onClick={() => borrarTarea(item._id)}
        >
          Borrar
        </button>
      </div>
    </li>
  );
};

export default ItemTarea;