import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LogIn from "../components/LogIn";
import Home from "../components/Home";
import Todos from "../components/Todos";
import Posts from "../components/Posts";
import Register from "../components/Register";
import Index from "../components/Index";
import NoPage from "../components/NoPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MyPosts from "../components/MyPosts";

function App() {
  {
    console.log("hiii");
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="LogIn" element={<LogIn />} />

        <Route path="Home" element={<Home />}>
          <Route path="Todos" element={<Todos />} />
          <Route path="Posts" element={<Posts />} />
          <Route path="MyPosts" element={<MyPosts />} />
        </Route>
        <Route path="Register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
