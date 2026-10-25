import { useTheme } from "../Context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div>
        <h1>Task Management Dashboard</h1>
        <p>Manage your daily tasks</p>
      </div>

      <button onClick={toggleTheme}>
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}

