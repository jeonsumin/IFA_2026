import {Button, OtpInput} from "shared/ui";
import {useState} from "react";
import {useModal} from "app/provider/modal";
import {useTranslate} from "app/provider/lang";
import {useSubmitReward} from "features/reward/model/use-submit-reward.ts";
import type {RewardType} from "features/reward/api/submit-reward.ts";

const OTP_CODE = '1234';

type OtpViewProps = {
    type: RewardType;
    onConfirmed: () => void; // 코드 일치 시 리워드 완료 처리(상위 report 상태 업데이트)
};

export const OtpView = ({type, onConfirmed}: OtpViewProps) => {
    const {t} = useTranslate();
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);
    const {close, openAlert} = useModal();
    const filled = code.length === OTP_CODE.length;

    const {submit} = useSubmitReward();

    const handleConfirm = async () => {
        if (code !== OTP_CODE) {
            setError(true);
            return;
        }
        // 서버 반영 성공을 확인한 뒤에만 로컬 상태 확정 + 닫기 (낙관적 업데이트 금지)
        const ok = await submit(type);
        if (!ok) {
            openAlert({message: t('errors.rewardFailed')});
            return;
        }
        onConfirmed();
        close();
    }

    return (
        <div className="flex min-h-full flex-col bg-bg-default px-5 pt-10 pb-15 text-center">
            <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col gap-4">
                    <div className="text-xl text-black">
                        <p className="font-bold leading-[1.2] whitespace-pre-line ">{t(`reward.otp.${type}.title`)}</p>
                    </div>
                    <p className="text-base leading-[1.4] tracking-[-0.32px] text-state-text-body whitespace-pre-line ">
                        {t('reward.otp.desc')}
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
