import axios from "axios";

const BASE_URL = "https://dummyjson.com";
const AUTH_URL = "/auth";

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