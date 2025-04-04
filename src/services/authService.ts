import axios from "axios";

const BASE_URL = process.env.VITE_BASE_URL;
const AUTH_URL = process.env.VITE_AUTH_URL;

const authService = {
  login: (data: { username: string; password: string }) => {
    return axios.post(`${BASE_URL}${AUTH_URL}/login`, data);
  },

  register: (data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    image?: string;
  }) => {
    return axios.post(`${BASE_URL}/users/add`, data);
  },
};

export default authService;