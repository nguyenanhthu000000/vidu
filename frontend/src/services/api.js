import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000"
});

export const askQuestion = (question) => {
  return API.post("/chat", { question });
};

export const uploadFile = (file) => {
  const form = new FormData();
  form.append("file", file);

  return API.post("/upload", form);
};

export const getFiles = () => {
  return API.get("/files");
};

export const deleteFile = (name) => {
  return API.delete(`/delete/${name}`);
};

export const getHistory = () => {
  return API.get("/history");
};