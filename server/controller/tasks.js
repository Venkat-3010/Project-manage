const Task = require("../models/tasks");
const User = require("../models/user");

const createTask = async (req, res) => {
  const { title, priority, dueDate, checklist, sharedWith, assignedTo } =
    req.body;
  if (!title || !priority) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const task = new Task({
      title,
      priority,
      dueDate,
      checklist,
      sharedWith,
      assignedTo,
      createdBy: req.userId,
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
    const user = await User.findById(req.userId); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    // console.log(req.body.assignedTo, task.createdBy, req.userId);
    // if (req.body.assignedTo && task.createdBy.toString() !== req.userId.toString()) {
    //   return res.status(401).json({ message: "Only the creator can reassign the task" });
    // }
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
    if (task.createdBy.toString() !== req.userId.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.deleteOne();
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  const { filter } = req.query;
  const filters = {};
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
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
    const tasks = await Task.find({
      $or: [{ createdBy: req.userId }, { assignedTo: user.email }],
      ...filters,
    });
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
  // console.log(id, state)
  try {
    const task = await Task.findById(id);
    // console.log(task)
    // if (task.createdBy.toString() !== req.userId.toString()) {
    //   return res.status(401).json({ message: "Not authorized" });
    // }
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
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const tasks = await Task.find({
      $or: [
        { createdBy: req.userId },
        { assignedTo: user.email }
      ]
    });
    // console.log(tasks)

    const today = new Date().toISOString().split("T")[0];

    const analytics = {
      status: {
        backlog: tasks.filter((task) => task.state === "backlog").length,
        todo: tasks.filter((task) => task.state === "todo").length,
        inProgress: tasks.filter((task) => task.state === "in-Progress").length,
        done: tasks.filter((task) => task.state === "done").length,
      },
      priority: {
        low: tasks.filter((task) => task.priority === "low").length,
        medium: tasks.filter((task) => task.priority === "moderate").length,
        high: tasks.filter((task) => task.priority === "high").length,
      },
      dueDate: tasks.filter((task) => {
        const taskDate = new Date(task.dueDate).toISOString().split("T")[0];
        return taskDate < today && task.state !== "done";
      }).length,
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
