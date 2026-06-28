import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
function Home() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      console.log(res.data);

      // Handle both array and single object response
      if (Array.isArray(res.data)) {
        setTasks(res.data);
      } else {
        setTasks([res.data]);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Tasks</h2>
      <TaskForm fetchTasks={fetchTasks} />
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
         <TaskCard
  key={task._id}
  task={task}
  fetchTasks={fetchTasks}
/>
        ))
      )}
    </div>
  );
}

export default Home;