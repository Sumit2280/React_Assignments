import { useState } from "react"
import ToDo from "./ToDo";
import IToDo from "../interfaces/Todo";


const ToDoList = () => {
  const [todo, setToDo] = useState('');
  const [todolist, setToDoList] = useState<IToDo[]>([])

  const handleInput = (event: any) => {
    setToDo(event.target.value)
  }

  const saveInput = () => {
    if (todo) {  //can use trim
      const curr = {
        text: todo,
        isCompleted: false
      }
      setToDoList([...todolist, curr])
      setToDo('')
    }
    else {
      alert("enter the todo you want to add !");
    }
  }

  const deleteToDo = (index: any) => {
    const updatedTodos = [...todolist]; 
    updatedTodos.splice(index, 1);
    setToDoList(updatedTodos);
  }

  const handleCheck = (index: any) => {
    const currentTodo = todolist[index];
    currentTodo.isCompleted = !currentTodo.isCompleted;
    setToDoList([...todolist])
  }



  return (
    <>
      <div>
        <input type="text" value={todo} onChange={handleInput} />
        <button type="button" onClick={saveInput}>Add</button>
        <div>
          <h1>Not Completed Todo</h1>
          {
            todolist.map((item, index) => {
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
                )
              }
            })
          }
        </div>
        <div>
          <h1>Completed Todo</h1>
          {
            todolist.map((item, index) => {
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
                )
              }
            })
          }
        </div>
      </div>
    </>
  )
}

export default ToDoList