import IToDo from "../interfaces/Todo";

const ToDo = ({
  handleCheck,
  deleteToDo,
  item,
}: {
  handleCheck: (index: number) => void;
  deleteToDo: (index: number) => void;
  item: IToDo;
}) => {
  return (
    <>
      <li>
        <input
          type="checkbox"
          onChange={() => handleCheck(item.id)}
          defaultChecked={item.isCompleted}
        />
        {item.text}
        <button onClick={() => deleteToDo(item.id)}>delete</button>
      </li>
    </>
  );
};

export default ToDo;
