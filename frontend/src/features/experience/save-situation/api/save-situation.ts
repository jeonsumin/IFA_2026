import {request} from "shared/api";
import type {ZoneSlug} from "entities/experience";

// 존 상황 선택 저장(upsert) — 상황 확정 시 1회. situation은 선택 옵션 title. X-Device-Id 헤더는 인터셉터가 부착.
export const saveSituation = async (zone: ZoneSlug, situation: string, desc: string): Promise<void> => {
    await request.post("/experience", {zone, situation, desc });
};
