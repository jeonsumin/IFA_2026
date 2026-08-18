import {useState} from "react";
import {submitLog} from "features/submit-log/api/submit-log.ts";

export const useSubmitLog = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const logSubmit = async (payload: string): Promise<any> => {
        setLoading(true);
        setError(null)
        try {
            await submitLog(payload);
            return true;
        } catch (e) {
            setError(e instanceof Error ? e.message : "저장에 실패했습니다.");
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        logSubmit,
        loading,
        error
    }
}
