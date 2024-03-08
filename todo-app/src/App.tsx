import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ToDoList from "./Components/ToDoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddToDo from "./Components/AddToDo";
import ToDo from "./Components/ToDo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<ToDoList />}></Route>
        <Route
          path="/create"
          element={<AddToDo/>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
