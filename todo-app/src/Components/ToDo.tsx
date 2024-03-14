import { useNavigate } from "react-router-dom";
import IToDo from "../interfaces/Todo";

interface IProps {
  handleCheck: (key: number) => void;
  deleteToDo: (key: number) => void;
  item: IToDo;
}

const ToDo = (props: IProps) => {
  const { handleCheck, deleteToDo, item } = props;
  const navigate = useNavigate();
  const showToDo = (key: number) => {
    navigate(`/showToDo/${key}`);
  };
  return (
    <li>
      <input
        type="checkbox"
        className="form-check-input"
        onChange={() => handleCheck(item.id)}
        defaultChecked={item.isCompleted}
      />
      <h4 onClick={() => showToDo(item.id)}>{item.title}</h4>
      <h5>Due Date: {item.dueDate}</h5>
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => deleteToDo(item.id)}
      >
        delete
      </button>
    </li>
  );
};

export default ToDo;
