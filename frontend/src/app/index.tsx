import {createRoot} from 'react-dom/client'
import {AppRouter} from "./routes";
import {DeviceProvider} from "./provider/device";
import {ModalProvider} from "./provider/modal";
import {ensureDeviceId} from "entities/session";

import "shared/styles/global.css"

// 앱 진입 시 안정적 기기 신원(영구 쿠키) 보장
ensureDeviceId();

createRoot(document.getElementById('root')!).render(
    <DeviceProvider>
        <ModalProvider>
            <AppRouter/>
        </ModalProvider>
    </DeviceProvider>
)
