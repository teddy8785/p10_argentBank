import React, { useState } from "react";
import "../styles/Form.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Store/userSlice";
import { useNavigate } from "react-router-dom";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleLoginEvent = async (e) => {
    e.preventDefault();
  
    let userCredentials = {
      email,
      password,
    };
  
    try {
      const result = await dispatch(loginUser(userCredentials)).unwrap();
     
      if (result) {
        setEmail("");
        setPassword("");
        navigate("/User");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={HandleLoginEvent}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            {loading ? "Loading..." : "Sign In"}
          </button>
          {error && (
            <div role="alert">{error}</div>
          )}
        </form>
      </section>
    </main>
  );
}

export default Form;
