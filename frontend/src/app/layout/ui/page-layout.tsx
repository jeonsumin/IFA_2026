import {useLayoutStore} from "../model/use-layout-store";
import {Mobile} from "./mobile";
import {Desktop} from "./desktop";
import {MobileHeader} from "widget/header";

export const PageLayout = () => {
    const layout = useLayoutStore();

    return layout.component == "mobile"
        ? <Mobile headerSlot={<MobileHeader/>}/>
        : <Desktop/>
}
