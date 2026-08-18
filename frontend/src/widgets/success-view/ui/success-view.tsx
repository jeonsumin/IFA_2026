import {Button} from "shared/ui";
import {useNavigate} from "react-router-dom";
import {Trans, useTranslate} from "app/provider/lang";
import {cn} from "shared/lib";

type SuccessViewProps = {
    image?: string;
    section?: string;   // null=CLEAR, "survey"=서베이 완료, "reward"=리워드 안내
    onClick?: () => void;
}

const outlineActive =
    "border-2 border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(90deg,var(--lg-red),var(--lg-ai-pink),var(--lg-ai-purple))_border-box]";


const RewardView = () => {
    const {t} = useTranslate();
    return (
        <>
            <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-2xl font-bold leading-none text-black">{t("reward.popup.title")}</p>
                <div>
                    <p className="whitespace-pre-line text-base font-semibold leading-[1.4] text-lg-gray-2">{t("reward.popup.label1")}</p>
                    <p className="whitespace-pre-line leading-[1.4] text-lg-gray-2">{t("reward.popup.label2")}</p>
                </div>
                <div className="text-center flex flex-col gap-1">
                    <div className='flex items-center justify-center'>
                        <img src="/images/report/cloid_logo.svg" alt=""/>
                        <p className="whitespace-pre-line leading-[1.4] text-lg-gray-2">{t("reward.popup.label3")}</p>
                    </div>
                    <p className="whitespace-pre-line text-base leading-[1.4] tracking-[-0.32px] text-lg-gray-2">{t("reward.popup.label4")}</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 justify-center text-center pt-10">

                <div
                    className={cn(outlineActive, 'rounded-2xl flex justify-center items-center text-start gap-4 py-4')}>
                    <img src="/images/gift.svg" alt="gift" sizes={"36"}/>
                    <div className='text-sm whitespace-pre-line'>
                        <Trans tKey="common.rewardDesk.title" components={[<span className="font-bold"/>]}/>
                    </div>

                </div>

                <p className="text-xs whitespace-pre-line">
                    {t("common.rewardDesk.section")}
                </p>
            </div>
        </>
    )
}

const SurveyView = ({title, desc}: { title: string; desc: string; }) => {
    const {t} = useTranslate();
    return (
        <>
            <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-5xl font-bold leading-none text-black">{title}</p>
                <p className="whitespace-pre-line text-base leading-[1.4] tracking-[-0.32px] text-lg-gray-2">
                    {desc}
                </p>
            </div>
            <div className="flex flex-col gap-4 justify-center text-center pt-10">

                <div
                    className={cn(outlineActive, 'rounded-2xl flex justify-center items-center text-start gap-4 py-4')}>
                    <img src="/images/gift.svg" alt="gift" sizes={"36"}/>
                    <div className='text-sm whitespace-pre-line'>
                        <Trans tKey="common.rewardDesk.title" components={[<span className="font-bold"/>]}/>
                    </div>

                </div>

                <p className="text-xs whitespace-pre-line">
                    {t("common.rewardDesk.section")}
                </p>
            </div>
        </>
    )
}

export const SuccessView = (props: SuccessViewProps) => {
    const {
        image = "/images/welcome/cloi.png",
        section = null,
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
                    {section == "survey" &&
                        <SurveyView title={t("survey.popup.title")} desc={t("common.surveySuccessDesc")}/>}
                    {section == "reward" && <RewardView/>}
                    {section == null && <div className="flex flex-col items-center gap-4 text-center">
                        <p className="text-5xl font-bold leading-none text-black">{"CLEAR!"}</p>
                        <p className="whitespace-pre-line text-base leading-[1.4] tracking-[-0.32px] text-lg-gray-2">
                            {t("experienceSuccess.done")}
                        </p>
                    </div>}

                    <Button onClick={handleOnClick} className="mt-12 font-bold">
                        {section == null ? t("common.moreEpisodes") : t("common.confirm")}
                    </Button>
                </div>
            </div>
        </div>
    )
}
