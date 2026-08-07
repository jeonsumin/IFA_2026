import {request} from "shared/api";
import type {ZoneSlug, ZoneStatus} from "../model/types";

// 존 상황 선택 저장(upsert) — 상황 확정 시 1회. situation은 선택 옵션 title. X-Device-Id 헤더는 인터셉터가 부착.
export const saveSituation = async (zone: ZoneSlug, situation: string): Promise<void> => {
    await request.post("/experience", {zone, situation});
};

// 존 QR 스캔 완료 처리 — 스캔 성공 시.
export const completeZoneQr = async (zone: ZoneSlug): Promise<void> => {
    await request.post("/experience-qr", {zone});
};

// 당일 존별 현황 조회 — experience 페이지 mount 시.
export const getExperienceStatus = async (): Promise<ZoneStatus[]> => {
    const {data} = await request.get<{success: boolean; zones: ZoneStatus[]}>("/experience-status");
    return data.zones;
};
