import {cn} from "shared/lib/cn";
import {ZONES, type Zone} from "../model/zone";
import {useModal} from "app/provider/modal";
import {useTranslate} from "app/provider/lang";
import {Situation} from "widgets/situation";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useExperienceStatus} from "../model/use-experience-status";


// 카드 하단 사진: 중간 위로 페이드해 텍스트 영역과 자연스럽게 블렌드(디자인 마스크 근사)
const photoFade =
    "[mask-image:linear-gradient(to_bottom,transparent,#000_35%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_35%)]";

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
    const {t} = useTranslate();
    const navigate = useNavigate();
    const {clearedZones, loading} = useExperienceStatus();

    const openPopup = (zone: Zone) => {
        openFullPage(
            {
                title: '',
                content: <Situation
                    slug={zone.slug}
                    titleKey={zone.title}
                    optionsKey={zone.optionsKey}
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

    return (
        <div className="relative min-h-full bg-bg-default">
            {/* 배경 핑크→베이지 그라데이션 */}
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lg-active-red/20 to-lg-gray-6/20"/>

            <div className="relative flex flex-col items-center pb-10 ">
                {/* 상단 히어로(하단 곡선) */}
                <div className="relative h-[210px] w-full ">
                    <img src="/images/experience/hero-photo.png" alt=""
                         className="w-full"/>
                </div>

                {/* 코디네이터 원형 사진 (히어로에 겹침) */}
                <div className="size-40 overflow-hidden rounded-full">
                    <img src="/images/experience/coordinator.png" alt=""
                         className="size-full object-cover"/>
                </div>

                {/* 페르소나 타이틀 + 설명 */}
                <div className="mt-4 flex flex-col gap-2 px-5 text-center">
                    <p className="text-xl font-bold leading-[1.2] text-black">
                        THE CONNECTED<br/>FAMILY COORDINATOR
                    </p>
                    <p className="whitespace-pre-line text-sm leading-[1.4] tracking-[-0.28px] text-lg-gray-2">
                        {t('experience.personaDesc')}
                    </p>
                </div>

                {/* 공간 선택 */}
                <p className="mt-12 text-[22px] font-bold leading-[1.25] text-black">
                    {t('experience.selectSpace')}
                </p>

                {/* 존 그리드 2×2 */}
                <div className="w-full px-5 mt-4 grid grid-cols-2 gap-2">
                    {ZONES.map((z) => (
                        <div
                            key={z.title || "clear"}
                            className="relative h-[170px] overflow-hidden rounded-2xl border border-white bg-[#E6E1D600]"
                            onClick={() => openPopup(z)}
                        >
                            <img
                                src={z.img}
                                alt=""
                                aria-hidden
                                className={cn("absolute inset-x-0 bottom-0 h-fit w-full object-cover", photoFade)}
                            />

                            <div
                                className="absolute inset-x-0 top-0 flex flex-col gap-1 bg-gradient-to-b from-white/60 to-transparent p-3">
                                <p className="w-fit bg-lg-ai-gradient bg-clip-text text-sm font-bold text-transparent">
                                    {t(z.title)}
                                </p>
                                <p className="whitespace-pre-line text-[10px] leading-[1.4] tracking-[-0.2px] text-black">
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

