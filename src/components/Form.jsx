import React, { useState } from "react";
import "../styles/Form.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Store/userSlice";
import { useNavigate } from "react-router-dom";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgError, setMsgError] = useState("");

  const { loading } = useSelector((state) => state.user);

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
        navigate("/user");
      }
    } catch (error) {
      setMsgError("Identifiant ou mot de passe incorrect !")
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
          {msgError && (
            <div role="alert">{msgError}</div>
          )}
        </form>
      </section>
    </main>
  );
}

export default Form;