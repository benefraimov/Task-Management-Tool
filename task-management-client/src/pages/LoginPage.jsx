import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import classes from "../styles/LoginRegisterPage.module.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch(() => {});
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <Helmet>
        <title>Taskify - Login</title>
      </Helmet>
      <Navigation />
      <div className={classes.container}>
        <div className={classes["login-register__box"]}>
          <h1>Login</h1>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="example@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="example@123E"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
            <button onClick={goToRegister} className={classes.anotherBtn}>
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
