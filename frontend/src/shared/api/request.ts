import axios, {AxiosInstance} from 'axios';
import {getCookie} from 'shared/lib/cookie';

export const request: AxiosInstance = axios.create({
    baseURL: import.meta.env.DEV ? 'http://localhost:8080/api' : '/api',
    timeout: 1000 * 60 * 3,
    validateStatus(status) {
        return status === 200;
    }
})

request.interceptors.request.use((config) => {
    const deviceId = getCookie('device_id');
    if (deviceId) {
        config.headers.set('X-Device-Id', deviceId);
    }
    return config;
})

