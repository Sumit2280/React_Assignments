import { useEffect, useState } from "react";
import ToDo from "./ToDo";
import IToDo from "../interfaces/Todo";
import useFetch from "../hooks/useFetch";

const ToDoList = () => {
  const [todo, setToDo] = useState("");
  const [todolist, setToDoList] = useState<IToDo[]>([]);
  const [id, setId] = useState(2);
  const url = "http://localhost:8000/todo";
  const { response, error, loader } = useFetch(url);

  useEffect(() => {
    if (!error) {
      setToDoList(response);
    } else {
      alert(error);
    }
  }, [response, error]);

  const handleInput = (event: any) => {
    setToDo(event.target.value);
  };

  const saveInput = () => {
    if (todo) {
      const curr = {
        id: id,
        text: todo,
        isCompleted: false,
      };
      todolist.push(curr);
      setToDo("");
      setId(id + 1);
    } else {
      alert("enter the todo you want to add !");
    }
  };

  const deleteToDo = (key: number) => {
    const newList = todolist.filter((item) => item.id !== key);
    setToDoList(newList);
  };

  const handleCheck = (key: number) => {
    const currentTodo = todolist.find((item) => item.id === key);
    if (currentTodo) {
      currentTodo.isCompleted = !currentTodo.isCompleted;
      setToDoList([...todolist]);
    }
  };

  return (
    <>
      <div>
        <input type="text" value={todo} onChange={handleInput} />
        <button type="button" onClick={saveInput}>
          Add
        </button>
        {loader ? (
          <h3>loading....</h3>
        ) : (
          <div>
            <div>
              <h1>Not Completed Todo</h1>
              {todolist.map((item) => {
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
              {todolist.map((item) => {
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
    </>
  );
};

export default ToDoList;
