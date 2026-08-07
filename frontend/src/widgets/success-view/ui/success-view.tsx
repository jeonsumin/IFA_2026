import {Button} from "shared/ui";
import {useNavigate} from "react-router-dom";
import {useTranslate} from "app/provider/lang";
import {cn} from "shared/lib";

type SuccessViewProps = {
    image?: string;
    title?: string;
    desc?: string;
    section?: boolean;
    caption?: boolean;
    btnLabel?: string;
    onClick?: () => void;

}

const outlineActive =
    "border-2 border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(90deg,var(--lg-red),var(--lg-ai-pink),var(--lg-ai-purple))_border-box]";


export const SuccessView = (props: SuccessViewProps) => {
    const {
        image = "/images/welcome/cloi.png",
        title = "CLEAR!",
        desc = "experienceSuccess.done",
        section = false,
        btnLabel = "common.moreEpisodes",
        onClick
    } = props;
    const navigate = useNavigate();
    const {t} = useTranslate();

    const handleOnClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate("/dashboard");
        }
    }
    return (
        <div className="relative flex min-h-full flex-col bg-bg-default">
            {/* 상단 핑크 → 하단 베이지 그라데이션 */}
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lg-active-red/25 to-bg-default/25"/>

            {/* 로봇(핑크 글로우) */}
            <div className="relative flex flex-1 items-center justify-center mt-10">
                <img
                    src={image}
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
                        <p className="text-5xl font-bold leading-none text-black">{title}</p>
                        <p className="whitespace-pre-line text-base leading-[1.4] tracking-[-0.32px] text-lg-gray-2">
                            {t(desc)}
                        </p>
                    </div>

                    {
                        section && (
                            <div className="flex flex-col gap-4 justify-center text-center pt-10">

                                <div
                                    className={cn(outlineActive, 'rounded-2xl flex justify-center items-center text-start gap-4 py-4')}>
                                    <img src="/images/gift.svg" alt="gift" sizes={"36"}/>
                                    <div className='text-sm'>
                                        <span className="font-bold">Reward Desk</span>에서 <br/>
                                        리워드를 수령해 주세요.
                                    </div>

                                </div>
                                <p className="text-xs ">아래 확인 버튼을 누르지말고 <br/>
                                    리워드 데스크 스탭에게 이 화면을 보여주세요
                                </p>
                            </div>
                        )
                    }

                    <Button onClick={handleOnClick} className="mt-12 font-bold">
                        {t(btnLabel)}
                    </Button>
                </div>
            </div>
        </div>
    )
}
