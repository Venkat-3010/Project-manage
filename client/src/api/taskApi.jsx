import axios from "axios";
import { toast } from "react-toastify";
const url = "https://pro-manage-ay06.onrender.com/api/tasks";

const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${url}/`, taskData, {
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
    // console.log(filter, localStorage.getItem("token"));
    const response = await axios.get(`${url}/`, {
      params: { filter },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.isTokenExpired) {
      toast.warn("Session expired. Please log in again.", {
        position: "bottom-right",
        theme: "dark",
      });
      localStorage.removeItem("token");
    } else {
      console.log(error);
      toast.warn("Error getting tasks", error.message);
    }
  }
};

const updateTask = async (_id, taskData) => {
  try {
    const response = await axios.put(`${url}/${_id}`, taskData, {
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

const deleteTask = async (_id) => {
  // console.log(_id)
  try {
    const response = await axios.delete(`${url}/${_id}`, {
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

const getTaskById = async (_id) => {
  try {
    const response = await axios.get(`${url}/${_id}`, {
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

const updateTaskState = async (_id, state) => {
  // console.log(state);
  try {
    const response = await axios.put(`${url}/${_id}/state`, {state}, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.warn("Error updating task state", error.message);
  }
};

const getTaskAnalytics = async () => {
  try {
    const response = await axios.get(`${url}/analytics`, {
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
