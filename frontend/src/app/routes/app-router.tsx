import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Home} from 'pages/home';
import {Promotion} from 'pages/promotion';
import {useDevice} from 'app/provider';
import { PageLayout } from "../layout";

export const AppRouter = () => {
    const {isMobile} = useDevice();
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/promotion'} element={<Promotion/>}/>

                <Route element={<PageLayout/>}>
                    <Route path={'/'} element={isMobile ? <Home/> : <Navigate to="/promotion" replace/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}
