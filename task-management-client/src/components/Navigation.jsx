import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "../styles/Navigation.module.css";
import {
  FaHeart,
  FaCircleUser,
  FaInbox,
  FaStopwatch,
  FaListCheck,
  FaTruckFast,
} from "react-icons/fa6";
import { useSelector } from "react-redux";

const Navigation = () => {
  const { user } = useSelector((state) => state.auth);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={classes.container}>
      <nav>
        <ul className={classes.firstSection}>
          <li>
            {user ? (
              <Link to="/dashboard">Taskify</Link>
            ) : (
              <Link to="/">Taskify</Link>
            )}
          </li>
        </ul>
        <ul className={classes.secondSection}>
          <li>
            <Link to="/dashboard">
              {dimensions.width < 590 ? <FaInbox size="25px" /> : "Dashboard"}
            </Link>
          </li>
          <li>
            <Link to="/completed-tasks">
              {dimensions.width < 590 ? (
                <FaListCheck size="25px" />
              ) : (
                "Completed"
              )}
            </Link>
          </li>
          <li>
            <Link to="/future-tasks">
              {dimensions.width < 590 ? <FaStopwatch size="25px" /> : "Futures"}
            </Link>
          </li>
          <li>
            <Link to="/priority-tasks">
              {dimensions.width < 590 ? (
                <FaTruckFast size="25px" />
              ) : (
                "Priority"
              )}
            </Link>
          </li>
        </ul>
        <ul className={classes.thirdSection}>
          <li>
            <Link to="/favorites-tasks">
              <FaHeart size="25px" />
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <FaCircleUser size="25px" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
