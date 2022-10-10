/** @format */
import React, {useEffect, useState} from "react";
import PostCard from "./PostCard";
import "./post.css";
import {PostMemories} from "../../context/postContext.js";
import {useAuth} from "../../context/userContext";

const Posts = () => {
  const {posts, error, setError, isLoading} = PostMemories();
  const {user, setUser} = useAuth();
  const data = {
    id: user._id,
  };

  // const deleteUser = async () => {
  //   const request = await fetch("http://localhost:8000/user", {
  //     method: "Delete",
  //     headers: {
  //       "Content-Type": "Application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   const response = await request.json();

  //   if (response.success) {
  //     setUser("");
  //   }
  // };

  useEffect(() => {}, [posts]);

  return isLoading ? (
    <>
      <h2>Loading...</h2>
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
              // deleteUser();
            } else {
              console.log("do Nothing");
            }
          }}
        >
          Deactivate Account
        </button>
      </div>
      <div className="postCard">{posts && posts.map((post) => <PostCard post={post} key={post._id} />)}</div>
    </div>
  );
};

export default Posts;
