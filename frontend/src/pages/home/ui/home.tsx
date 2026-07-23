import {useModal} from "app/provider/modal";
import {PrivacyMarkup} from "widget/privacy";

export const Home = () => {

    const { openFullPage } = useModal();

    const openPopup = () => {
        /*openAlert({
            title: "알림",
            message: "팝업 예시입니다.\n확인/취소를 눌러보세요.",
            cancelText: "취소",
            onConfirm: () => console.log("confirmed"),
            onCancel: () => console.log("canceled"),
        });*/

        openFullPage({ title: "개인정보 처리방침", content: <PrivacyMarkup/> })
    }

    return (
        <div>
            <h1>home</h1>

            <button
                onClick={openPopup}>
                open Popup
            </button>
        </div>
    )
}
