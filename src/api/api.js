import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// 👇 Add this here
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (error.response?.status === 401) {

            localStorage.clear();

            alert("Session expired. Please login again.");

            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default api;