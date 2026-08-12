// EX_DATA 행 (result-status의 situation 배열) — 대문자 키는 백엔드 컬럼명 그대로
export type ReportSituation = {
    ZONE: string;      // 존 slug (entertainment/living/harmony/elegance)
    SITUATION: string; // 선택한 옵션 title
    SITUATION_DESC: string;
};

export type ReportStatus = {
    userReward: boolean;
    surveyReward: number | null;
    situation: ReportSituation[];
}
