import {getCookie, setCookie} from "shared/lib/cookie";

const DEVICE_ID_KEY = "device_id";
const CHECKIN_KEY = "checkin";
const ONE_YEAR = 60 * 60 * 24 * 365;

// 안정적 기기 신원(영구 쿠키) — 없으면 생성. 앱 진입 시 1회 호출.
export const ensureDeviceId = (): string => {
    let id = getCookie(DEVICE_ID_KEY);
    if (!id) {
        id = crypto.randomUUID();
        setCookie(DEVICE_ID_KEY, id, {maxAge: ONE_YEAR});
    }
    return id;
};

export const getDeviceId = (): string | null => getCookie(DEVICE_ID_KEY);

// 오늘 체크인 여부 — 일일 쿠키 presence(동기). 라우팅 가드가 사용.
export const isCheckedIn = (): boolean => getCookie(CHECKIN_KEY) !== null;

// 서버가 준 만료시각(KST 자정, GMT 문자열)으로 일일 쿠키 설정
export const markCheckedIn = (expiresAt: string): void =>
    setCookie(CHECKIN_KEY, "1", {expires: expiresAt});
