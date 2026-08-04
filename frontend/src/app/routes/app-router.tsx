import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Home} from 'pages/home';
import {CheckIn} from 'pages/check-in';
import {Welcome} from 'pages/welcome';
import {Persona} from 'pages/persona';
import {Experience} from 'pages/experience';
import {PageLayout} from "../layout";
import {MobileOnlyView, BrowserView, TabletView} from 'react-device-detect'
import {RequireCheckIn, RedirectIfCheckedIn} from "./guards";
import {Dashboard} from "pages/dashboard";
import {Promotion} from "pages/promotion";
import {Report} from "pages/report";

export const AppRouter = () => {

    return (
        <BrowserRouter>


            <BrowserView>
                <Routes>
                    <Route path='/' element={<Promotion/>}/>
                    <Route path={'*'} element={<Navigate to="/" replace/>}/>
                </Routes>
            </BrowserView>

            <TabletView>
                <Routes>
                    <Route path='/' element={<Promotion/>}/>
                    <Route path={'*'} element={<Navigate to="/" replace/>}/>
                </Routes>
            </TabletView>

            <MobileOnlyView>
                <Routes>
                    <Route element={<PageLayout/>}>
                        {/* 인트로(공개) — 미체크인자도 봐야 체크인으로 진입 가능 */}
                        <Route path={'/'} element={<Home/>}/>

                        <Route element={<RedirectIfCheckedIn/>}>
                            <Route path={'/check-in'} element={<CheckIn/>}/>
                        </Route>
                        <Route element={<RequireCheckIn/>}>
                            <Route path={'/welcome'} element={<Welcome/>}/>
                            <Route path={'/persona'} element={<Persona/>}/>
                            <Route path={'/experience'} element={<Experience/>}/>
                            <Route path={'/dashboard'} element={<Dashboard/>}/>
                            <Route path={'/report'} element={<Report/>}/>
                        </Route>
                        <Route path={'*'} element={<Navigate to="/" replace/>}/>
                    </Route>
                </Routes>
            </MobileOnlyView>


        </BrowserRouter>
    )
}
