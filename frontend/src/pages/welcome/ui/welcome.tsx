import {Button} from "shared/ui";
import {useNavigate} from "react-router-dom";
import {useTranslate} from "app/provider/lang";

export const Welcome = () => {
    const navigate = useNavigate();
    const {t} = useTranslate();

    return (
        <div className="relative flex min-h-full flex-col bg-bg-default">
            {/* 상단 핑크 → 하단 베이지 그라데이션 */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lg-active-red/25 to-bg-default/25"/>

            {/* 로봇(핑크 글로우) */}
            <div className="relative flex flex-1 items-center justify-center mt-10">
                <img
                    src="/images/welcome/cloi.png"
                    alt={t('common.robotAlt')}
                    className="w-[360px] max-w-full"
                />
            </div>

            {/* 하단 글래스 패널 */}
            <div className="relative mt-auto">
                {/* 웨이브 seam — 패널과 동일한 bg-white/40 + backdrop-blur에 웨이브 모양 마스크만 적용해 색 일치 */}
                <div
                    aria-hidden
                    className="h-20 w-full bg-white/40 backdrop-blur-[8px]"
                    style={{
                        maskImage: "url(/images/welcome/glass-wave-mask.svg)",
                        WebkitMaskImage: "url(/images/welcome/glass-wave-mask.svg)",
                        maskSize: "100% 100%",
                        WebkitMaskSize: "100% 100%",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                    }}
                />
                <div className="-mt-px flex flex-col bg-white/40 px-5 pb-15 ">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <p className="text-4xl font-bold leading-none text-black">{t('welcome.init')}</p>
                        {/* ponytail: 체크인 이름 연동 전까지 플레이스홀더 */}
                        <p className="text-base leading-[1.4] tracking-[-0.32px] text-lg-gray-2">{t('welcome.greeting', {name: 'ABCDEFGH'})}</p>
                        <p className="whitespace-pre-line text-base leading-[1.4] tracking-[-0.32px] text-lg-gray-2">
                            {t('welcome.desc')}
                        </p>
                    </div>

                    <Button onClick={() => navigate("/persona")} className="mt-12 font-bold">
                        {t('common.start')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
