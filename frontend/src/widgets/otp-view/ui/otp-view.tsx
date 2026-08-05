import {OtpInput} from "shared/ui";
import {useState} from "react";

const OTP_CODE = '1234';

export const OtpView = () => {
    const [error, setError] = useState(false);
    return (
        <div className="bg-bg-default h-full flex flex-col items-center gap-4 p-6 text-center">
            <p className='text-xl font-bold'>Innovation in tune with you <br/>
                생성 완료</p>
            <p>스텝 전용 기능입니다.<br/> 스텝에게 화면을 보여주세요.</p>
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
}
