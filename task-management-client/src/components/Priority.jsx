import React from "react";
import classes from "../styles/CompletedBox.module.css";
import { FaRegCircleDot, FaTruckFast } from "react-icons/fa6";

function PriorityBox() {
  return (
    <>
      <div className={classes.container}>
        <div className={classes["inner-container"]}>
          <div className={classes.section} style={{ border: "none", gap: "0" }}>
            <FaTruckFast fill="#6F4E37" size="27px" />
            <h2>Priority Tasks</h2>
          </div>
          <div className={classes["box-wrraper"]}>
            <div className={classes.section}>
              <FaRegCircleDot size="13px" />
              <li>
                Submit the final project report to the client by end of the day
              </li>
            </div>
            <div className={classes.section}>
              <FaRegCircleDot size="13px" />

              <li>
                Prepare the presentation slides for the upcoming board meeting
              </li>
            </div>
            <div className={classes.section}>
              <FaRegCircleDot size="13px" />

              <li>
                Complete the bug fixes for the critical module in the software
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PriorityBox;
