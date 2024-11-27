import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postRequest from "../postRequest";

export default function Register() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [currentId, setCurrentId] = useState();
  const [validatePassword, setValidatePassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userObj = { username: userName, password: password };
    const checkRegister = await postRequest(
      userObj,
      "http://localhost:3000/register"
    );
    console.log("checkRegister: ", checkRegister);
    if (checkRegister === "something went wrong") {
      alert("something went wrong");
    } else {
      alert("signed in!");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ username: userName, id: checkRegister.id })
      );

      navigate("/Home");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your user-name:
        <input
          type="text"
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Enter your password:
        <input
          type="password"
          name="website"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        Verify your password:
        <input
          type="password"
          name="verifyPassword"
          onChange={(e) => setValidatePassword(e.target.value)}
          value={validatePassword}
        />
      </label>
      <br />
      <input type="submit" />
    </form>
  );
}
