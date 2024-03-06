import IToDo from "../interfaces/Todo";

interface IProps {
  handleCheck: (index: number) => void;
  deleteToDo: (index: number) => void;
  item: IToDo;
  index: number;
}

const ToDo = (props: IProps) => {
  const { handleCheck, deleteToDo, item, index } = props;
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => handleCheck(index)}
        defaultChecked={item.isCompleted}
      />
      {item.text}
      <button onClick={() => deleteToDo(index)}>delete</button>
    </li>
  );
};

export default ToDo;
