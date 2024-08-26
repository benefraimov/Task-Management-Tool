import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask, deleteTask } from "../slices/taskSlice";
import classes from "../styles/DashboardPage.module.css";
import { useNavigate } from "react-router-dom";
import TaskItem from "../components/TaskItem";
import { Helmet } from "react-helmet-async";

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const toggleCreateTask = () => {
    setIsCreatingTask((prev) => !prev);
  };

  const handleTitleChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewTaskDescription(e.target.value);
  };

  const handleCreateTask = () => {
    if (newTaskTitle.trim() && newTaskDescription.trim()) {
      dispatch(
        createTask({ title: newTaskTitle, description: newTaskDescription })
      );
      setNewTaskTitle("");
      setNewTaskDescription("");
      setIsCreatingTask(false);
    }
  };

  return (
    <div className={classes.container}>
      <Helmet>
        <title>Taskify - Dashboard</title>
      </Helmet>
      <h1>Dashboard</h1>
      <button onClick={toggleCreateTask} className={classes.createTaskBtn}>
        {isCreatingTask ? "Cancel" : "Create Task"}
      </button>

      {isCreatingTask && (
        <div className={classes.newTaskForm}>
          <input
            type="text"
            placeholder="Enter task title"
            value={newTaskTitle}
            onChange={handleTitleChange}
            className={classes.input}
          />
          <textarea
            placeholder="Enter task description"
            value={newTaskDescription}
            onChange={handleDescriptionChange}
            className={classes.textarea}
          />
          <button onClick={handleCreateTask} className={classes.addTaskBtn}>
            Add Task
          </button>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className={classes.taskList}>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} navigate={navigate} />
        ))}
      </ul>
    </div>
  );
}

export default DashboardPage;
