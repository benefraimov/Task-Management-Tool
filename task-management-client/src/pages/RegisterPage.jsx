import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import classes from "../styles/LoginRegisterPage.module.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password }))
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch(() => {});
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <Helmet>
        <title>Taskify - Register</title>
      </Helmet>
      <Navigation />
      <div className={classes.container}>
        <div className={classes["login-register__box"]}>
          <h1>Register</h1>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              placeholder="Avi Cohen"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="example@123E"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </button>
            <button onClick={goToLogin} className={classes.anotherBtn}>
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RegisterPage;
