import {Button, OtpInput} from "shared/ui";
import {useState} from "react";

const OTP_CODE = '1234';

export const OtpView = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);
    const filled = code.length === OTP_CODE.length;

    const handleConfirm = () => setError(code !== OTP_CODE);

    return (
        <div className="flex min-h-full flex-col bg-bg-default px-5 pt-10 pb-15 text-center">
            <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col gap-4">
                    <div className="text-xl text-black">
                        <p className="font-bold leading-[1.2]">Innovation in tune with you</p>
                        <p className="font-semibold leading-[1.2]">생성 완료</p>
                    </div>
                    <p className="text-base leading-[1.4] tracking-[-0.32px] text-state-text-body">
                        스텝 전용 기능입니다.<br/>
                        스텝에게 화면을 보여주세요.
                    </p>
                </div>

                <div className="flex min-h-[109px] w-full flex-col items-center gap-2">
                    <OtpInput
                        autoFocus
                        error={error}
                        onChange={(value) => {
                            setCode(value);
                            if (error) setError(false);
                        }}
                    />
                    {error && (
                        <p className="text-xs leading-[1.4] tracking-[-0.24px] text-lg-active-red">
                            ※ 코드가 올바르지 않습니다.
                        </p>
                    )}
                </div>
            </div>

            <Button className="mt-auto font-bold" disabled={!filled} onClick={handleConfirm}>
                확인
            </Button>
        </div>
    );
}
