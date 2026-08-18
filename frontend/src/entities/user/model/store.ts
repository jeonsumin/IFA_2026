import {create} from "zustand";
import type {CheckInPayload} from "./types";

// 체크인 폼 draft(미제출) — check-in → persona 라우트에 걸쳐 유지, 실제 제출은 persona에서.
// ponytail: persist 없음(RAM only). 새로고침 시 draft 소실 → 가드가 /check-in으로 되돌림.
interface UserDraftStore {
    draft: CheckInPayload | null;
    setDraft: (draft: CheckInPayload) => void;
}

export const useUserDraft = create<UserDraftStore>((set) => ({
    draft: null,
    setDraft: (draft) => set({draft}),
}));
