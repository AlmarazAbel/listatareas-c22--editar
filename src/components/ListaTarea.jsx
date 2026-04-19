import ItemTarea from "./ItemTarea";

const ListaTarea = ({listaTareas}) => {
  return (
    <ul className="list-group">

      {
        listaTareas.map((item,indice)=><ItemTarea key={indice} item={item}></ItemTarea>)

      }
     
   
    </ul>
  );
};

export default ListaTarea;
