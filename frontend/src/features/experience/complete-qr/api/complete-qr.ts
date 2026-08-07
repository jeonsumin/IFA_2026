import {request} from "shared/api";
import type {ZoneSlug} from "entities/experience";

// 존 QR 스캔 완료 처리 — 스캔 성공 시. X-Device-Id 헤더는 인터셉터가 부착.
export const completeZoneQr = async (zone: ZoneSlug): Promise<void> => {
    await request.post("/experience-qr", {zone});
};
