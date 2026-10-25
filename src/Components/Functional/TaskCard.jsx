
export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <article className="task-card">
      <div className="task-card-header">
        <h3>{task.title}</h3>

        <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <p>
        Status: {task.completed ? "Completed" : "Pending"}
      </p>

      {task.completed && <p>This task is finished.</p>}

      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? "Mark Pending" : "Complete"}
        </button>

        <button onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
