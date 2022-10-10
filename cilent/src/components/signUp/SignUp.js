/** @format */

import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/userContext";
import {Link} from "react-router-dom";
import "./signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const {setUser} = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/user";
    const data = {firstName, lastName, email, password, confirmPassword, phone, error, success};

    if (!firstName || !lastName || !email) return setError(`Please fill all mandatory fields`);
    if (password !== confirmPassword) return setError("The passwords do not match");

    try {
      const request = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      });

      const json = await request.json();
      if (json.error) {
        setError(json.error);
      } else {
        setUser(json.data);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
    setSuccess(`Registered`);
  };

  return (
    <>
      <div className="signupFormContainer">
        <div className="signupForm">
          <div>
            <h2 className="createAccountText">Create an account</h2>
            {error && <h2 className="errorNotification">{error}</h2>}
          </div>
          <form>
            <input type="text" placeholder="first name" className="inputField" onChange={(e) => setFirstName(e.target.value)} /> <br />
            <input type="text" placeholder="last name" className="inputField" onChange={(e) => setLastName(e.target.value)} />
            <input type="text" placeholder="email" className="inputField" onChange={(e) => setEmail(e.target.value)} /> <br />
            <input type="Password" placeholder="password" className="inputField" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <input type="Password" placeholder="Confirm Password*" className="inputField" onChange={(e) => setConfirmPassword(e.target.value)} />
            <input type="tel" placeholder="phone number" className="inputField" onChange={(e) => setPhone(e.target.value)} />
            <br />
            <button onClick={signup} className="signupBtn">
              {" "}
              Register{" "}
            </button>{" "}
            <br />
            <hr />
            <div>
              <p>
                Already Have an account ?{" "}
                <Link to="/login" className="login">
                  <span>Log In</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
