import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetRequest from "../getRequest";
export default function Comments({ postId }) {
  console.log("postId: ", postId);
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
    if (postId) {
      getComments();
    }
  }, [postId]);

  return (
    <div>
      {comments.length === 0 ? (
        <p>No comments available</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id}>
            <p>
              {comment.name}: {comment.body}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
