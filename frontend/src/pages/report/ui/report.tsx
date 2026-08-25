import {Download, Gift, PenLine, Heart} from "lucide-react";
import {useRef} from "react";
import {Button} from "shared/ui";
import {useTranslate} from "app/provider/lang";
import {useModal} from "app/provider/modal";
import {Survey} from "widgets/survey";
import {SuccessView} from "widgets/success-view";
import {OtpView} from "widgets/otp-view";
import {ReportCard} from "widgets/report-card";
import {useSubmitSurvey} from "features/submit-survey";
import {useReportStatus} from "../model/use-report-status.ts";
import {ZONES} from "pages/experience/model/zone.ts";
import {useSubmitLog} from "features/submit-log";
import {useDownloadReport} from "features/download-report";
import type {RewardType} from "features/reward/api/submit-reward.ts";

export const Report = () => {
    const {t, tRaw} = useTranslate();
    const {openFullPage, pushFullPage, openAlert} = useModal();

    const {submit} = useSubmitSurvey();
    const {logSubmit} = useSubmitLog();
    const {reportStatus, markSurveyDone, markSurveyRewarded, makeRewardDown} = useReportStatus();

    // 다운로드 카드(화면 밖) 캡처 대상 + 캡처 훅
    const cardRef = useRef<HTMLDivElement>(null);
    const {download, loading: downloading} = useDownloadReport();

    // 존별 SITUATION/DESC → 카드 행 (ZONES 순서, 완료 존만)
    const cardRows = ZONES.flatMap((z) => {
        const s = reportStatus.situation.find((x) => x.ZONE === z.slug);
        return s ? [{label: t(z.title), situation: s.SITUATION, desc: s.SITUATION_DESC}] : [];
    });
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
                image={"/images/cloid_welcome3.png"}
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
            title: t("report.reward"),
            content: <SuccessView
                section={type}
                image={"/images/cloid_welcome3.png"}
                onClick={() => openReward(type, onConfirmed)}
            />
        })
    }

    // 캡처 → 미리보기 노출 → (버튼) 저장. iOS Safari는 프로그램적 저장이 막혀 이미지 롱프레스 저장이 필요.
    const handleDownloadReport = async () => {
        await logSubmit("report")
        await download(cardRef.current);
    }

    const handleOnClick = async (type: string) => {
        if (["google", "apple", "facebook", "instagram", "youtube"].includes(type)) {
            const urlMap: Record<string, string> = {
                "google": 'https://play.google.com/store/search?q=lg+thinq&c=apps',
                "apple": 'https://apps.apple.com/kr/app/lg-thinq/id993504342',
                "facebook": 'https://www.facebook.com/LGGlobal',
                "instagram": 'https://www.instagram.com/lg_global/',
                "Youtube": 'https://www.youtube.com/@LGGlobal',
            };
            window.open(urlMap[type], '_blank', 'noopener,noreferrer');
            await logSubmit(type)
        }
    }

    return (
        <div className="flex min-h-full flex-col items-center bg-bg-default">
            {/* 상단: 페르소나 히어로 */}

            <img src={`/images/report/result_${reportStatus.persona}.png`} alt=""/>
            {/*클로이 로봇*/}
            <img
                src="/images/report/result_cloi.png"
                alt={t('common.robotAlt')}
                className="w-[200px] max-w-full"
            />

            <div className="w-full">
                {/*프로스트 글래스 웨이브 seam (패널과 동일 재질)*/}
                <div
                    aria-hidden
                    className="h-20 w-full bg-white/40 "
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
                        <div className='rounded-[20px] bg-white px-3 flex justify-start py-1'>
                            <span
                                className="bg-lg-ai-gradient bg-clip-text text-xs font-bold text-transparent">
                                Innovation in tune with you
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-2xl font-bold text-black">{t('report.dailyRoutine')}</p>
                            <p className="text-base font-semibold tracking-[-0.32px] text-black flex gap-2">
                                {t("report.poweredBy")}
                                <img src="/images/report/cloid_logo.svg" alt=""/>
                            </p>
                        </div>
                        <p className="whitespace-pre-line text-sm  leading-[1.3] tracking-[-0.28px] text-lg-gray-2">
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
                                    <p className="bg-lg-ai-gradient bg-clip-text text-[11px] font-bold text-transparent w-fit">{t(z.title)}</p>
                                    <p className="text-xl font-bold leading-[1.2] text-black">{option?.title ?? s.SITUATION}</p>
                                    <p className="whitespace-pre-line text-[16px] leading-[1.3] tracking-[-0.2px] text-lg-gray-2">
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
                    <button type="button" disabled={downloading}
                            className="mx-auto mt-2 flex items-center gap-2 border-b border-black pb-1 disabled:opacity-50"
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
                            <img src="/images/report/stores_google.png"
                                 alt="Google Play"
                                 className="w-[140px] max-w-full"
                                 onClick={() => handleOnClick("google")}
                            />

                            <img src="/images/report/stores_apple.png"
                                 alt="App Store"
                                 className="w-[140px] max-w-full"
                                 onClick={() => handleOnClick("apple")}
                            />

                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-base font-semibold tracking-[-0.32px] text-black">{t('report.snsSubscribe')}</p>
                        <div className={"flex gap-2"}>
                            <img src="/images/report/icn_facebook.svg" alt="Facebook" className="h-12"
                                 onClick={() => handleOnClick("facebook")}/>
                            <img src="/images/report/icn_instagram.svg" alt="Instagram" className="h-12"
                                 onClick={() => handleOnClick("instagram")}/>
                            <img src="/images/report/icn_youtube.svg" alt="YouTube" className="h-12"
                                 onClick={() => handleOnClick("youtube")}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* 캡처 전용 카드 — 화면 밖(display:none 아님, 레이아웃 필요). handleDownloadReport가 이 노드를 html2canvas로 캡처 */}
            <div aria-hidden style={{position: "fixed", left: -99999, top: 0, pointerEvents: "none"}}>
                <ReportCard
                    ref={cardRef}
                    personaTitle={t(`persona.${reportStatus.persona}.title`)}
                    personaDesc={t(`persona.${reportStatus.persona}.desc`)}
                    heroSrc={`/images/report/hero_${reportStatus.persona}.png`}
                    rows={cardRows}
                />
            </div>
        </div>
    );
};
