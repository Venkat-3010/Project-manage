const Task = require("../models/tasks");

const createTask = async (req, res) => {
  const {
    title,
    description,
    priority,
    dueDate,
    checklist,
    sharedWith,
    assignedTo,
  } = req.body;
  if (!title ||!description ||!priority) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      checklist,
      sharedWith,
      assignedTo,
      createdBy: req.user._id,
    });
    const createTask = await task.save();
    res.status(201).json({
        success: true,
        message: `${title} created successfully`,
        task: createTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.remove();
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  const { filter } = req.query;
  const filters = {};

  if (filter === "Today") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    filters.createdAt = {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    };
  } else if (filter === "This Week") {
    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay();
    const endOfWeek = startOfWeek + 6;

    const startDate = new Date(today.setDate(startOfWeek));
    const endDate = new Date(today.setDate(endOfWeek));

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    filters.createdAt = {
      $gte: startDate,
      $lt: endDate,
    };
  } else if (filter === "This Month") {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    filters.createdAt = { $gte: startDate, $lte: endDate };
  }
  try {
    const tasks = await Task.find({ createdBy: req.user._id, ...filters });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTaskState = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;
  try {
    const task = await Task.findById(id);
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.state = state;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskAnalytics = async (req, res) => {
  try {
    const task = await task.find({ createdBy: req.user._id });

    const analytics = {
      status: {
        backlog: task.filter((task) => task.state === "backlog").length,
        todo: task.filter((task) => task.state === "todo").length,
        inProgress: task.filter((task) => task.state === "in-Progress").length,
        done: task.filter((task) => task.state === "done").length,
      },
      priority: {
        low: task.filter((task) => task.priority === "low").length,
        medium: task.filter((task) => task.priority === "moderate").length,
        high: task.filter((task) => task.priority === "high").length,
      },
      dueDate: task.filter((task) => {
        const today = new Date().toISOString().split("T")[0];
        const taskDate = new Date(task.dueDate).toISOString().split("T")[0];
        return taskDate === today;
      }),
    };

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTaskAnalytics,
  updateTaskState,
  getTaskById,
  getTasks,
  updateTask,
  deleteTask,
  createTask,
};
