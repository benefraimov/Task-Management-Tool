import React from "react";
import classes from "../styles/CompletedBox.module.css";
import { FaCircleUser, FaRegSquareCheck } from "react-icons/fa6";

function ProfileBox() {
  return (
    <>
      <div className={classes.container}>
        <div className={classes["inner-container"]}>
          <div className={classes.section} style={{ border: "none", gap: "0" }}>
            <FaCircleUser fill="#353839" size="27px" />
            <h2>Profile Management</h2>
          </div>
          <div className={classes.section}>
            <FaRegSquareCheck fill="green" size="25px" />
            <li>Manage Account</li>
          </div>
          <div className={classes.section}>
            <FaRegSquareCheck fill="green" size="25px" />
            <li>Share Your Tasks</li>
          </div>
          <div className={classes.section}>
            <FaRegSquareCheck fill="green" size="25px" />
            <li>Get Notification</li>
          </div>
          <div className={classes.section}>
            <FaRegSquareCheck fill="green" size="25px" />
            <li>Collaborate Team</li>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileBox;
