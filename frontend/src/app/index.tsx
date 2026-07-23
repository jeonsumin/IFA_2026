import {createRoot} from 'react-dom/client'
import {AppRouter} from "./routes";
import {DeviceProvider} from "./provider/device";

import "shared/styles/global.css"

createRoot(document.getElementById('root')!).render(
    <DeviceProvider>
        <AppRouter/>
    </DeviceProvider>
)
