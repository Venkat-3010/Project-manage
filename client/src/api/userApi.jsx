import axios from "axios";
import { toast } from "react-toastify";
const url = "http://localhost:5000/api/user";

const registerUser = async({name, email, password}) => {
    try {
        const response = await axios.post(`${url}/register`, {
            name,
            email,
            password
        });
        return response.data;
    } catch (error) {
        if(error.response && error.response.data.message === "User already exists"){
            toast.warn('User already exists ', error.message, {
              theme: 'dark',
              position: 'bottom-right',
            });
          }else {
            toast.warn('Something went wrong ', error.message, {
              theme: 'dark',
              position: 'bottom-right',
            });
          }
    }
};

const loginUser = async({email, password}) => {
    try {
        const response = await axios.post(`${url}/login`, {
            email,
            password
        });
        if(response.data?.token){
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('password', response.data.password);
            localStorage.setItem('id', response.data._id);
        }
        return response.data;
    } catch (error) {
        if(error.response && error.response.data.message === "User does not exist"){
            toast.warn('User does not exist ', error.message, {
              theme: 'dark',
              position: 'bottom-right',
            });
          }else {
            toast.warn('Something went wrong ', error.message, {
              theme: 'dark',
              position: 'bottom-right',
            });
          }
    }
};

export { registerUser, loginUser }