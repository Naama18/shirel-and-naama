import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetRequest from "../getRequest";
export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const getComments = async () => {
    const fetchedPosts = await GetRequest(
      `http://localhost:3000/comments/${postId}`
    );
    console.log("posts", fetchedPosts);
    setComments(fetchedPosts);
  };
  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      {comments.map((comment) => (
        <div key={Math.random()}>
          <p>
            {comment.name}:{comment.body}
          </p>
          <button>hide comments</button>
        </div>
      ))}
    </div>
  );
}
