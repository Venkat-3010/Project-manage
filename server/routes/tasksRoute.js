const express = require("express");
const {
  createTask,
  getTasks,
  getTaskAnalytics,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskState,
} = require("../controller/tasks");

const auth = require("../middleware/auth");

const router = express.Router();

router.route("/").post(auth, createTask).get(auth, getTasks);

router.route("/analytics").get(auth, getTaskAnalytics);

router
  .route("/:id")
  .get(auth, getTaskById)
  .put(auth, updateTask)
  .delete(auth, deleteTask);

router.route("/id/state").put(auth, updateTaskState);

module.exports = router;
