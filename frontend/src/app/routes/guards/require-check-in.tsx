import {Navigate, Outlet} from "react-router-dom";
import {isCheckedIn} from "entities/session";

// 미체크인자는 홈으로. 쿠키 동기 판정이라 flash 없음.
export const RequireCheckIn = () => {
    // if (import.meta.env.DEV) return <Outlet/>;
    return isCheckedIn() ? <Outlet/> : <Navigate to="/" replace/>;
}
