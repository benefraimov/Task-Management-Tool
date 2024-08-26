import React, { useEffect, useState } from "react";
import { FaTruckFast } from "react-icons/fa6";
import classes from "../styles/CompletedTasksPage.module.css";
import { fetchTasks, updateTask } from "../slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

function PriorityTasksPage() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [stateTasks, setStateTasks] = useState([]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length > 0) {
      setStateTasks(tasks.filter((task) => task.priority === true));
    }
  }, [tasks]);

  const toggleTaskStatus = (id, type) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, [type]: false } : task
    );
    if (updatedTasks.length > 0) {
      setStateTasks(updatedTasks.filter((task) => task.priority === true));
    }
    const taskData = {
      [type]: false,
    };
    dispatch(updateTask({ id: id, taskData }));
    // console.log(updatedTasks);
  };

  return (
    <div className={classes.pageContainer}>
      <Helmet>
        <title>Taskify - Priority</title>
      </Helmet>
      <div className={classes["inner-container"]}>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}>
          <FaTruckFast fill="#6F4E37" size="25px" />
          Priority Tasks
        </h2>
        <div className={classes.tasksContainer}>
          {loading
            ? "Loading..."
            : stateTasks.map((task) => (
                <div key={task._id} className={classes.task}>
                  <div className={classes.taskInfo}>
                    <FaTruckFast fill="#6F4E37" size="20px" />
                    <p>{task.title}</p>
                  </div>
                  <div className={classes.actions}>
                    <label>
                      <input
                        type="checkbox"
                        checked={task.priority}
                        onChange={() => toggleTaskStatus(task._id, "priority")}
                      />
                      Mark as Priority
                    </label>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default PriorityTasksPage;
