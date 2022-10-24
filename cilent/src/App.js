/** @format */

import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoute from "./privateRoute/PrivateRoute";
import {AuthProvider} from "./context/userContext.js";
import HomePage from "./components/homepage/HomePage";
import Login from "./components/Login/Login";
import SignUp from "./components/signUp/SignUp";
import NavBar from "./components/Navbar";
import CreateMemory from "./components/createMemoryForm/CreateMemoryForm";
import {PostProvider} from "./context/postContext";
import "./app.css";

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <div className="App">
          <Router>
            <NavBar />
            <CreateMemory />

            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </Router>
        </div>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
