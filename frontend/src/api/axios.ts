import axios from "axios";
import { apiUrl } from "../utils/url";

const api = axios.create({
    baseURL: `${apiUrl}/api`,
    withCredentials: true, 
});

export default api;