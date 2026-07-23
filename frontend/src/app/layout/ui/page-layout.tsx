import {useDevice} from "app/provider";
import {Mobile} from "./mobile";
import {Desktop} from "./desktop";
import {MobileHeader} from "widget/header";

export const PageLayout = () => {
    const {isMobile} = useDevice();

    return isMobile
        ? <Mobile headerSlot={<MobileHeader/>}/>
        : <Desktop/>;
};
