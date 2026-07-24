import {lazy, Suspense, useState} from "react";
import {Button, Checkbox, Select, OtpInput} from "shared/ui";
import {useModal} from "app/provider/modal";
import {Survey} from "widgets/survey";

// @zxing(~480kB)는 QR 스캔 모달을 열 때만 로드하도록 코드 스플릿
const QrScanner = lazy(() =>
    import("widgets/qr-scanner").then((m) => ({default: m.QrScanner}))
);

// ponytail: 데모용 하드코딩 코드. 실제 검증은 백엔드 연동 시 교체
const OTP_CODE = "1234";

const OtpDemo = () => {
    const [error, setError] = useState(false);
    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <p>4자리 인증 코드를 입력하세요</p>
            <OtpInput
                autoFocus
                error={error}
                onComplete={(code) => {
                    const ok = code === OTP_CODE;
                    setError(!ok);
                }}
            />
            {error && <span className="text-sm text-destructive">인증 코드가 올바르지 않습니다.</span>}
        </div>
    );
};

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

    const openOtp = () => {
        openFullPage({
            title: "OTP 인증",
            content: <OtpDemo/>,
        });
    };

    const openSurvey = () => {
        openFullPage({
            title: "설문",
            content: (
                <div className="p-4">
                    <Survey
                        onSubmit={(answers) =>
                            openAlert({title: "제출 완료", message: JSON.stringify(answers, null, 2)})
                        }
                    />
                </div>
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
            <Button onClick={openSurvey}>설문</Button>
            <Button onClick={openOtp}>OTP 인증</Button>
        </div>
    )
}
