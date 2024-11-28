import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetRequest from "../getRequest";
import deleteRequest from "../deleteRequest";
import postRequest from "../postRequest";
export default function MyPosts() {
  const [posts, setPosts] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const getPosts = async () => {
    const fetchedPosts = await GetRequest(
      `http://localhost:3000/posts/${currentUser.id}`
    );
    console.log("posts", fetchedPosts);
    setPosts(fetchedPosts);
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={Math.random()}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button>Commentes</button>
        </div>
      ))}
    </div>
  );
}
