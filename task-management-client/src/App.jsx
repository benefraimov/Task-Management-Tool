import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./components/PrivateRoute";
import TaskPage from "./pages/TaskPage";
import CompletedTasksPage from "./pages/CompletedTasksPage";
import FutureTasksPage from "./pages/FutureTasksPage";
import PriorityTasksPage from "./pages/PriorityTasksPage";
import FavoritesTasksPage from "./pages/FavoritesTasksPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/completed-tasks"
          element={
            <PrivateRoute>
              <CompletedTasksPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/future-tasks"
          element={
            <PrivateRoute>
              <FutureTasksPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/priority-tasks"
          element={
            <PrivateRoute>
              <PriorityTasksPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites-tasks"
          element={
            <PrivateRoute>
              <FavoritesTasksPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <PrivateRoute>
              <TaskPage />
            </PrivateRoute>
          }
        />
        {/* Catch-all route for handling 404 errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
