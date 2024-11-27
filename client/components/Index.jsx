import { useState } from "react";
import LogIn from "./LogIn";
import Register from "./Register";

export default function Index() {
  const [displayRegister, setDisplayRegister] = useState(false);
  const [displayLogIn, setDisplayLogIn] = useState(false);
  console.log("hiiiii");
  return (
    <div class="indexContainer">
      <h1>Welcome to our Website!</h1>
      <h3>please log in</h3>

      <button
        onClick={() => {
          setDisplayLogIn(true);
          setDisplayRegister(false);
        }}
      >
        Log In
      </button>
      {displayLogIn && <LogIn />}
      <h3>don't have an account?</h3>
      <button
        onClick={() => {
          setDisplayRegister(true);
          setDisplayLogIn(false);
        }}
      >
        Register
      </button>
      {displayRegister && <Register />}
    </div>
  );
}
