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


  const deletePost = async (postId) => {
    const response = await deleteRequest(
      `http://localhost:3000/posts/${currentUser.id}/${postId}`
    );
    if (response) {
      setPosts((prevposts) => prevposts.filter((post) => post.id !== postId));
    } else {
      alert("Failed to delete the post");
    }
  };

  const editMyPost = async (postId) => {
    const newTitle = prompt("Enter the new title for your post:");

    if (!newTitle) {
      return;
    }

    try {
      const response = await postRequest(
        `http://localhost:3000/post/${postId}`,
        { title: newTitle }
      );

      if (response) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, title: newTitle } : post
          )
        );
      } else {
        alert("Error updating to-do:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editMyPostBody = async (postId) => {
    const newBody = prompt("Enter the new body for your post:");

    if (!newBody) {
      return;
    }

    try {
      const response = await postRequest(
        `http://localhost:3000/post/${postId}`,
        { body: newBody }
      );

      if (response) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, body: newBody } : post
          )
        );
      } else {
        alert("Error updating to-do:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={Math.random()}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button>Commentes</button>
          <button onClick={() => deletePost(post.id)}>delete</button>
          <button onClick={() => editMyPost(post.id)}>edit</button>
          <button onClick={() => editMyPostBody(post.id)}>edit body</button>
        </div>
      ))}
    </div>
  );
}
