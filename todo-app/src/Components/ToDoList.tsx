import ToDo from "./ToDo";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ToDoList = () => {
  const url = "http://localhost:8000/todo";
  const { response, error, loader, refetch } = useFetch(url);
  const navigate = useNavigate();

  const deleteToDo = async (key: number) => {
    await axios
      .delete(`${url}/${key}`)
      .then((data) => console.log(data.data))
      .catch((err) => console.log(err));
    refetch({});
  };

  const handleCheck = (key: number) => {
    const currentTodo = response.find((item) => item.id === key);
    if (currentTodo) {
      currentTodo.isCompleted = !currentTodo?.isCompleted;
      const currid = currentTodo.id;
      axios
        .put(`${url}/${currid}`, currentTodo)
        .then(() => refetch({}))
        .catch((err) => alert(err));
      console.log(currentTodo);
    } else {
      alert("not found");
    }
  };

  return (
    <>
      <div>
        <button onClick={() => navigate("/create")}>Add</button>
      </div>
      <div>
        {!error ? (
          <div>
            {loader ? (
              <h3>loading....</h3>
            ) : (
              <div>
                <div>
                  <h1>Not Completed Todo</h1>
                  {response.map((item) => {
                    if (!item.isCompleted) {
                      return (
                        <ul key={item.id}>
                          <ToDo
                            handleCheck={handleCheck}
                            deleteToDo={deleteToDo}
                            item={item}
                          />
                        </ul>
                      );
                    }
                  })}
                </div>
                <div>
                  <h1>Completed Todo</h1>
                  {response.map((item) => {
                    if (item.isCompleted) {
                      return (
                        <ul key={item.id}>
                          <ToDo
                            handleCheck={handleCheck}
                            deleteToDo={deleteToDo}
                            item={item}
                          />
                        </ul>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2>Error....</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default ToDoList;
