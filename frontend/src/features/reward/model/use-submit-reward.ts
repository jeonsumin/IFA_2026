import {useState} from "react";
import {submitReward, type RewardType} from "../api/submit-reward.ts";

export const useSubmitReward = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async (type: RewardType): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await submitReward(type);
            return true;
        } catch (e) {
            setError(e instanceof Error ? e.message : "저장에 실패했습니다.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {loading, error, submit}
}
