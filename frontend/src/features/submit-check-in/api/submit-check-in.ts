import {request} from "shared/api";
import {getDeviceId} from "entities/session";
import type {CheckInPayload} from "entities/user";

export interface CheckInResponse {
    success: boolean;
    expiresAt: string;   // 일일 쿠키 만료(KST 자정, GMT 문자열)
}

// POST /check-in — 체크인 저장(기기 id 동봉). axios가 JSON 직렬화.
export const submitCheckIn = async (payload: CheckInPayload): Promise<CheckInResponse> => {
    const {data} = await request.post<CheckInResponse>("/check-in", {
        ...payload,
        deviceId: getDeviceId(),
    });
    return data;
};
