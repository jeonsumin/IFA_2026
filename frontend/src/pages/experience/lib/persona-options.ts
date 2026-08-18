// 카피덱 persona 키 — 현황이 주는 persona title을 이 키로 역해석
export const PERSONA_KEYS = ['optimizer', 'coordinator', 'homemaker', 'worker'] as const;
export type PersonaKey = typeof PERSONA_KEYS[number];

// persona title(예: "THE CONNECTED\nFAMILY COORDINATOR") → 카피덱 key. 못 찾으면 undefined.
export const resolvePersonaKey = (
    persona: string,
    titleOf: (key: string) => string,
): PersonaKey | undefined =>
    PERSONA_KEYS.find((k) => titleOf(`persona.${k}.title`) === persona);

// 상황 옵션 키 결정 — 페르소나×존 옵션(persona.<key>.<zone>.options)이 있으면 그걸, 없으면 zone fallback.
export const experienceOptionsKey = (
    personaKey: string,
    zoneSlug: string,
    hasCopy: (key: string) => boolean,
    fallbackKey: string,
): string => {
    if (!personaKey) return fallbackKey;
    const key = `persona.${personaKey}.zone.${zoneSlug}.options`;
    return hasCopy(key) ? key : fallbackKey;
};
