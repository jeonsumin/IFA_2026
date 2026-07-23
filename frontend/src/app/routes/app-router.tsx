import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from 'pages/home';
import {Promotion} from 'pages/promotion';
import {useDevice} from 'app/provider/device';
import { PageLayout } from "../layout";

export const AppRouter = () => {
    const {isMobile} = useDevice();
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PageLayout/>}>
                    <Route path={'/'} element={isMobile ? <Home/> : <Promotion/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}
