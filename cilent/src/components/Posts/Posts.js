/** @format */
import React from "react";
import PostCard from "./PostCard";
import "./post.css";
import {PostMemories} from "../../context/postContext.js";
import {useAuth} from "../../context/userContext";
import loadingGif from "../../logo/Loading_icon.gif";

const Posts = () => {
  const {posts, error, setError, isLoading} = PostMemories();
  const {user, setUser} = useAuth();
  const url = "http://localhost:8000/user";

  const deleteUser = async () => {
    try {
      const data = {
        id: user._id,
      };
      const request = await fetch(url, {
        method: "Delete",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await request.json();
      if (response.success) {
        setUser("");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return isLoading ? (
    <>
      <img src={loadingGif} style={{position: "fixed", left: "35%", top: "25%"}} />
    </>
  ) : error ? (
    <>
      <h2>{error}</h2>
    </>
  ) : (
    <div className="homePage">
      <div className="info">
        <h2>General Info</h2>
        <p>
          <b>Name:</b> {user.firstName}
        </p>
        <p>
          <b>Last name:</b> {user.lastName}
        </p>
        <p>
          <b>email:</b> {user.email}
        </p>
        <p>
          <b>Phone:</b> {user.phone}
        </p>
        <p>
          <b>Total Memories:</b> {posts.length}
        </p>
        <button
          onClick={() => {
            const message = "Are you Sure you want to deactivate your account? You wont be able to recover the data";

            if (window.confirm(message)) {
              deleteUser();
            }
          }}
        >
          Deactivate Account
        </button>
      </div>
      <div className="postCard">{posts.length > 0 ? posts.map((post) => <PostCard post={post} key={post._id} />) : <h5>No memories to show..... </h5>}</div>
    </div>
  );
};

export default Posts;
