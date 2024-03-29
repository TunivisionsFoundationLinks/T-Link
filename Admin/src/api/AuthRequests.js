import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const logIn = (formData) => API.post("/auth/loginAdmin", formData);

export const CreateAdmin = (formData) =>
  API.post("/auth/registerAdmin", formData);
