import "./App.css";
import ToDoList from "./Components/ToDoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddToDo from "./Components/AddToDo";
import NavBar from "./Components/NavBar";
import ToDoItem from "./Components/ToDoItem";
function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ToDoList />}></Route>
          <Route path="/create" element={<AddToDo />}></Route>
          <Route path="/showToDo/:id" element={<ToDoItem />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
