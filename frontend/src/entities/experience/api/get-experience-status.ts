import {request} from "shared/api";
import type {ZoneStatus} from "../model/types";

// 당일 존별 현황 조회 — experience 페이지 mount 시. X-Device-Id 헤더는 인터셉터가 부착.
export const getExperienceStatus = async (): Promise<ZoneStatus[]> => {
    const {data} = await request.get<{success: boolean; zones: ZoneStatus[]}>("/experience-status");
    return data.zones;
};
