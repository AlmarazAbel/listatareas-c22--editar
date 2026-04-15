import ListaTarea from "./ListaTarea";

const FormularioTarea = () => {

  return (
    <section>
      <form >
        <div className="mb-3 d-flex ">
          <input
            type="text"
            className="form-control"
            id="inputTarea"
            placeholder="Ingresa una tarea"
          />
          <button className="btn btn-primary">Enviar</button>
        </div>
      </form>
      <ListaTarea></ListaTarea>
    </section>
  );
};

export default FormularioTarea;
