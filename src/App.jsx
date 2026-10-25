import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'


import { useEffect, useMemo, useCallback } from "react";
import Header from "./Components/Functional/Header";
import TaskForm from "./Components/Functional/TaskForm";
import TaskList from "./Components/Functional/TaskList";
import ActivityLogger from "./Components/Class/ActivityLogger";
import { ThemeProvider } from "./Components/Context/ThemeContext";
import CardWrapper from "./Components/Functional/CardWrapper";

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [statusFilter, setStatusFilter] = useState("All");
  const [latestActivity, setLatestActivity] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const pendingTasks = tasks.filter((task) => !task.completed).length;

  useEffect(() => {
    document.title = `${pendingTasks} Pending Tasks`;
  }, [pendingTasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (statusFilter === "Pending") {
        return !task.completed;
      }

      if (statusFilter === "Completed") {
        return task.completed;
      }

      return true;
    });
  }, [tasks, statusFilter]);

  const addActivity = useCallback((message) => {
    setLatestActivity({
      id: crypto.randomUUID(),
      message,
      time: new Date().toLocaleString()
    });
  }, []);

  
const handleAddTask = useCallback((taskData) => {
  const newTask = {
    id: crypto.randomUUID(),
    title: taskData.title,
    priority: taskData.priority,
    completed: false
  };

  setTasks((previousTasks) => [newTask, ...previousTasks]);

  addActivity(
    `Added task: ${taskData.title} (Priority: ${taskData.priority})`
  );
}, [addActivity]);

  const handleToggleTask = useCallback((taskId) => {
    const selectedTask = tasks.find((task) => task.id === taskId);

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );

    if (selectedTask) {
      addActivity(
        selectedTask.completed
          ? `Marked pending: ${selectedTask.title}`
          : `Completed task: ${selectedTask.title}`
      );
    }
  }, [tasks, addActivity]);

  const handleDeleteTask = useCallback((taskId) => {
    const selectedTask = tasks.find((task) => task.id === taskId);

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );

    if (selectedTask) {
      addActivity(`Deleted task: ${selectedTask.title}`);
    }
  }, [tasks, addActivity]);

  const handleFilterChange = useCallback((event) => {
    setStatusFilter(event.target.value);
  }, []);

  return (
    <div className="dashboard">
      <Header />

      <main className="container">
        <CardWrapper title="Task Management">
          <label htmlFor="statusFilter">Filter tasks:</label>

          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleFilterChange}
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending Tasks</option>
            <option value="Completed">Completed Tasks</option>
          </select>

          <TaskForm onAddTask={handleAddTask} />

          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        </CardWrapper>

        {pendingTasks === 0 && tasks.length > 0 && (
          <p>All tasks are completed.</p>
        )}

        <ActivityLogger latestActivity={latestActivity} />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
