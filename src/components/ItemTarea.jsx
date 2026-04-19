const ItemTarea = ({item ,borrarTarea}) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {item} <button className="btn btn-danger" onClick={()=>borrarTarea(item)}>Borrar</button>
    </li>
  );
};

export default ItemTarea;
