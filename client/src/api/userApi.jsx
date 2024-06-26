import axios from "axios";
import { toast } from "react-toastify";
const url = "http://localhost:5000/api/user";

const registerUser = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${url}/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (
      error.response &&
      error.response.data.message === "User already exists"
    ) {
      toast.warn("User already exists ", error.message, {
        theme: "dark",
        position: "bottom-right",
      });
    } else {
      toast.warn("Something went wrong ", error.message, {
        theme: "dark",
        position: "bottom-right",
      });
    }
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${url}/login`, {
      email,
      password,
    });
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("password", response.data.password);
      localStorage.setItem("id", response.data._id);
      localStorage.setItem("name", response.data.name);
    }
    console.log(response.data, response.data._id);
    return response.data;
  } catch (error) {
    if (
      error.response &&
      error.response.data.message === "User does not exist"
    ) {
      toast.warn("User does not exist ", error.message, {
        theme: "dark",
        position: "bottom-right",
      });
    } else {
      toast.warn("Something went wrong ", error.message, {
        theme: "dark",
        position: "bottom-right",
      });
    }
  }
};

const updateUserProfile = async (userData) => {
  try {
    const response = await axios.put(`${url}/profile`, userData, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    if (
      error.response &&
      error.response.data.message === "User does not exist"
    ) {
      toast.warn("User does not exist ", error.message, {
        theme: "dark",
        position: "bottom-right",
      });
    } else {
      toast.warn("Something went wrong ", error.message, {
        theme: "dark",
        position: "bottom-right",
      });
    }
    return null;
  }
};

const addPersons = async (email) => {
  try {
    const reponse = await axios.post(
      `${url}/add-person`,
       { email } ,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return reponse.data;
  } catch (error) {
    console.log(error.message);
    toast.warn("Error adding person", error.message);
  }
};

const getPeople = async () => {
  try {
    const response = await axios.get(`${url}/people`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    toast.warn("Error getting people", error.message);
  }
};

const getUser = async () => {
  try {
    const response = await axios.get(`${url}/users`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    toast.warn("Error getting people", error.message);
  }
};

export { registerUser, loginUser, updateUserProfile, addPersons, getPeople, getUser };
