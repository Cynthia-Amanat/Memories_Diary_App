/** @format */

import profileAvatar from "../../logo/img_avatar.png";

const PostCard = ({post}) => {
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

    await request.json();
  };
  return (
    <div key={post._id}>
      <div className="myPost">
        <img src={post.image ? `data:image/jpg;base64,${post.image}` : profileAvatar} alt={post.title} />
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
