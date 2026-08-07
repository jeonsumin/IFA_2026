import {useEffect, useState} from "react";
import {getExperienceStatus, type ZoneSlug} from "entities/experience";

// 당일 존별 현황 조회 → QR 완료(clear)된 존 slug 집합. mount 시 1회.
export const useExperienceStatus = () => {
    const [clearedZones, setClearedZones] = useState<Set<ZoneSlug>>(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;
        getExperienceStatus()
            .then((zones) => {
                if (!alive) return;
                setClearedZones(new Set(zones.filter((z) => z.qrScanned).map((z) => z.zone)));
            })
            .catch(() => { /* 미체크인/네트워크 실패 → 빈 상태 유지 */ })
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, []);

    return {clearedZones, loading};
};
