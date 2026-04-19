const ItemTarea = ({item}) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {item} <button className="btn btn-danger">Borrar</button>
    </li>
  );
};

export default ItemTarea;
