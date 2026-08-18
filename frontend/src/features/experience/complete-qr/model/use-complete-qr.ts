import {useState} from "react";
import type {ZoneSlug} from "entities/experience";
import {completeZoneQr} from "../api/complete-qr";

// QR 완료 API를 loading/error 상태와 함께 감싼 훅.
export const useCompleteQr = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const complete = async (zone: ZoneSlug): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await completeZoneQr(zone);
            return true;
        } catch (e) {
            setError(e instanceof Error ? e.message : "처리에 실패했습니다.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {complete, loading, error};
};
