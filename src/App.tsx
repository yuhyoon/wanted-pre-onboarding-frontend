import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignUp from "./page/SignUp";
import SignIn from "./page/SignIn";
import Todos from "./page/Todos";

function App() {
  const TOKEN_KEY = localStorage.getItem("access_token");

  const location = useLocation();
  const navigate = useNavigate();

  const handlePathname = (token: string | null, pathname: string) => {
    if (token) {
      if (pathname === "/signup" || pathname === "/signin")
        return navigate("todo");
    } else if (!token && pathname === "/todo") {
      return navigate("signin");
    }
  };

  useEffect(() => {
    handlePathname(TOKEN_KEY, location.pathname);
  }, [location]);

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>

        <Route path="/todo" element={<Todos />}></Route>
      </Routes>
    </div>
  );
}

export default App;
