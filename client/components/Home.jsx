import React from "react";
import { Link, Outlet } from "react-router-dom";
import HomeNavBar from "./HomeNavBar.jsx";

export default function Home() {
  const current = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
      <HomeNavBar />
      <h1>hello {current.username}! </h1>
      <Outlet />
    </>
  );
}
