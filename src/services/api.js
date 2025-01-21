import axios from "axios";

const API = axios.create({
    baseURL: "https://cloudstoragebackend.onrender.com",
    withCredentials: true,
});

export const register = (data) => API.post("/register", data, {
    headers: { "Content-Type": "multipart/form-data" }
})
export const login = (data) => API.post("/login", data)
export const logout = () => API.post("/logout")
export const uploadFile = (formData) => API.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
})
export const fetchProfile = () => API.get("/profile", {
    headers: { "Content-Type": "multipart/form-data" },
});
export const downloadFile = (file_id) => API.get(`/download/${parseInt(file_id)}`, {
    responseType: "blob"
});

export const deleteFile = (file_id) => API.delete(`/delete/${file_id}`);

