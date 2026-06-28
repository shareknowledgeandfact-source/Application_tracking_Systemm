import api from "../services/api";

function TaskCard({ task, fetchTasks }) {
  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      fetchTasks();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>

        <span
          className={`badge ${
            task.status === "Completed"
              ? "bg-success"
              : "bg-warning text-dark"
          }`}
        >
          {task.status}
        </span>

        <button
          className="btn btn-danger btn-sm float-end"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;