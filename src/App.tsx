import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./page/SignUp";
import SignIn from "./page/SignIn";
import Todos from "./page/Todos";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/todos" element={<Todos />}></Route>
      </Routes>
    </div>
  );
}

export default App;
