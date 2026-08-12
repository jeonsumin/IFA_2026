import {Download, Gift, PenLine, Heart} from "lucide-react";
import {Button} from "shared/ui";
import {useTranslate} from "app/provider/lang";
import {useModal} from "app/provider/modal";
import {Survey} from "widgets/survey";
import {SuccessView} from "widgets/success-view";
import {OtpView} from "widgets/otp-view";
import {useSubmitSurvey} from "features/submit-survey";
import {useReportStatus} from "../model/use-report-status.ts";
import {ZONES} from "pages/experience/model/zone.ts";
import {useSubmitLog} from "features/submit-log";
import type {RewardType} from "features/reward/api/submit-reward.ts";

export const Report = () => {
    const {t, tRaw} = useTranslate();
    const {openFullPage, pushFullPage, openAlert} = useModal();

    const {submit} = useSubmitSurvey();
    const {logSubmit} = useSubmitLog();
    const {reportStatus, markSurveyDone, markSurveyRewarded, makeRewardDown} = useReportStatus();
    // 서베이 플로우: Survey → (제출) → SuccessView → (확인) → RewardView.
    // 각 단계를 명명 핸들러로 분리해 중첩 콜백을 평탄화한다.
    // OTP 확인 시 실행할 완료 처리(onConfirmed)를 진입 경로별로 주입 — 서베이/리워드 분리.
    const openReward = (type: RewardType, onConfirmed: () => void) => pushFullPage({
        title: t("report.reward"),
        content: <OtpView onConfirmed={onConfirmed} type={type}/>
    });

    const openSurveyDone = (type: RewardType) => pushFullPage({
        content: (
            <SuccessView
                section={"survey"}
                onClick={() => openReward(type, markSurveyRewarded)}
            />
        ),
    });

    const handleSurvey = () => openFullPage({
        title: t("survey.popupTitle"),
        content: (
            <Survey onSubmit={async (answers) => {
                const ok = await submit(answers);
                if (ok) {
                    markSurveyDone(); // 버튼: 서베이 참여하기 → 추가 리워드
                    openSurveyDone("survey");
                } else openAlert({message: t('errors.surveyFailed')});
            }}/>
        ),
    });

    const handleReward = (type: RewardType, onConfirmed: () => void) => {
        openFullPage({
            title: "리워드",
            content: <SuccessView
                section={type}
                onClick={() => openReward(type, onConfirmed)}
            />
        })
    }

    const handleDownloadReport = () => {
    }

    const handleStore = async (type: string) => {
        switch (type) {
            case "google" :
                await logSubmit('google')
                window.open('https://play.google.com/store/search?q=lg+thinq&c=apps', '_blank');
                break;
            case "apple" :
                await logSubmit('apple')
                window.open('https://apps.apple.com/kr/app/lg-thinq/id993504342', '_blank');
                break;
            default:
                break;
        }
    }

    const handleSns = async (type: string) => {
        switch (type) {
            case "facebook" :
                await logSubmit('facebook')
                window.open('https://www.facebook.com/LGGlobal', '_blank');
                break
            case "instagram" :
                await logSubmit('instagram')
                window.open('https://www.instagram.com/lg_global', '_blank');
                break
            case "youtube" :
                await logSubmit('youtube')
                window.open('https://www.youtube.com/@LGGlobal', '_blank');
                break
            default:
                break;
        }
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
                        <div className="flex flex-col items-center">
                            <p className="text-base font-semibold tracking-[-0.32px] text-black flex ">
                                <img src="/images/report/cloid_logo.svg" alt=""/>
                                {t("report.poweredBy")}
                            </p>
                            <p className="text-2xl font-bold text-black">{t('report.dailyRoutine')}</p>
                        </div>
                        <p className="whitespace-pre-line text-sm font-semibold leading-[1.4] tracking-[-0.28px] text-lg-gray-2">
                            {t('report.routineDesc')}
                        </p>
                    </div>

                    <div
                        className="flex w-full flex-col rounded-2xl border border-white bg-white/70 shadow-[3px_3px_16px_0px_rgba(0,0,0,0.1)]">
                        {/* 완료 존(situation) 기준 → ZONES 매칭 → optionsKey에서 SITUATION과 같은 옵션의 title/desc 바인딩 */}
                        {reportStatus.situation.map((s, i) => {

                            const z = ZONES.find((zone) => zone.slug === s.ZONE);
                            if (!z) return null;
                            const option = (tRaw<{ title: string; desc: string }[]>(z.optionsKey) ?? [])
                                .find((o) => o.title === s.SITUATION);

                            return (
                                <div
                                    key={s.ZONE}
                                    className={`flex flex-col gap-2 p-5 ${i > 0 ? "border-t border-lg-gray-5" : ""}`}
                                >
                                    <p className="bg-lg-ai-gradient bg-clip-text text-[10px] font-bold text-transparent">{t(z.title)}</p>
                                    <p className="text-xl font-bold leading-[1.2] text-black">{option?.title ?? s.SITUATION}</p>
                                    <p className="whitespace-pre-line text-[10px] leading-[1.4] tracking-[-0.2px] text-lg-gray-2">
                                        {option?.desc ?? s.SITUATION_DESC}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/*액션 버튼*/}
                <div className="flex flex-col gap-4 bg-white/40 px-5 pb-[60px] pt-12 backdrop-blur-[8px]">
                    {/* 서베이 상태 tri-state: null=미참여('서베이 참여하기'), 1=참여('추가 리워드'), 2=리워드완료(비활성) */}
                    <Button
                        className="flex items-center justify-center gap-2 font-bold"
                        onClick={reportStatus.surveyReward == null ? handleSurvey : () => handleReward('survey', markSurveyRewarded)}
                        disabled={reportStatus.surveyReward === 2}
                    >
                        {reportStatus.surveyReward == null ? <PenLine size={20}/> : <Heart size={20}/>}
                        {reportStatus.surveyReward == null ? t('report.takeSurvey') : t('report.extraReward')}
                    </Button>
                    <Button
                        className="flex items-center justify-center gap-2 font-bold"
                        onClick={() => handleReward('reward', makeRewardDown)}
                        disabled={reportStatus?.userReward ?? false}
                    >
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
                        <div className="flex px-3.5 gap-2">
                            <img src="/images/report/stores_google.svg"
                                 alt="Google Play"
                                 className="w-[294px] max-w-full"
                                 onClick={() => handleStore("google")}
                            />

                            <img src="/images/report/stores_apple.svg"
                                 alt="App Store"
                                 className="w-[294px] max-w-full"
                                 onClick={() => handleStore("apple")}
                            />

                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-base font-semibold tracking-[-0.32px] text-black">{t('report.snsSubscribe')}</p>
                        <div className={"flex gap-2"}>
                            <img src="/images/report/icn_facebook.svg" alt="Facebook" className="h-12"
                                 onClick={() => handleSns("facebook")}/>
                            <img src="/images/report/icn_instagram.svg" alt="Instagram" className="h-12"
                                 onClick={() => handleSns("instagram")}/>
                            <img src="/images/report/icn_youtube.svg" alt="YouTube" className="h-12"
                                 onClick={() => handleSns("youtube")}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
