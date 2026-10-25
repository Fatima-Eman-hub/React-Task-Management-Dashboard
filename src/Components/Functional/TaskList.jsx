
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks to display.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}
