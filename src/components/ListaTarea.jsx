import ItemTarea from "./ItemTarea";

const ListaTarea = ({listaTareas,borrarTarea}) => {
  return (
    <ul className="list-group">

      {
        listaTareas.map((item,indice)=><ItemTarea key={indice} item={item} borrarTarea={borrarTarea}></ItemTarea>)

      }
     
   
    </ul>
  );
};

export default ListaTarea;
