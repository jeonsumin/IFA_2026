import {Navigate, Outlet} from "react-router-dom";
import {useUserDraft} from "entities/user";
import {isCheckedIn} from "entities/session";

// persona는 통합 제출 전 단계 — draft가 있어야 진입.
// 이미 체크인 완료면 재제출 방지차 dashboard로, draft 없으면(새로고침 등) check-in부터 다시.
export const RequireDraft = () => {
    const draft = useUserDraft((s) => s.draft);
    if (import.meta.env.DEV) return <Outlet/>;
    if (isCheckedIn()) return <Navigate to="/dashboard" replace/>;
    return draft ? <Outlet/> : <Navigate to="/" replace/>;
};
