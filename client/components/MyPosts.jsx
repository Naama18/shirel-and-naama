import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetRequest from "../getRequest";
import deleteRequest from "../deleteRequest";
import postRequest from "../postRequest";
import Comments from "./Comments";
export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState();

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
  const handleComments = (postId) => {
    setShowComments(postId);
  };
  return (
    <div>
      {posts.map((post) => (
        <div key={Math.random()}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => handleComments(post.id)}>Commentes</button>
          {showComments === post.id && <Comments postId={post.id} />}
        </div>
      ))}
    </div>
  );
}
