import {forwardRef} from "react";

// 다운로드(캡처) 전용 카드 — Figma 385:8091. 화면 밖에서 렌더 후 html2canvas로 캡처.
// 캡처-세이프 CSS만 사용: backdrop-blur/mask-image/bg-clip-text 금지.
// 그라데이션 텍스트는 인라인 SVG(<linearGradient>+<text>)로 렌더해야 캡처됨.

export type ReportCardRow = {
    label: string;      // 존 타이틀 (그라데이션 라벨) — 예: "Entertainment in Tune"
    situation: string;  // EX_DATA.SITUATION
    desc: string;       // EX_DATA.SITUATION_DESC
};

type ReportCardProps = {
    personaTitle: string; // persona.<code>.title
    personaDesc: string;  // persona.<code>.desc
    heroSrc: string;      // /images/report/hero_<code>.png
    rows: ReportCardRow[];
};

const FONT = '"LG EI Headline", sans-serif';

// 그라데이션 텍스트 (bg-clip-text 대체) — 폭은 글자수 기반 추정(왼쪽 정렬, 넘침 무해).

const badge: Record<string, string> = {
    "Entertainment in Tune": "entertainment",
    "Living in Tune": "living",
    "Harmony in Tune": "harmony",
    "Elegance in Tune": "elegance",
}

// html2canvas는 white-space:pre-line을 안정적으로 캡처 못 함 → \n을 명시적 줄바꿈으로 렌더(캡처-세이프).
// 강조 마커 <1>..</1> 는 캡처 카드에선 볼드 없이 태그만 제거.
const lines = (text: string) =>
    text.replace(/<\/?\d+>/g, "").replace(/\n+$/, "").split("\n").map((line, i) => <span key={i}
                                                                                         className="block">{line}</span>);

export const ReportCard = forwardRef<HTMLDivElement, ReportCardProps>(
    ({personaTitle, personaDesc, heroSrc, rows}, ref) => (
        <div ref={ref} style={{fontFamily: FONT, backgroundColor: "#f0ece4"}}
             className="relative h-[900px] w-[450px] overflow-hidden">
            {/* HERO */}
            <div className="relative h-[350px] overflow-hidden">
                <img src={heroSrc} alt="" width={450} height={350}
                     className="absolute left-0 top-0 object-cover object-top" style={{width: 450, height: 350}}/>
                {/* 상단 딤 */}
                <div className="absolute inset-x-0 top-0 "
                     style={{background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 88%)"}}/>
                {/* 하단 베이지 페이드 */}
                <div className="absolute inset-x-0 bottom-0 h-[160px]"
                     style={{background: "linear-gradient(180deg, rgba(240,236,228,0) 0%, #f0ece4 100%)"}}/>
                {/* 헤더 텍스트 */}
                <div className="absolute left-0 top-[30px] flex w-full flex-col items-start gap-[8px] px-8">
                    <div className="rounded-full bg-white px-[16px] py-[4px]">
                        <img src="/images/report/head-badge.png" alt="head-badge" width={140}/>
                    </div>
                    <p className="text-[32px] font-bold leading-[1.1] text-white"
                       style={{textShadow: "0px 2px 4px rgba(0,0,0,0.25)"}}>
                        {lines(personaTitle)}
                    </p>
                    <p className="text-[22px] leading-[1.3] tracking-[-0.28px] text-white"
                       style={{textShadow: "0px 2px 4px rgba(0,0,0,0.25)"}}>
                        {lines(personaDesc)}
                    </p>
                </div>
            </div>

            {/* ZONE LIST — hero 위로 겹쳐 올림(-mt). flex-grow/% 미사용(캡처-세이프: html2canvas가 고정 레이아웃 그대로 렌더) */}
            <div className="relative z-10 -mt-[40px] px-[20px] pb-[20px]">
                <div
                    className="overflow-hidden rounded-[16px] border border-white shadow-[3px_3px_16px_0px_rgba(0,0,0,0.1)]"
                    style={{backgroundColor: "rgba(255,255,255,0.7)"}}>
                    {rows.map((r, i) => (
                        <div key={r.label}
                             className="flex flex-col justify-center gap-[6px] px-5 py-4"
                             style={i > 0 ? {borderTop: "1px solid #e5e2da"} : undefined}>
                            <img src={`/images/report/${badge[r.label]}.png`} alt={badge[r.label]} width={160}/>
                            <p className="text-[28px] font-bold leading-[1.2] tracking-[-0.28px]  text-black">{r.situation}</p>
                            <p className="text-[14px] leading-[1.3] tracking-[-0.28px] text-[#4a4946]">
                                {lines(r.desc)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ),
);

ReportCard.displayName = "ReportCard";
