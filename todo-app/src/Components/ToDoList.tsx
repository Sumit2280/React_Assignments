import ToDo from "./ToDo";
import useFetch from "../hooks/useFetch";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ChangeEvent, useMemo, useReducer } from "react";
import { deleteRequest, updateRequest } from "../services/axiosWrapper";
import IToDo from "../interfaces/Todo";
import { queryClient } from "..";

const initialState = {
  searchKey: "",
  sortKey: "",
  filterKey: "",
  page: 1,
};

const reducer = (state: any, action: any): any => {
  switch (action.type) {
    case "setSearchKey": {
      return {
        ...state,
        searchKey: action.event,
      };
    }
    case "setSortKey": {
      console.log("in sort");
      return {
        ...state,
        sortKey: action.event,
      };
    }
    case "setFilterKey": {
      return {
        ...state,
        filterKey: action.event,
      };
    }
    case "nextPage": {
      if (Math.floor(action.length / 2) < 1) {
        alert("this is the last page");
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          page: state.page + 1,
        };
      }
    }
    case "prevPage": {
        return {
          ...state,
          page: state.page - 1,
        };
    }
    default: {
      return state;
    }
  }
};

const ToDoList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { response, error, loader } = useFetch(
    state.page,
    state.sortKey,
    state.filterKey
  );

  const searchHandle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "setSearchKey", event: e.target.value });
  };

  const sortHandle = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "setSortKey", event: e.target.value });
  };

  const filterHandle = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "setFilterKey", event: e.target.value });
  };

  const nextPage = () => {
    dispatch({ type: "nextPage", length: response.length });
  };

  const prevPage = () => {
    dispatch({ type: "prevPage" });
  };

  const visibletodos: IToDo[] = useMemo(() => {
    return response.filter((item: IToDo) =>
      item.title.includes(state.searchKey)
    );
  }, [response, state.searchKey]);

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
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                aria-label="Previous"
                onClick={prevPage}
                disabled={state.page === 1}
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </button>
            </li>
            <li className="page-item">
              <span className="page-link">{state.page}</span>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                aria-label="Next"
                onClick={nextPage}
              >
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ToDoList;
