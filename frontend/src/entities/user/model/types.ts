// 체크인 폼 도메인 타입 — pages/check-in, features/submit-check-in가 공유하는 단일 출처
export interface CheckInPayload {
    name: string;
    email: string;
    gender: string;
    age: string;
    agree: boolean;
}
