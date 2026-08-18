import {request} from "shared/api";
import type {ExperienceStatus} from "../model/types";

// 당일 현황 조회(페르소나 + 존별) — experience 페이지 mount 시. X-Device-Id 헤더는 인터셉터가 부착.
export const getExperienceStatus = async (): Promise<ExperienceStatus> => {
    const {data} = await request.get<{ success: boolean; data: ExperienceStatus }>("/experience-status");
    return data.data;
};
