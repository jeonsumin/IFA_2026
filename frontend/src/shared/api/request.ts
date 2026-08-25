import axios, {AxiosInstance} from 'axios';
import {getCookie, deleteCookie} from 'shared/lib/cookie';

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

const handleFail = () => {
    // 비정상 흐름 → 세션 쿠키 제거 후 홈으로 리디렉션
    deleteCookie('checkin');
    deleteCookie('device_id');
    window.location.href = '/';
};

request.interceptors.response.use(
    (response) => {
        // 200 + success:false 방어 (대부분은 아래 에러 핸들러로 감)
        if(import.meta.env.DEV) return response;

        if (response.data?.success === false) handleFail();
        return response;
    },
    (error) => {
        // validateStatus가 200만 통과 → 비-200(400/409/500)은 여기로. success:false면 리디렉션
        if(import.meta.env.DEV) return;
        if (error.response?.data?.success === false) handleFail();
        return Promise.reject(error);
    }
)
