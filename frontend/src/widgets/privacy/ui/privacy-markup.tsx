import {MarkdownRenderer} from "shared/ui";
import privacyEn from "../content/privacy_en.md?raw";

export const PrivacyMarkup = () => {
    return (
        <div className={'px-5 bg-[#F0ECE4]'}>
            <MarkdownRenderer content={privacyEn}/>
        </div>
    );
};
