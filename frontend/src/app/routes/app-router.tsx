import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from 'pages/home';
import {Promotion} from 'pages/promotion';
import {CheckIn} from 'pages/check-in';
import {Intro} from 'pages/intro';
import {Persona} from 'pages/persona';
import {Experience} from 'pages/experience';
import {useDevice} from 'app/provider/device';
import { PageLayout } from "../layout";
import {RequireCheckIn, RedirectIfCheckedIn} from "./guards";

export const AppRouter = () => {
    const {isMobile} = useDevice();
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/intro'} element={<Intro/>}/>
                <Route element={<PageLayout/>}>
                    {/* 체크인 완료자는 홈으로 (역방향 가드) */}
                    <Route element={<RedirectIfCheckedIn/>}>
                        <Route path={'/check-in'} element={<CheckIn/>}/>
                    </Route>
                    {/* 미체크인자는 체크인으로 */}
                    <Route element={<RequireCheckIn/>}>
                        <Route path={'/'} element={isMobile ? <Home/> : <Promotion/>}/>
                        <Route path={'/persona'} element={<Persona/>}/>
                        <Route path={'/experience'} element={<Experience/>}/>
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}
