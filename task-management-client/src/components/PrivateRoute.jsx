import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import classes from "../styles/PrivateRoute.module.css";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? (
    <>
      <Navigation />
      <main className={classes.container}>{children}</main>
      <Footer />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
