import {useEffect, useState} from "react";
import {getResultStatus, ReportStatus} from "entities/report";

export const useReportStatus = () => {
    const [reportStatus, setReportStatus] = useState<ReportStatus>({
        userReward: false,
        surveyReward: null,
        persona: "",
        situation: [],
    })
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;
        getResultStatus()
            .then((data) => {
                if (data == null) return;
                // situation 누락 응답에도 report가 .map/.find에서 크래시하지 않도록 배열 보장
                setReportStatus({...data, situation: data.situation ?? []});
            })
            .catch(() => { /* 미체크인/네트워크 실패 → 빈 상태 유지 */ })
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, []);


    // 서베이 제출 성공 시: 미참여(null) → 참여(1). 이미 리워드(2)면 유지.
    const markSurveyDone = () =>
        setReportStatus((s) => (s.surveyReward == null ? {...s, surveyReward: 1} : s));

    // 서베이 리워드 수령 완료 → surveyReward 2(서베이 버튼 비활성). userReward와 무관.
    const markSurveyRewarded = () =>
        setReportStatus((s) => ({...s, surveyReward: 2}));

    // (기본) 리워드 수령 완료 → userReward true. surveyReward와 무관.
    const makeRewardDown = () =>
        setReportStatus((s) => (s.userReward ? s : {...s, userReward: true}));

    return { reportStatus, loading, markSurveyDone, markSurveyRewarded, makeRewardDown}
}
