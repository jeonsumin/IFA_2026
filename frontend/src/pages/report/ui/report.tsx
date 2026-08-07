import {Download, Gift, PenLine} from "lucide-react";
import {Button} from "shared/ui";
import {useTranslate, Trans} from "app/provider/lang";
import {useModal} from "app/provider/modal";
import {Survey} from "widgets/survey";
import {SuccessView} from "widgets/success-view";
import {OtpView} from "widgets/otp-view";

// 리포트 존 목록 (badge/title은 브랜드 고정, desc는 카피덱 키)
const ZONES = [
    {badge: "zone.entertainment.title", title: "LG Sound Suite", descKey: "report.zone.sound"},
    {badge: "zone.living.title", title: "Fit & Max Refrigerator", descKey: "report.zone.fridge"},
    {badge: "zone.harmony.title", title: "Entrance", descKey: "report.zone.entrance"},
    {badge: "zone.elegance.title", title: "30”Walloven", descKey: "report.zone.oven"},
];

export const Report = () => {
    const {t} = useTranslate();
    const {openFullPage, pushFullPage} = useModal();

    // 서베이 플로우: Survey → (제출) → SuccessView → (확인) → RewardView.
    // 각 단계를 명명 핸들러로 분리해 중첩 콜백을 평탄화한다.
    const openReward = () => pushFullPage({
        title: "리워드",
        content: <OtpView/>
    });

    const openSurveyDone = () => pushFullPage({
        content: (
            <SuccessView
                title="THANK YOU!"
                desc={"서베이 참여를 완료하였습니다. \n\n 당신의 의견은 더 나은 LG를 만드는 데 활용됩니다."}
                btnLabel="확인"
                section
                onClick={openReward}
            />
        ),
    });

    const handleSurvey = () => openFullPage({
        title: t("survey.popupTitle"),
        content: (
            <Survey onSubmit={(answers) => {
                console.log("answers : ", JSON.stringify(answers));
                openSurveyDone();
            }}/>
        ),
    });
    const handleReward = () => {

        openFullPage({
            title: "리워드",
            content: <SuccessView
                title="리워드 수령 안내"
                desc={"서베이 참여를 완료하였습니다. \n\n 당신의 의견은 더 나은 LG를 만드는 데 활용됩니다."}
                btnLabel="확인"
                section
                onClick={openReward}
            />
        })
    }

    const handleDownloadReport = () => {
    }

    return (
        <div className="flex min-h-full flex-col items-center bg-bg-default">
            {/* 상단: 페르소나 히어로 */}

            <img src="/images/report/result_persona01.png" alt=""/>
            {/*클로이 로봇*/}
            <img
                src="/images/welcome/cloi.png"
                alt={t('common.robotAlt')}
                className="w-[360px] max-w-full"
            />

            <div className="w-full">
                {/*프로스트 글래스 웨이브 seam (패널과 동일 재질)*/}
                <div
                    aria-hidden
                    className="-mt-8 h-20 w-full bg-white/40 "
                    style={{
                        maskImage: "url(/images/welcome/glass-wave-mask.svg)",
                        WebkitMaskImage: "url(/images/welcome/glass-wave-mask.svg)",
                        maskSize: "100% 100%",
                        WebkitMaskSize: "100% 100%",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                    }}
                />

                {/*결과 요약 + 존 리스트*/}
                <div className="flex flex-col gap-10 bg-white/40 px-5 pt-2 ">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className='rounded-[20px] bg-white px-3 py-1'>
                            <span
                                className="bg-lg-ai-gradient bg-clip-text text-xs font-bold text-transparent">
                                YOUR AI LIFESTYLE ROUTINE
                            </span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-base font-semibold tracking-[-0.32px] text-black">
                                <Trans tKey="report.poweredBy" components={[<span className="font-bold"/>]}/>
                            </p>
                            <p className="text-2xl font-bold text-black">{t('report.dailyRoutine')}</p>
                        </div>
                        <p className="whitespace-pre-line text-sm leading-[1.4] tracking-[-0.28px] text-lg-gray-2">
                            {t('report.routineDesc')}
                        </p>
                    </div>

                    <div
                        className="flex w-full flex-col rounded-2xl border border-white bg-white/70 shadow-[3px_3px_16px_0px_rgba(0,0,0,0.1)]">
                        {ZONES.map((z, i) => (
                            <div
                                key={z.title}
                                className={`flex flex-col gap-2 p-5 ${i > 0 ? "border-t border-lg-gray-5" : ""}`}
                            >
                                <p className="bg-lg-ai-gradient bg-clip-text text-[10px] font-bold text-transparent">{t(z.badge)}</p>
                                <p className="text-xl font-bold leading-[1.2] text-black">{z.title}</p>
                                <p className="whitespace-pre-line text-[10px] leading-[1.4] tracking-[-0.2px] text-lg-gray-2">
                                    {t(z.descKey)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/*액션 버튼*/}
                <div className="flex flex-col gap-4 bg-white/40 px-5 pb-[60px] pt-12 backdrop-blur-[8px]">
                    <Button className="flex items-center justify-center gap-2 font-bold" onClick={handleSurvey}>
                        <PenLine size={20}/>
                        {t('report.takeSurvey')}
                    </Button>
                    <Button className="flex items-center justify-center gap-2 font-bold" onClick={handleReward}>
                        <Gift size={20}/>
                        {t('report.reward')}
                    </Button>
                    <button type="button" className="mx-auto mt-2 flex items-center gap-2 border-b border-black pb-1"
                            onClick={handleDownloadReport}>
                        <Download size={16} className="text-black"/>
                        <span className="text-sm font-semibold text-black">{t('report.downloadReport')}</span>
                    </button>
                </div>

                {/*다운로드 / SNS*/}
                <div className="flex w-full flex-col items-center gap-6 bg-white px-5 py-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2">
                            <img src="/images/report/thinq.svg" alt="LG ThinQ" className="h-5 w-[100px]"/>
                            <p className="text-base font-semibold tracking-[-0.32px] text-black">{t('report.download')}</p>
                        </div>
                        <img src="/images/report/stores.png" alt="Google Play, App Store"
                             className="w-[294px] max-w-full"/>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-base font-semibold tracking-[-0.32px] text-black">{t('report.snsSubscribe')}</p>
                        <img src="/images/report/sns.png" alt="Facebook, Instagram, YouTube" className="h-12"/>
                    </div>
                </div>
            </div>
        </div>
    );
};
