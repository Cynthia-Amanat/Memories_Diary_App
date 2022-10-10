/** @format */

const PostCard = ({post}) => {
  const handleDelete = async (e) => {
    const url = "http://localhost:8000/memory";

    console.log(e.target.id);
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
  };
  return (
    <div key={post._id}>
      <div className="myPost">
        <img src={`data:image/jpg;base64,${post.image}`} alt="image" />
        <div>
          <h5>Title: {post.title}</h5>
          <p>Memory: {post.message}</p>
          <p>Posted on : {post.postedOn}</p>
          <p>Memory Date : {post.date}</p>
          <button id={post._id} className="btn btn-primary" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
