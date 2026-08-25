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


export const ReportCard = forwardRef<HTMLDivElement, ReportCardProps>(
    ({personaTitle, personaDesc, heroSrc, rows}, ref) => (
        <div ref={ref} style={{backgroundColor: "#f0ece4", fontFamily: FONT}} className="relative">
            {/* HERO */}
            <div className="relative h-[350px] overflow-hidden">
                <img src={heroSrc} alt="" className="absolute inset-0 h-full w-full object-cover object-top"/>
                {/* 상단 딤 */}
                <div className="absolute inset-x-0 top-0 "
                     style={{background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 88%)"}}/>
                {/* 하단 베이지 페이드 */}
                <div className="absolute inset-x-0 bottom-0 h-[160px]"
                     style={{background: "linear-gradient(180deg, rgba(240,236,228,0) 0%, #f0ece4 100%)"}}/>
                {/* LG 로고 */}
                <img src="/images/report/lg_logo.svg" alt="" className="absolute right-[20px] top-[20px] w-[40px]"/>
                {/* 헤더 텍스트 */}
                <div className="absolute left-0 top-[30px] flex w-full flex-col items-start gap-[8px] px-[16px]">
                    <div className="rounded-full bg-white px-[16px] py-[4px]">
                        <img src="/images/report/head-badge.png" alt="head-badge" width={140}/>
                    </div>
                    <p className="whitespace-pre-line text-[24px] font-bold leading-[1.1] text-white"
                       style={{textShadow: "0px 2px 4px rgba(0,0,0,0.25)"}}>
                        {personaTitle}
                    </p>
                    <p className="whitespace-pre-line text-[14px] leading-[1.4] tracking-[-0.28px] text-white"
                       style={{textShadow: "0px 2px 4px rgba(0,0,0,0.25)"}}>
                        {personaDesc}
                    </p>
                </div>
            </div>

            {/* ZONE LIST */}
            <div className="relative -mt-[100px] px-[20px] pb-[20px]">
                <div
                    className="w-full overflow-hidden rounded-[16px] border border-white shadow-[3px_3px_16px_0px_rgba(0,0,0,0.1)]"
                    style={{backgroundColor: "rgba(255,255,255,0.7)"}}>
                    {rows.map((r, i) => (
                        <div key={r.label}
                             className="flex flex-col gap-[6px] px-[20px] py-[12px]"
                             style={i > 0 ? {borderTop: "1px solid #e5e2da"} : undefined}>
                            <img src={`/images/report/${badge[r.label]}.png`} alt={badge[r.label]} width={50}/>
                            <p className="text-[20px] font-bold leading-[1.2] text-black">{r.situation}</p>
                            <p className="whitespace-pre-line text-[10px] leading-[1.4] tracking-[-0.2px] text-[#4a4946]">
                                {r.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ),
);

ReportCard.displayName = "ReportCard";
