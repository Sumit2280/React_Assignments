import ToDo from "./ToDo";
import useFetch from "../hooks/useFetch";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ChangeEvent, useMemo, useState } from "react";
import { deleteRequest, updateRequest } from "../services/axiosWrapper";
import IToDo from "../interfaces/Todo";
import { queryClient } from "..";

const ToDoList = () => {
  const [searchKey, setSearchKey] = useState("");
  const [visibletodos, setVisibletodos] = useState<IToDo[]>([]);
  const [sortKey, setSortKey] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [page, setPage] = useState(1);
  const { response, error, loader } = useFetch(page, sortKey, filterKey);

  const searchHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  };

  const sortHandle = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortKey(event.target.value);
  };

  const filterHandle = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterKey(event.target.value);
  };

  const nextPage = () => {
    if (page > Math.floor(response.length / 2)) {
      alert("this is the last page");
    } else {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page === 1) {
      alert("this is the first page");
    } else {
      setPage(page - 1);
    }
  };

  useMemo(() => {
    setVisibletodos(
      response.filter((item: IToDo) => item.title.includes(searchKey))
    );
  }, [response, searchKey]);

  const deleteToDo = async (key: number) => {
    deleteRequest(key)
      .then((data) => {
        console.log(data.data);
        queryClient.refetchQueries({ queryKey: "todos" });
      })
      .catch((err) => console.log(err));
  };

  const handleCheck = (key: number) => {
    const currentTodo = response.find((item: IToDo) => item.id === key);
    if (currentTodo) {
      currentTodo.isCompleted = !currentTodo?.isCompleted;
      updateRequest(key, currentTodo)
        .then(() => queryClient.refetchQueries({ queryKey: "todos" }))
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
      <h4>sort</h4>
      <select onChange={sortHandle}>
        <option value="">none</option>
        <option value="title">Text</option>
        <option value="dueDate">Date</option>
      </select>
      <h4>filter</h4>
      <select onChange={filterHandle}>
        <option value="">all</option>
        <option value="true">Completed</option>
        <option value="false  ">Not Completed</option>
      </select>
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <h1 className="text-danger">Todo List</h1>
          {visibletodos.map((item) => {
            return (
              <ul key={item.id}>
                <ToDo
                  handleCheck={handleCheck}
                  deleteToDo={deleteToDo}
                  item={item}
                />
              </ul>
            );
          })}
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" aria-label="Previous" onClick={prevPage}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link">
              {page}
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" aria-label="Next" onClick={nextPage}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ToDoList;
