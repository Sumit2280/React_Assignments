import { useState } from "react"

interface IToDo {
  text: string,
  isCompleted: boolean
}

const ToDo = () => {
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
      console.log("enter something");
    }
  }

  const deleteToDo = (index: any) => {
    setToDoList(oldValues => {
      return oldValues.filter((_, i) => i !== index)
    })
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
                    <li>
                      <input type="checkbox" onChange={() => handleCheck(index)} />
                      {item.text}
                      <button onClick={() => deleteToDo(index)}>delete</button>
                    </li>
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
                    <li key={index}>
                      <input type="checkbox" onChange={() => handleCheck(index)} defaultChecked />
                      {item.text}
                      <button onClick={() => deleteToDo(index)}>delete</button>
                    </li>
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

export default ToDo