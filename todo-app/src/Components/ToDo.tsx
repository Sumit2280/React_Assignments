import IToDo from "../interfaces/Todo";

interface IProps {
  handleCheck: (key: number) => void;
  deleteToDo: (key: number) => void;
  item: IToDo;
}

const ToDo = (props: IProps) => {
  const { handleCheck, deleteToDo, item } = props;
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => handleCheck(item.id)}
        defaultChecked={item.isCompleted}
      />
      {item.text}
      <button onClick={() => deleteToDo(item.id)}>delete</button>
    </li>
  );
};

export default ToDo;
