import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import classes from "../styles/CompletedTasksPage.module.css";
import { fetchTasks, updateTask } from "../slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

function FavoritesTasksPage() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [stateTasks, setStateTasks] = useState([]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length > 0) {
      setStateTasks(tasks.filter((task) => task.favorite === true));
    }
  }, [tasks]);

  const toggleTaskStatus = (id, type) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, [type]: false } : task
    );
    if (updatedTasks.length > 0) {
      setStateTasks(updatedTasks.filter((task) => task.favorite === true));
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
        <title>Taskify - Favorite</title>
      </Helmet>
      <div className={classes["inner-container"]}>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}>
          <FaHeart fill="#DE5D83" size="27px" />
          Favorites Tasks
        </h2>
        <div className={classes.tasksContainer}>
          {loading
            ? "Loading..."
            : stateTasks.map((task) => (
                <div key={task._id} className={classes.task}>
                  <div className={classes.taskInfo}>
                    <FaHeart fill="#DE5D83" size="20px" />
                    <p>{task.title}</p>
                  </div>
                  <div className={classes.actions}>
                    <label>
                      <input
                        type="checkbox"
                        checked={task.favorite}
                        onChange={() => toggleTaskStatus(task._id, "favorite")}
                      />
                      Mark as Favorite
                    </label>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default FavoritesTasksPage;
