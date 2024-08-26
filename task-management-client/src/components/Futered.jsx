import React from "react";
import classes from "../styles/CompletedBox.module.css";
import { FaRegCircleDot, FaStopwatch } from "react-icons/fa6";

function FuteredBox() {
  return (
    <>
      <div className={classes.container}>
        <div className={classes["inner-container"]}>
          <div className={classes.section} style={{ border: "none", gap: "0" }}>
            <FaStopwatch fill="#004953" size="25px" />
            <h2>Futered Tasks</h2>
          </div>
          <div className={classes.section}>
            <FaRegCircleDot size="13px" />
            <li>Plan the next marketing campaign for product launch in Q4</li>
          </div>
          <div className={classes.section}>
            <FaRegCircleDot size="13px" />
            <li>Organize the annual team-building event for the company</li>
          </div>
          <div className={classes.section}>
            <FaRegCircleDot size="13px" />
            <li>Research and prepare a proposal for the new client process</li>
          </div>
        </div>
      </div>
    </>
  );
}

export default FuteredBox;
