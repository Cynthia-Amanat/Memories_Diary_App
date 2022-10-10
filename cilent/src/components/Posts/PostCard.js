/** @format */

import {useState} from "react";
import profileAvatar from "../../logo/img_avatar.png";
import loadingGif from "../../logo/Loading_icon.gif";

const PostCard = ({post}) => {
  const [success, setSuccess] = useState("");

  const handleDelete = async (e) => {
    const url = "http://localhost:8000/memory";

    const data = {
      id: e.target.id,
    };

    const request = await fetch(url, {
      method: "Delete",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();
    if (response.success) {
      setSuccess(response.message);
    }
  };
  return (
    <div key={post._id}>
      <div className="myPost">
        <img src={post.image ? `data:image/jpg;base64,${post.image}` : profileAvatar} alt="image" />
        <div>
          <h2>
            <b>{post.title}</b>
          </h2>

          <p>{post.message}</p>
          <p>
            <b>Posted on :</b> {post.postedOn.slice(0, 10)}
          </p>
          <p>
            <b>Memory Date :</b> {post.date.slice(0, 10)}
          </p>
          <button id={post._id} className="btn btn-primary" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
