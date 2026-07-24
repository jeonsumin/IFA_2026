import axios, {AxiosInstance} from 'axios';

export const request: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
    timeout: 1000 * 60 * 3,
    validateStatus(status) {
        return status === 200;
    }
})
