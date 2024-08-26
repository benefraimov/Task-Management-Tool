import React from "react";
import classes from "../styles/CompletedBox.module.css";
import { FaListCheck, FaRegCircleDot, FaStopwatch } from "react-icons/fa6";

function CompletedBox() {
  return (
    <>
      <div className={classes.container}>
        <div className={classes["inner-container"]}>
          <div className={classes.section} style={{ border: "none", gap: "0" }}>
            <FaListCheck fill="#40826D" size="25px" />

            <h2>Completed Tasks</h2>
          </div>
          <div className={classes.section}>
            <FaRegCircleDot size="13px" />
            <li>Reviewed and finalized the new user interface design</li>
          </div>
          <div className={classes.section}>
            <FaRegCircleDot size="13px" />
            <li>Tested and deployed the latest version of the mobile app</li>
          </div>
          <div className={classes.section}>
            <FaRegCircleDot size="13px" />
            <li>Finished editing and proofing the marketing blog post</li>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompletedBox;
