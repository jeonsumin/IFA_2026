import {useState} from "react";
import type {CheckInPayload} from "entities/user";
import {markCheckedIn} from "entities/session";
import {submitCheckIn} from "../api/submit-check-in";

// 제출 API를 loading/error 상태와 함께 감싼 훅. 성공 시 일일 체크인 쿠키를 심는다.
export const useSubmitCheckIn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async (payload: CheckInPayload): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const res = await submitCheckIn(payload);
            markCheckedIn(res.expiresAt);
            return true;
        } catch (e) {
            setError(e instanceof Error ? e.message : "저장에 실패했습니다.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {submit, loading, error};
};
