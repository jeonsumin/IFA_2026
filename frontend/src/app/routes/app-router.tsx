import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Home} from 'pages/home';
import {CheckIn} from 'pages/check-in';
import {Welcome} from 'pages/welcome';
import {Persona} from 'pages/persona';
import {Experience} from 'pages/experience';
import {PageLayout} from "../layout";
import {MobileView, BrowserView} from 'react-device-detect'
import {RequireCheckIn, RedirectIfCheckedIn} from "./guards";
import {Dashboard} from "pages/dashboard";
import {Promotion} from "pages/promotion";

export const AppRouter = () => {

    return (
        <BrowserRouter>


            <BrowserView>
                <Routes>
                    <Route path='/' element={<Promotion/>}/>
                    <Route path={'*'} element={<Navigate to="/" replace/>}/>
                </Routes>
            </BrowserView>

            <MobileView>
                <Routes>
                    <Route element={<PageLayout/>}>
                        <Route path={'/'} element={<Home/>}/>

                        <Route element={<RedirectIfCheckedIn/>}>
                            <Route path={'/check-in'} element={<CheckIn/>}/>
                        </Route>
                        <Route element={<RequireCheckIn/>}>
                            <Route path={'/'} element={<Home/>}/>
                            <Route path={'/welcome'} element={<Welcome/>}/>
                            <Route path={'/persona'} element={<Persona/>}/>
                            <Route path={'/experience'} element={<Experience/>}/>
                            <Route path={'/dashboard'} element={<Dashboard/>}/>
                        </Route>
                        <Route path={'*'} element={<Navigate to="/" replace/>}/>
                    </Route>
                </Routes>
            </MobileView>


        </BrowserRouter>
    )
}
