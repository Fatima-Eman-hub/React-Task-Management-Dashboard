
import { useState, useRef } from "react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddTask({
      title: trimmedTitle,
      priority
    });

    setTitle("");
    setPriority("Medium");
    inputRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label htmlFor="taskTitle">Task title:</label>

      <input
        ref={inputRef}
        id="taskTitle"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter a task"
        autoFocus
      />

      <label htmlFor="taskPriority">Priority:</label>

      <select
        id="taskPriority"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}
