/** @format */

import {useEffect, useState} from "react";
import {useAuth} from "../context/userContext.js";
import {useNavigate} from "react-router-dom";

import appLogo from "../logo/manifest-icon-192.png";
const NavBar = () => {
  const [error, setError] = useState("");
  const [display, setDisplay] = useState(false);
  const {user, setUser} = useAuth();
  const navigate = useNavigate();

  const consistentLogin = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    const data = {
      email: user.email,
      password: user.password,
    };

    if (user) {
      const url = "http://localhost:8000/user/login";

      const request = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      });

      const json = await request.json();
      if (!json.success) {
        setError(json.message);
      } else {
        setUser(json.data);
        navigate("/");
      }
    }
  };
  const handleClick = () => {
    document.getElementById("memoryForm").classList.remove("hide");
  };

  useEffect(() => {
    consistentLogin();
  }, [user]);

  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <img src={appLogo} alt="Logo" width="50" height="40" className="d-inline-block align-text-top" />
        <h1 style={{fontFamily: "Lobster"}}>Memories App</h1>
        {user && (
          <button className="btn btn-primary btn-lg" onClick={handleClick}>
            {" "}
            Create Memory
          </button>
        )}

        {user && (
          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              localStorage.removeItem("user");
              setUser("");
            }}
          >
            {" "}
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
