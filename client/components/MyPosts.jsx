import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetRequest from "../getRequest";
import deleteRequest from "../deleteRequest";
import postRequest from "../postRequest";
import Comments from "./Comments";
export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState();
  const [newBody, setNewBody] = useState();
  const [newTitle, setNewTitle] = useState();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const getPosts = async () => {
    const fetchedPosts = await GetRequest(
      `http://localhost:3000/posts/${currentUser.id}`
    );
    console.log("posts", fetchedPosts);
    setPosts(fetchedPosts);
  };

  const addPost = async () => {
    const post = {
      userId: currentUser.id,
      title: newTitle,
      body: newBody,
    };
    const response = await postRequest(post, `http://localhost:3000/posts`);

    if (response) {
      setPosts((prevPosts) => [...prevPosts, post]);
      alert("post added!");
    } else {
      alert("Failed to add the post");
    }
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
  const handleComments = (postId) => {
    setShowComments(postId);
  };
  return (
    <div>
      <div>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter post title"
        />
        <input
          type="text"
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          placeholder="Enter post body"
        />
        <button onClick={addPost}>Add Post</button>
      </div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3 className="font">{post.title}</h3>
          <p className="font">{post.body}</p>
          <button onClick={() => handleComments(post.id)}>Commentes</button>
          {showComments === post.id && <Comments postId={post.id} />}
          <button onClick={() => deletePost(post.id)}>delete</button>
          <button onClick={() => editMyPost(post.id)}>edit</button>
          <button onClick={() => editMyPostBody(post.id)}>edit body</button>
        </div>
      ))}
    </div>
  );
}
