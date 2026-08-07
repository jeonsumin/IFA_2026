import {useState} from "react";
import type {ZoneSlug} from "entities/experience";
import {saveSituation} from "../api/save-situation";

// 상황 저장 API를 loading/error 상태와 함께 감싼 훅.
export const useSaveSituation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const save = async (zone: ZoneSlug, situation: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await saveSituation(zone, situation);
            return true;
        } catch (e) {
            setError(e instanceof Error ? e.message : "저장에 실패했습니다.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {save, loading, error};
};
