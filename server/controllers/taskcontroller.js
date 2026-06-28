const Task = require("../models/Task");

// Get all tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

// Create a task
const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

// Update a task
const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

// Delete Task
const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task deleted successfully" });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};