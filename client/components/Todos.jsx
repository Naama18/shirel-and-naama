import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetRequest from "../getRequest";

export default function Todos() {
  console.log("I'm at todos");

  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentUser: ", currentUser);

    console.log("IM FETCHING");
    const fetchedTodos = await GetRequest(
      `http://localhost:3000/todos/${currentUser.id}`
    );
    console.log("todos", fetchedTodos);
    setTodos(fetchedTodos);
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);
  return (
    <div>
      <h2>Todos</h2>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) : (
        <p>No todos available</p>
      )}
    </div>
  );
}
