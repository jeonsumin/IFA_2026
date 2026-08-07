import {request} from "shared/api";
import type {CheckInPayload} from "entities/user";

export interface CheckInResponse {
    success: boolean;
    expiresAt: string;   // 일일 쿠키 만료(KST 자정, GMT 문자열)
}

// 체크인 + persona 선택을 한 번에 제출하는 요청 바디.
// persona/reason은 t()된 표시 문자열(단일 언어 이벤트 기준). 집계 필요 시 안정 key로 교체.
export interface CheckInRequest extends CheckInPayload {
    persona: string;
    reason: string;
}

// POST /check-in — 체크인+persona 저장. 기기 id는 X-Device-Id 헤더(request 인터셉터)로 전송. axios가 JSON 직렬화.
export const submitCheckIn = async (payload: CheckInRequest): Promise<CheckInResponse> => {
    const {data} = await request.post<CheckInResponse>("/check-in", payload);
    return data;
};
