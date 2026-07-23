import {createRoot} from 'react-dom/client'
import {AppRouter} from "./routes";
import {DeviceProvider} from "./provider/device";
import {ModalProvider} from "./provider/modal";

import "shared/styles/global.css"

createRoot(document.getElementById('root')!).render(
    <DeviceProvider>
        <ModalProvider>
            <AppRouter/>
        </ModalProvider>
    </DeviceProvider>
)
