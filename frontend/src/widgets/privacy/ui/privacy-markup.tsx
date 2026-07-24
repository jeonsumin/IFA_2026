import {MarkdownRenderer} from "shared/ui";
import privacyEn from "../content/privacy_en.md?raw";

export const PrivacyMarkup = () => {
    return <MarkdownRenderer content={privacyEn}/>;
};
