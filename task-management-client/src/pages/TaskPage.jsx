import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTask } from "../slices/taskSlice";
import { useParams, useNavigate } from "react-router-dom";
import classes from "../styles/TaskPage.module.css";
import { Helmet } from "react-helmet-async";

function TaskPage() {
  const { id } = useParams(); // Extract the task ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { task, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTask(id));
  }, [dispatch, id]);

  const handleDeleteTask = () => {
    dispatch(deleteTask(id));
    navigate("/dashboard"); // Redirect to dashboard after deleting
  };

  useEffect(() => {
    if (task) {
      console.log("task", task);
    }
  }, [task]);

  return (
    <div className={classes.container}>
      <Helmet>
        <title>Taskify - Task Details</title>
      </Helmet>
      <h1>Task Details</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {task && (
        <div className={classes.taskDetails}>
          <h2>{task && task.title}</h2>
          <p>{task.description || "No description available."}</p>
          <div className={classes.actions}>
            <button className={classes.deleteBtn} onClick={handleDeleteTask}>
              Delete Task
            </button>
            <button
              className={classes.backBtn}
              onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskPage;
