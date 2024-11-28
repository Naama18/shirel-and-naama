import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/posts?page=${page}&limit=5`
        );
        const data = await response.json();
        setPosts((prevPosts) => {
          const newPosts = data.filter(
            (post) =>
              !prevPosts.some((existingPost) => existingPost.id === post.id)
          );
          return [...prevPosts, ...newPosts];
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleComments = () => {
    setShowComments(true);
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={Math.random()}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => handleComments()}>Commentes</button>
          {showComments && <Comments postId={post.id} />}
        </div>
      ))}
      {loading && <p>Loading...</p>}
      <button onClick={handleShowMore} disabled={loading}>
        Show More
      </button>
    </div>
  );
};

export default Posts;
