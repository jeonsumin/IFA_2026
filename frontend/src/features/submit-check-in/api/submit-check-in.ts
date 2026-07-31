import {request} from "shared/api";
import type {CheckInPayload} from "entities/user";

// POST /check-in — 체크인 정보 저장
export const submitCheckIn = (payload: CheckInPayload): Promise<void> =>
    request.post("/check-in", payload);
