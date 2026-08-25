import {cn} from "shared/lib/cn";
import {ZONES, type Zone} from "../model/zone";
import {useModal} from "app/provider/modal";
import {useTranslate} from "app/provider/lang";
import {Situation} from "widgets/situation";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useExperienceStatus} from "../model/use-experience-status";
import {experienceOptionsKey} from "../lib/persona-options";
import {Loading} from "shared/ui/loading";


// 완료(clear)된 존 위에 덮는 오버레이: 회색 + 블러 + CLEAR
const ClearOverlay = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-lg-gray-4/60 backdrop-blur-[2px]">
        <p className="text-[32px] font-bold text-white [text-shadow:2px_2px_4px_rgba(0,0,0,0.25)]">
            CLEAR
        </p>
    </div>
);

export const Experience = () => {

    const {openFullPage} = useModal();
    const {t, tRaw} = useTranslate();
    const navigate = useNavigate();
    const {clearedZones, persona, loading} = useExperienceStatus();

    const openPopup = (zone: Zone) => {
        // 페르소나×존별 옵션(persona.<key>.<zone>.options) 우선, 없으면 zone.<slug>.options fallback
        const optionsKey = experienceOptionsKey(
            persona || 'homemaker',
            zone.slug,
            (key) => (tRaw<unknown[]>(key)?.length ?? 0) > 0,
            zone.optionsKey,
        );
        openFullPage(
            {
                title: '',
                content: <Situation
                    slug={zone.slug}
                    titleKey={zone.title}
                    optionsKey={optionsKey}
                    resultKey={zone.resultKey}
                />,
            },
            {progress: true, steps: 2}
        )
    }

    // 현황 로드 후 4개 존 모두 QR 완료면 리포트로
    useEffect(() => {
        if (loading) return;
        if (ZONES.every((z) => clearedZones.has(z.slug))) navigate('/report');
    }, [loading, clearedZones, navigate]);

    if (loading) return <Loading/>;

    return (
        <div className="relative min-h-full bg-bg-default">
            {/* 배경 핑크→베이지 그라데이션 */}
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lg-active-red/20 to-lg-gray-6/20"/>

            <div className="relative flex flex-col items-center pb-10 ">
                {/* 상단 히어로(하단 곡선) */}
                <div className="relative w-full ">
                    <img src="/images/experience/hero-photo.png" alt=""
                         className="w-full"/>
                </div>

                {/* 코디네이터 원형 사진 (히어로에 겹침) */}
                <div className="size-40 overflow-hidden rounded-full border-1 border-white">
                    <img src={`/images/experience/${persona || 'homemaker'}.png`} alt=""
                         className="size-full object-cover"/>
                </div>

                {/* 페르소나 타이틀 + 설명 */}
                <div className="mt-4 flex flex-col gap-2 px-5 text-center">
                    <p className="whitespace-pre-line text-xl font-bold leading-[1.2] text-black">
                        {t(`persona.${persona || 'homemaker'}.title`)}
                    </p>
                    <p className="whitespace-pre-line text-sm leading-[1.3] tracking-[-0.28px] text-lg-gray-2">
                        {t(`persona.${persona || 'homemaker'}.section`)}
                    </p>
                </div>

                {/* 공간 선택 */}
                <p className="mt-12 text-[22px] font-bold leading-[1.25] text-black">
                    {t('common.experienceSelectSpace')}
                </p>

                {/* 존 그리드 2×2 */}
                <div className="w-full px-5 mt-[24px] grid grid-cols-2 gap-2">
                    {ZONES.map((z) => (
                        <div
                            key={z.title || "clear"}
                            className="relative h-[170px] overflow-hidden rounded-2xl border border-white bg-[#E6E1D600]"
                        >
                            <img
                                src={z.img}
                                alt=""
                                aria-hidden
                                className={cn("absolute inset-0 h-full w-full object-cover")}
                                onClick={() => openPopup(z)}
                            />

                            <div
                                onClick={() => openPopup(z)}
                                className="absolute inset-x-0 top-0 flex flex-col gap-1 bg-gradient-to-b from-white/60 to-transparent p-3">
                                <p className="w-fit bg-lg-ai-gradient bg-clip-text text-sm font-bold text-transparent leading-4 tracking-[-0.28px]">
                                    {t(z.title)}
                                </p>
                                <p className="whitespace-pre-line text-[10px] leading-[1.3] tracking-[-0.2px] text-black">
                                    {t(z.descKey)}
                                </p>
                            </div>
                            {clearedZones.has(z.slug) && <ClearOverlay/>}

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

