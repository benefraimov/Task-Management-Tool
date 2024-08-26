import React from "react";
import classes from "../styles/CompletedBox.module.css";
import { FaHeart, FaRegCircleDot } from "react-icons/fa6";

function FavoriteBox() {
  return (
    <>
      <div className={classes.container}>
        <div className={classes["inner-container"]}>
          <div className={classes.section} style={{ border: "none", gap: "0" }}>
            <FaHeart fill="#DE5D83" size="27px" />
            <h2>Favorite Tasks</h2>
          </div>
          <div className={classes.section}>
            <FaRegCircleDot size="13px" />
            <li>Brainstorm innovative features for the new mobile</li>
          </div>
          <div className={classes.section}>
            <FaRegCircleDot size="13px" />
            <li>Design a new logo for the upcoming product launch</li>
          </div>
          <div className={classes.section}>
            <FaRegCircleDot size="13px" />
            <li>Write a blog post on the latest industry trends</li>
          </div>
        </div>
      </div>
    </>
  );
}

export default FavoriteBox;
