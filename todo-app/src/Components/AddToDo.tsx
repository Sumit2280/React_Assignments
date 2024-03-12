import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../services/axiosWrapper";

const AddToDo = () => {
  const [todo, setToDo] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const navigate = useNavigate();

  const saveInput = async () => {
    if (todo) {
      postRequest({
        text: todo,
        isCompleted: false,
        dueDate,
      })
        .then((data) => {
          console.log(data.data);
          setToDo("");
        })
        .catch((err) => console.log(err));
      navigate("/");
    } else {
      alert("Please Enter something to add");
    }
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={todo}
          name="name"
          onChange={(e) => {
            setToDo(e.target.value);
          }}
        />
        <input
          type="date"
          onChange={(e) => {
            setDueDate(e.target.value);
          }}
        />
      </form>
      <button type="submit" onClick={saveInput}>
        Add
      </button>
    </div>
  );
};

export default AddToDo;
export const addInput = () => {};
