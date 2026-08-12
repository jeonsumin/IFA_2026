export interface Persona {
    id: string;
    img: string;
    key: string; // 카피덱 베이스 키 (persona.<slug>) → .title / .desc / .reasons.<0-N>
}

export const PERSONAS: Persona[] = [
    {id: "optimizer", img: "/images/persona/persona-1.png", key: "persona.optimizer"},
    {id: "coordinator", img: "/images/persona/persona-2.png", key: "persona.coordinator"},
    {id: "homemaker", img: "/images/persona/persona-3.png", key: "persona.homemaker"},
    {id: "worker", img: "/images/persona/persona-4.png", key: "persona.worker"},
];

// 선택 이유 옵션 개수 — 각 페르소나 persona.<slug>.reasons.<0..N-1>
// ponytail: 개수 고정. 페르소나별 개수가 달라지면 데이터 기반으로 전환
export const PERSONA_REASON_COUNT = 4;
