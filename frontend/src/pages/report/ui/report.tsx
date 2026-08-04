import {Download, Gift, PenLine} from "lucide-react";
import {Button} from "shared/ui";

// 리포트 존 목록 (디자인 고정 콘텐츠)
const ZONES = [
    {
        badge: "Entertainment in Tune",
        title: "LG Sound Suite",
        desc: ["나만의 공간을 프리미엄하게 Tune해주는 LG Sound Suite", "나에게 맞춘 홈 오디오 루틴을 만나보세요."],
    },
    {
        badge: "Living in Tune",
        title: "Fit & Max Refrigerator",
        desc: ["식생활도 스마트하게 Tune해주는 Refrigerator", "식재료 별 맞춤 온도로 보관하는 냉장고 관리 루틴을 만나보세요"],
    },
    {
        badge: "Harmony in Tune",
        title: "Entrance",
        desc: ["집 밖에서도 집을 Tune하는 ThinQ Claw", "혼자 사는 일상을 위한 AI Home Solution with Claw를 경험해보세요."],
    },
    {
        badge: "Elegance in Tune",
        title: "30”Walloven",
        desc: ["재료에 맞는 요리방법을 Tune해주는 오븐", "Oven AI 추천으로 완성되는 쿠킹 루틴을 만나보세요"],
    },
];

export const Report = () => {
    return (
        <div className="flex min-h-full flex-col items-center bg-bg-default">
            {/* 상단: 페르소나 히어로 */}

            <img src="/images/report/result_persona01.png" alt=""/>
            {/*클로이 로봇*/}
            <img
                src="/images/welcome/cloi.png"
                alt="LG 클로이 로봇"
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
                        <span
                            className="rounded-[20px] bg-white px-3 py-1 bg-lg-ai-gradient bg-clip-text text-xs font-bold tracking-[-0.24px] text-transparent">
                            YOUR AI LIFESTYLE ROUTINE
                        </span>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-base font-semibold tracking-[-0.32px] text-black">
                                <span className="font-bold">CLOiD</span>가 함께 한
                            </p>
                            <p className="text-2xl font-bold text-black">당신의 Daily Routine</p>
                        </div>
                        <p className="text-sm leading-[1.4] tracking-[-0.28px] text-lg-gray-2">
                            생활 패턴에 맞춰 집안일은 더 간편하게,<br/>
                            휴식은 더 몰입감 있게.<br/>
                            LG AI가 당신의 하루를 자연스럽게 연결합니다.
                        </p>
                    </div>

                    <div
                        className="flex w-full flex-col rounded-2xl border border-white bg-white/70 shadow-[3px_3px_16px_0px_rgba(0,0,0,0.1)]">
                        {ZONES.map((z, i) => (
                            <div
                                key={z.title}
                                className={`flex flex-col gap-2 p-5 ${i > 0 ? "border-t border-lg-gray-5" : ""}`}
                            >
                                <p className="bg-lg-ai-gradient bg-clip-text text-[10px] font-bold text-transparent">{z.badge}</p>
                                <p className="text-xl font-bold leading-[1.2] text-black">{z.title}</p>
                                <div className="text-[10px] leading-[1.4] tracking-[-0.2px] text-lg-gray-2">
                                    {z.desc.map((l) => <p key={l}>{l}</p>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/*액션 버튼*/}
                <div className="flex flex-col gap-4 bg-white/40 px-5 pb-[60px] pt-12 backdrop-blur-[8px]">
                    <Button className="flex items-center justify-center gap-2 font-bold">
                        <PenLine size={20}/>
                        서베이 참여하기
                    </Button>
                    <Button className="flex items-center justify-center gap-2 font-bold">
                        <Gift size={20}/>
                        리워드
                    </Button>
                    <button type="button" className="mx-auto mt-2 flex items-center gap-2 border-b border-black pb-1">
                        <Download size={16} className="text-black"/>
                        <span className="text-sm font-semibold text-black">루틴 리포트 다운로드</span>
                    </button>
                </div>

                {/*다운로드 / SNS*/}
                <div className="flex w-full flex-col items-center gap-6 bg-white px-5 py-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2">
                            <img src="/images/report/thinq.svg" alt="LG ThinQ" className="h-5 w-[100px]"/>
                            <p className="text-base font-semibold tracking-[-0.32px] text-black">다운로드</p>
                        </div>
                        <img src="/images/report/stores.png" alt="Google Play, App Store"
                             className="w-[294px] max-w-full"/>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-base font-semibold tracking-[-0.32px] text-black">LG전자 공식 SNS 구독하기</p>
                        <img src="/images/report/sns.png" alt="Facebook, Instagram, YouTube" className="h-12"/>
                    </div>
                </div>
            </div>
        </div>
    );
};
