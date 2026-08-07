import {useEffect, useState} from "react";
import {getResultStatus, ReportStatus} from "entities/report";

export const useReportStatus = () => {
    const [reportStatus, setReportStatus] = useState<ReportStatus>({
        userReward: false,
        surveyReward: null,
    })
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;
        getResultStatus()
            .then((data) => {
                if (data == null) return;
                setReportStatus(data);
            })
            .catch(() => { /* 미체크인/네트워크 실패 → 빈 상태 유지 */ })
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, []);


    return { reportStatus, loading }
}
