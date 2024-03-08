import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddToDo = () => {
  const [todo, setToDo] = useState<string>("");
  const url = "http://localhost:8000/todo";
  const navigate = useNavigate();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDo(event.target.value);
  };

  const saveInput = async () => {
    if (todo) {
      await axios
        .post(url, {
          text: todo,
          isCompleted: false,
        })
        .then((data) => {
          console.log(data.data);
          setToDo("");
        })
        .catch((err) => console.log(err));
      navigate("/home");
    } else {
      alert("Please Enter something to add");
    }
  };
  return (
    <>
      <div>
        <input type="text" value={todo} onChange={handleInput} />
        <button type="button" onClick={saveInput}>
          Add
        </button>
      </div>
    </>
  );
};

export default AddToDo;
export const addInput = () => {};
