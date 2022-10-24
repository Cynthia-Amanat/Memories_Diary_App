/** @format */

import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import appLogo from "../../logo/manifest-icon-192.png";
import {useAuth} from "../../context/userContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const {setUser} = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/user/login";
    try {
      const request = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
      });
      const json = await request.json();
      if (!json.success) {
        setError(json.message);
      } else {
        localStorage.setItem("user", JSON.stringify({email: email, password: password}));
        setUser(json.data);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="loginFormContainer">
        {" "}
        <div className="loginFormHeading">
          <img src={appLogo} className="loginFormImage" alt="loginImage" />
        </div>
        <div className="loginForm">
          {error && <p className="errorNotification">{error}</p>}
          <form>
            <input type="text" placeholder="Email" className="loginInputField" onChange={(e) => setEmail(e.target.value)} /> <br />
            <input type="Password" placeholder="Password" className="loginInputField" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button className="loginBtn" onClick={(e) => handleSubmit(e)}>
              {" "}
              Log In{" "}
            </button>{" "}
            <br />
            <div className="otherOptions">
              <hr className="hr" />
              OR
              <hr className="hr" />
            </div>
            <div className="forgetYourPassword"></div>
          </form>
        </div>
        <div className="signUpContainer">
          <p>
            Need a account?{" "}
            <Link to="/signup" className="signUp">
              <span>Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
