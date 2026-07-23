import MarkdownRenderer from "shared/markup/markup-renderer.tsx";
import privacyEn from "../content/privacy_en.md?raw";

export const PrivacyMarkup = () => {
    return <MarkdownRenderer content={privacyEn}/>;
};
