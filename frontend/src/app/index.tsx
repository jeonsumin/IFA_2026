import {createRoot} from 'react-dom/client'
import {AppRouter} from "./routes";
import {LangProvider} from "./provider/lang";
import {ensureDeviceId} from "entities/session";

import "shared/styles/global.css"

// 앱 진입 시 안정적 기기 신원(영구 쿠키) 보장
ensureDeviceId();

createRoot(document.getElementById('root')!).render(
    <LangProvider>
        <AppRouter/>
    </LangProvider>
)
