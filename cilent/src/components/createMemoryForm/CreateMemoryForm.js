/** @format */ import {useState} from "react";
import {useAuth} from "../../context/userContext";
import "./createMemory.css";

const CreateMemory = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState();
  const [error, setError] = useState("");
  const {user} = useAuth();
  const userID = user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/memory";
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("message", message);
    formData.append("date", date);
    formData.append("userID", userID);
    const request = await fetch(url, {
      body: formData,
      method: "POST",
    });

    const json = await request.json();
    if (json.success) {
      document.getElementById("memoryForm").classList.add("hide");
    }
  };

  return (
    <>
      <div className={`createMemoryForm hide`} id="memoryForm">
        <button className="btn btn-primary" onClick={() => document.getElementById("memoryForm").classList.add("hide")}>
          X
        </button>
        <h3> Create Memory</h3>
        {error && <h2 className="errorNotification">{error}</h2>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Message
            </label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Date
            </label>
            <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="YYYY/MM/DD" onChange={(e) => setDate(e.target.value)} />
          </div>
          <input type="file" name="image-upload" id="image" onChange={(e) => setImage(e.target.files[0])} />
          <div className="d-grid ">
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateMemory;
