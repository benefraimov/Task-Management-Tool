import React, { useEffect, useState } from "react";
import { FaListCheck, FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";
import classes from "../styles/CompletedTasksPage.module.css";
import { fetchTasks, updateTask } from "../slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

function CompletedTasksPage() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length > 0) {
      setCompletedTasks(tasks.filter((task) => task.completed === true));
    }
  }, [tasks]);

  const toggleTaskStatus = (id, type) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, [type]: false } : task
    );
    if (updatedTasks.length > 0) {
      setCompletedTasks(updatedTasks.filter((task) => task.completed === true));
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
        <title>Taskify - Completed</title>
      </Helmet>
      <div className={classes["inner-container"]}>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}>
          <FaListCheck fill="green" size="25px" />
          Completed Tasks
        </h2>
        <div className={classes.tasksContainer}>
          {loading
            ? "Loading..."
            : completedTasks.map((task) => (
                <div key={task._id} className={classes.task}>
                  <div className={classes.taskInfo}>
                    <FaRegCircleCheck fill="green" size="20px" />
                    <p className={task.completed ? classes.completed : ""}>
                      {task.title}
                    </p>
                  </div>
                  <div className={classes.actions}>
                    <label>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskStatus(task._id, "completed")}
                      />
                      Mark as Completed
                    </label>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default CompletedTasksPage;
