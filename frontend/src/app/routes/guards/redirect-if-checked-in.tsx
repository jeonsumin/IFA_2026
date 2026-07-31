import {Navigate, Outlet} from "react-router-dom";
import {isCheckedIn} from "entities/session";

// 이미 체크인했으면 홈으로.
export const RedirectIfCheckedIn = () => {
    if (import.meta.env.DEV) return <Outlet/>;
    return isCheckedIn() ? <Navigate to="/" replace/> : <Outlet/>;
}
