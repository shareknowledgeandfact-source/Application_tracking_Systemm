import { useState } from "react";
import api from "../services/api";

function TaskForm({ fetchTasks }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", task);

      setTask({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
      });

      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <input
        className="form-control mb-2"
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
        required
      />

      <textarea
        className="form-control mb-2"
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
      />

      <button className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;