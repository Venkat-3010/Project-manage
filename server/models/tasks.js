const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["high", "moderate", "low"],
      required: true,
    },
    dueDate: {
      type: Date,
    },
    state: {
      type: String,
      enum: ["backlog", "todo", "in-progress", "done"],
      default: "todo",
    },
    checklist: [
      {
        text: String,
        completed: Boolean,
      },
    ],
    sharedWith: [
      {
        type: String,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
