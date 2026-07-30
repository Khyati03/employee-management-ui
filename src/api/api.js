import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: "http://localhost:8081",
});

// Request Interceptor
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

// Response Interceptor
api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response) {

            if (error.response.status === 401) {

                toast.error("Session expired. Please login again.");

                localStorage.clear();

                window.location.href = "/";

            }

            if (error.response.status === 403) {

                window.location.href = "/access-denied";

            }

        }

        return Promise.reject(error);

    }

);

export default api;