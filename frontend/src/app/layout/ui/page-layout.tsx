import {Mobile} from "./mobile";
import {Desktop} from "./desktop";
import {MobileHeader} from "widgets/header";
import {useDevice} from "app/provider/device";

export const PageLayout = () => {
    const {isMobile} = useDevice();

    return isMobile
        ? <Mobile headerSlot={<MobileHeader/>}/>
        : <Desktop/>;
};
