// 체험 존 식별자 (백엔드 ZONE 컬럼 값과 1:1)
export type ZoneSlug = 'entertainment' | 'living' | 'harmony' | 'elegance';

// 당일 존별 체험 현황 한 건
export interface ZoneStatus {
    zone: ZoneSlug;
    situation: string;   // 선택 상황 옵션 title
    qrScanned: boolean;  // QR 완료 = clear
}

// 체험 현황 응답 — 선택 페르소나 title + 존별 현황
export interface ExperienceStatus {
    persona: string;     // 페르소나 title (예: "THE CONNECTED\nFAMILY COORDINATOR")
    zones: ZoneStatus[];
}
