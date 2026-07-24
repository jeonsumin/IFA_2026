import {lazy, Suspense} from "react";
import {Button, Checkbox, Select} from "shared/ui";
import {useModal} from "app/provider/modal";

// @zxing(~480kB)는 QR 스캔 모달을 열 때만 로드하도록 코드 스플릿
const QrScanner = lazy(() =>
    import("widget/qr-scanner").then((m) => ({default: m.QrScanner}))
);

export const Home = () => {

    const {openFullPage, openAlert} = useModal();

    const openQrScan = () => {
        openFullPage({
            title: "QR 스캔",
            content: (
                <Suspense fallback={<div className="flex h-full items-center justify-center">카메라 로딩 중…</div>}>
                    <QrScanner
                        onScan={(value) => openAlert({title: "스캔 완료", message: value})}
                        onError={(message) => openAlert({title: "오류", message})}
                    />
                </Suspense>
            ),
        });
    };

    return (
        <div>
            <h1>home</h1>

            <Checkbox label={'checkbox'}/>
            <Select options={[
                {
                    label: 'label1',
                    value: '1'
                },
                {
                    label: 'label2',
                    value: '2',
                    disabled: true
                },
            ]}/>
            <Button>button</Button>
            <Button onClick={openQrScan}>QR 스캔</Button>
        </div>
    )
}
