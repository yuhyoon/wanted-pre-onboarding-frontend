import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./page/SignUp";
import SignIn from "./page/SignIn";
import Todos from "./page/Todos";

import AuthWrapper from "./components/AuthWrapper";

function App() {
  const isAuthenticated = () => {
    const TOKEN_KEY = localStorage.getItem("access_token");

    if (typeof TOKEN_KEY === "string" && TOKEN_KEY.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="App">
      <Routes>
        <Route element={<AuthWrapper isAuthenticated={isAuthenticated} />}>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
        </Route>
        <Route path="/todo" element={<Todos />}></Route>
      </Routes>
    </div>
  );
}

export default App;
