import {useState} from "react";
import {emailCheck} from "features/email-check/api/email-check.ts";

export const useEmailCheck = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checkEmail = async (email: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const res = await emailCheck(email);
            return !!res?.success; // 200 + success:true 만 통과
        } catch {
            return false; // 비-200(중복 등)·네트워크 오류 → 검증 실패로 간주(메시지 노출)
        } finally {
            setLoading(false);
        }
    }

    return {loading, error, checkEmail};
}
