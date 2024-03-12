import ToDo from "./ToDo";
import useFetch from "../hooks/useFetch";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ChangeEvent, useMemo, useState } from "react";
import { deleteRequest, updateRequest } from "../services/axiosWrapper";
import IToDo from "../interfaces/Todo";

const ToDoList = () => {
  const { response, error, loader, refetch } = useFetch();
  const [searchKey, setSearchKey] = useState("");
  const [visibletodos, setVisibletodos] = useState<IToDo[]>([]);
  const [sortKey, setSortKey] = useState("");

  const searchHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  };

  const sortHandle = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortKey(event.target.value);
  };

  useMemo(() => {
    setVisibletodos(response.filter((item) => item.text.includes(searchKey)));
  }, [response, searchKey]);

  useMemo(() => {
    if (sortKey !== "none") {
      setVisibletodos(
        response.sort((a, b) => {
          if (sortKey === "text") {
            return a.text > b.text ? 1 : -1;
          } else {
            return a.dueDate > b.dueDate ? 1 : -1;
          }
        })
      );
    } else {
      refetch({});
    }
  }, [response, sortKey, refetch]);

  const deleteToDo = async (key: number) => {
    deleteRequest(key)
      .then((data) => console.log(data.data))
      .catch((err) => console.log(err));
    refetch({});
  };

  const handleCheck = (key: number) => {
    const currentTodo = response.find((item) => item.id === key);
    if (currentTodo) {
      currentTodo.isCompleted = !currentTodo?.isCompleted;
      updateRequest(key, currentTodo)
        .then(() => refetch({}))
        .catch((err) => alert(err));
      console.log(currentTodo);
    } else {
      alert("not found");
    }
  };

  if (error) {
    return <h1>Error....</h1>;
  }
  if (loader) {
    return <h1>Loading....</h1>;
  }
  return (
    <div>
      <Container>
        <Row>
          <Col sm={4}>
            <Form className="mt-4 d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 rounded-pill w-auto"
                aria-label="Search"
                onChange={searchHandle}
              />
            </Form>
          </Col>
        </Row>
      </Container>
      <select onChange={sortHandle}>
        <option value="none">none</option>
        <option value="text">Text</option>
        <option value="date">Date</option>
      </select>
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <h1 className="text-danger">Not Completed Todo</h1>
          <h5>Task Due Date</h5>
          {visibletodos.map((item) => {
            if (!item.isCompleted) {
              return (
                <ul key={item.id}>
                  <ToDo
                    handleCheck={handleCheck}
                    deleteToDo={deleteToDo}
                    item={item}
                  />
                </ul>
              );
            }
          })}
        </div>
        <div>
          <h1>Completed Todo</h1>
          <h5>Task Due Date</h5>
          {visibletodos.map((item) => {
            if (item.isCompleted) {
              return (
                <ul key={item.id}>
                  <ToDo
                    handleCheck={handleCheck}
                    deleteToDo={deleteToDo}
                    item={item}
                  />
                </ul>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
