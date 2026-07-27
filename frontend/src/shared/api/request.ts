import axios, {AxiosInstance} from 'axios';

export const request: AxiosInstance = axios.create({
    baseURL: process.env.DEV ? 'http://localhost:8080/api' :  '/api',
    timeout: 1000 * 60 * 3,
    validateStatus(status) {
        return status === 200;
    }
})
