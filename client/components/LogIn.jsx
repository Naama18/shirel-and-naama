import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postRequest from "../postRequest";
export default function LogIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usersArray, setUsersArray] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userObj = { username: username, password: password };
    const checkUser = await postRequest(userObj, "http://localhost:3000/logIn");
    console.log("checkUser: ", checkUser);
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ username: username, id: checkUser.id })
    );

    if (checkUser === "something went wrong") {
      alert("something went wrong");
    } else {
      alert("logged in");
      navigate("/Home");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Enter username:
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </label>
        <br />
        <label>
          Enter password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </label>
        <br />
        <input type="submit" />
      </form>
    </>
  );
}
