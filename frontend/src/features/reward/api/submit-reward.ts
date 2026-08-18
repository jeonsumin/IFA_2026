import {request} from "shared/api";

// 리워드 수령 대상 — 기본 리워드 / 서베이 리워드
export type RewardType = "reward" | "survey";

export const submitReward = async (type: RewardType): Promise<{success: boolean}> => {
    const {data} = await request.post<{success: boolean}>("/reward", {type});

    return data;
}
