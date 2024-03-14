import { useParams } from "react-router-dom";
import { showRequest } from "../services/axiosWrapper";
import { useEffect, useState } from "react";
import IToDo from "../interfaces/Todo";
const ToDoItem = () => {
  const { id } = useParams();
  const [data, setData] = useState<IToDo>();

  useEffect(() => {
    if (id) {
      showRequest(id)
        .then((data) => setData(data.data))
        .catch((error) => alert(error));
    }
  }, [id]);
  return (
    <div>
      <h2>{data?.title}</h2>
      <h5>Due Date: {data?.dueDate}</h5>
      <h5>Assignee: {data?.assignee}</h5>
      <h5>Description: {data?.description}</h5>
    </div>
  );
};

export default ToDoItem;
