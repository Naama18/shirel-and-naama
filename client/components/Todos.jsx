import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetRequest from "../getRequest";
import deleteRequest from "../deleteRequest";
import postRequest from "../postRequest";
export default function Todos() {
  console.log("I'm at todos");

  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const getTodos = async () => {
    const fetchedTodos = await GetRequest(
      `http://localhost:3000/todos/${currentUser.id}`
    );
    console.log("todos", fetchedTodos);
    setTodos(fetchedTodos);
  };

  const deleteTodo = async (todoId) => {
    const response = await deleteRequest(
      `http://localhost:3000/todos/${currentUser.id}/${todoId}`
    );
    if (response) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } else {
      alert("Failed to delete the todo");
    }
  };
  const addToDo = async () => {
    const todo = {
      userId: currentUser.id,
      title: newTodoTitle,
      completed: "false",
    };
    const response = await postRequest(
      todo,
      `http://localhost:3000/todos/${currentUser.id}`
    );

    if (response) {
      setTodos((prevTodos) => [...prevTodos, todo]);
      alert("todo added!");
    } else {
      alert("Failed to add the todo");
    }
  };
  const editToDo = async (todoId) => {
    const newTitle = prompt("Enter the new title for your ToDo:");

    if (!newTitle) {
      return;
    }

    try {
      const response = await postRequest(
        `http://localhost:3000/todos/${todoId}`,
        { title: newTitle }
      );

      if (response) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === todoId ? { ...todo, title: newTitle } : todo
          )
        );
      } else {
        alert("Error updating to-do:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCheckboxChange = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              completed: todo.completed === "false" ? "true" : "false",
            }
          : todo
      )
    );
  };
  useEffect(() => {
    getTodos();
  }, []);
  console.log(todos);
  return (
    <div>
      <h2 className="font">Todos</h2>
      <br />
      <div>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)} // Update state with input value
          placeholder="Enter todo title"
        />
        <button onClick={addToDo}>Add Todo</button>
      </div>
      {todos.length > 0 ? (
        <div>
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed === "true"}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              <span className="todo-title">{todo.title}</span>
              <div className="todo-buttons">
                <button onClick={() => deleteTodo(todo.id)}>delete</button>
                <button onClick={() => editToDo(todo.id)}>edit</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="font">No todos available</p>
      )}
    </div>
  );
}
