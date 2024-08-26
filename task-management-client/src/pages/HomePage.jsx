import React from "react";
import classes from "../styles/HomePage.module.css";
import Navigation from "../components/Navigation";

// Box Components
import CompletedBox from "../components/Completed";
import PriorityBox from "../components/Priority";
import FavoriteBox from "../components/Favorites";
import ProfileBox from "../components/Profile";
import FuteredBox from "../components/Futered";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Taskify - Home</title>
      </Helmet>
      <Navigation />
      <div className={classes.container}>
        <div className={classes["inner-container"]}>
          <h1>Welcome To Your Task Manager</h1>
          <div className={classes["box-wrraper"]}>
            <CompletedBox />
            <PriorityBox />
            <FavoriteBox />
            <ProfileBox />
            <FuteredBox />
          </div>
          {/* <div className={classes.wrraper}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
