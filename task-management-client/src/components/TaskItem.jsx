import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../slices/taskSlice";
import classes from "../styles/TaskItem.module.css";
import {
  FaHeart,
  FaListCheck,
  FaRegTrashCan,
  FaStopwatch,
  FaTruckFast,
} from "react-icons/fa6";

function TaskItem({ task, navigate }) {
  const dispatch = useDispatch();
  //   console.log(task);
  const [options, setOptions] = useState({
    completed: task.completed,
    future: task.future,
    priority: task.priority,
    favorite: task.favorite,
  });

  // useRef to track initial render
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      // Skip the first render
      isInitialRender.current = false;
    } else {
      // Logic to run only on updates
      //   console.log("Options state updated:", options);
      dispatch(updateTask({ id: task._id, taskData: options }));
    }
  }, [options]);

  const handleDeleteTask = () => {
    dispatch(deleteTask(task._id));
  };

  const handleTaskDetails = () => {
    navigate(`/tasks/${task._id}`);
  };

  const handleStatusChange = (statusType) => {
    switch (statusType) {
      case "completed":
        setOptions((prev) => {
          if (!prev.completed) {
            return {
              completed: true,
              future: false,
              priority: false,
              favorite: options.favorite,
            };
          } else {
            return { ...prev, completed: false };
          }
        });
        break;
      case "future":
        setOptions((prev) => {
          if (!prev.future) {
            return {
              completed: false,
              future: true,
              priority: false,
              favorite: options.favorite,
            };
          } else {
            return { ...prev, future: false };
          }
        });
        break;
      case "priority":
        setOptions((prev) => {
          if (!prev.priority) {
            return {
              completed: false,
              future: false,
              priority: true,
              favorite: options.favorite,
            };
          } else {
            return { ...prev, priority: false };
          }
        });
        break;
      case "favorite":
        setOptions((prev) => {
          if (!prev.favorite) {
            return {
              completed: options.completed,
              future: options.future,
              priority: options.priority,
              favorite: true,
            };
          } else {
            return { ...prev, favorite: false };
          }
        });
        break;
      default:
        break;
    }
  };

  return (
    <li className={classes.taskItem}>
      <button onClick={handleTaskDetails} className={classes.taskDetailsBtn}>
        {task.title}
      </button>
      <div className={classes.statusIcons}>
        <div className={classes.tooltipContainer}>
          <button
            onClick={() => handleStatusChange("future")}
            className={`${classes.statusBtn} ${classes.tooltipButton}`}>
            {options.future ? (
              <FaStopwatch fill="#004953" size="25px" />
            ) : (
              <FaStopwatch fill="#B2BEB5" size="25px" />
            )}
          </button>
          <span className={classes.tooltipText}>Future Task</span>
        </div>
        <div className={classes.tooltipContainer}>
          <button
            onClick={() => handleStatusChange("priority")}
            className={`${classes.statusBtn} ${classes.tooltipButton}`}>
            {options.priority ? (
              <FaTruckFast fill="#6F4E37" size="27px" />
            ) : (
              <FaTruckFast fill="#B2BEB5" size="27px" />
            )}
          </button>
          <span className={classes.tooltipText}>Priority Task</span>
        </div>
        <div className={classes.tooltipContainer}>
          <button
            onClick={() => handleStatusChange("completed")}
            className={`${classes.statusBtn}  ${classes.tooltipButton}`}>
            {options.completed ? (
              <FaListCheck fill="#40826D" size="25px" />
            ) : (
              <FaListCheck fill="#B2BEB5" size="25px" />
            )}
          </button>
          <span className={classes.tooltipText}>Completed Task</span>
        </div>
        <div className={classes.tooltipContainer}>
          <button
            onClick={() => handleStatusChange("favorite")}
            className={`${classes.statusBtn}  ${classes.tooltipButton}`}>
            {options.favorite ? (
              <FaHeart fill="#DE5D83" size="27px" />
            ) : (
              <FaHeart fill="#B2BEB5" size="27px" />
            )}
          </button>
          <span className={classes.tooltipText}>Favorite Task</span>
        </div>
      </div>
      <div className={classes.tooltipContainer}>
        <button
          onClick={handleDeleteTask}
          className={`${classes.deleteTaskBtn} ${classes.tooltipButton}`}>
          <FaRegTrashCan fill="#FF0800" size="27px" />
        </button>
        <span className={classes.tooltipText}>Favorite Task</span>
      </div>
    </li>
  );
}

export default TaskItem;
