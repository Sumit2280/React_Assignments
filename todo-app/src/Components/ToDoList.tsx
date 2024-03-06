import { useEffect, useState } from "react";
import ToDo from "./ToDo";
import IToDo from "../interfaces/Todo";
import useFetch from "../hooks/useFetch";

const ToDoList = () => {
  const [todo, setToDo] = useState("");
  const [todolist, setToDoList] = useState<IToDo[]>([]);
  const url = "http://localhost:8000/todo";
  const { response, error, loader } = useFetch(url);

  useEffect(() => {
    if (!error) {
      setToDoList(response);
    } else {
      alert(error);
    }
  }, [response, error]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDo(event.target.value);
  };

  const saveInput = () => {
    if (todo) {
      const curr = {
        text: todo,
        isCompleted: false,
      };
      todolist.push(curr);
      setToDo("");
    } else {
      alert("enter the todo you want to add !");
    }
  };

  const deleteToDo = (index: number) => {
    const updatedTodos = [...todolist];
    updatedTodos.splice(index, 1);
    setToDoList(updatedTodos);
  };

  const handleCheck = (index: number) => {
    const currentTodo = todolist[index];
    currentTodo.isCompleted = !currentTodo.isCompleted;
    setToDoList([...todolist]);
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
              {todolist.map((item, index) => {
                if (!item.isCompleted) {
                  return (
                    <ul>
                      <ToDo
                        handleCheck={handleCheck}
                        deleteToDo={deleteToDo}
                        item={item}
                        index={index}
                      />
                    </ul>
                  );
                }
              })}
            </div>
            <div>
              <h1>Completed Todo</h1>
              {todolist.map((item, index) => {
                if (item.isCompleted) {
                  return (
                    <ul>
                      <ToDo
                        handleCheck={handleCheck}
                        deleteToDo={deleteToDo}
                        item={item}
                        index={index}
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
