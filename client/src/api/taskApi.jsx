import axios from "axios";
import { toast } from "react-toastify";
const url = "http://localhost:5000/api/tasks";

const createTask = async (taskData) => {
  try {
    const response = await axios.post("/", taskData, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.warn("Error creating task", error.message);
  }
};

const getTasks = async (filter) => {
  try {
    const response = await axios.get(
      "/",
      { params: { filter } },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    toast.warn("Error getting tasks", error.message);
  }
};

const updateTask = async (id, taskData) => {
  try {
    const response = await axios.put(`/${id}`, taskData, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.warn("Error updating task", error.message);
  }
};

const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.warn("Error deleting task", error.message);
  }
};

const getTaskById = async (id) => {
  try {
    const response = await axios.get(`/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.warn("Error getting task", error.message);
  }
};

const updateTaskState = async (id, state) => {
  try {
    const response = await axios.put(
      `/${id}/state`,
      { state },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    toast.warn("Error updating task state", error.message);
  }
};

const getTaskAnalytics = async () => {
  try {
    const response = await axios.get("/analytics", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.warn("Error getting task analytics", error.message);
  }
};

export {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
  updateTaskState,
  getTaskAnalytics,
};
