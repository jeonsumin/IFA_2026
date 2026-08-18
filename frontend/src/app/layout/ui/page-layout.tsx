import {Mobile} from "./mobile";
import {Desktop} from "./desktop";
import {MobileHeader} from "widgets/header";
import {isMobile} from 'react-device-detect';


export const PageLayout = () => {

    return isMobile
        ? <Mobile headerSlot={<MobileHeader/>}/>
        : <Desktop/>;
};
