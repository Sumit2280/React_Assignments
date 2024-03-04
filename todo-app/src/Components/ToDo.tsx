import IToDo from "../interfaces/Todo";

const ToDo = ({ handleCheck, deleteToDo, item, index }: { handleCheck: (index: number) => void, deleteToDo: (index: number) => void, item: IToDo, index: number }) => {
  return (
    <>
      <li>
        <input type="checkbox" onChange={() => handleCheck(index)} defaultChecked={item.isCompleted}/>
        {item.text}
        <button onClick={() => deleteToDo(index)}>delete</button>
      </li>
    </>
  )
}

export default ToDo;