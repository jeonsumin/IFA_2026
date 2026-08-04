import {CalendarDays, MapPin} from "lucide-react";

export const Promotion = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
            {/* 풀블리드 배경(붉은 텍스처 + 오브젝트 + 좌우 dim, flatten) */}
            <img
                src="/images/promotion/bg.jpg"
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 size-full object-cover"
            />

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[960px] flex-col items-center justify-center gap-20 px-8 py-16 text-center">
                {/* 로고 + Life's Good + 슬로건 */}
                <div className="flex flex-col items-center gap-6">
                    <img src="/images/welcome/logo.svg" alt="LG IFA" className="h-8"/>
                    <img src="/images/welcome/lifes-good.svg" alt="Life's Good." className="w-[700px] max-w-full"/>
                    <p className="text-4xl font-semibold">Innovation in tune with you</p>
                </div>

                {/* 안내문 */}
                <div className="flex flex-col gap-4 text-2xl font-bold leading-[1.25]">
                    <div>
                        <p>본 사이트는 IFA 2026 LG Booth</p>
                        <p>경험을 위한 사이트 입니다.</p>
                    </div>
                    <p>오프라인 방문을 부탁드립니다.</p>
                </div>

                {/* 행사 정보 글래스 카드 */}
                <div className="flex w-full max-w-[680px] flex-col gap-10 rounded-3xl bg-white/70 px-6 py-12 text-black backdrop-blur-[2px]">
                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-center gap-2.5">
                            <CalendarDays size={18}/>
                            <p className="text-2xl font-bold">행사 일정</p>
                        </div>
                        <p className="text-lg leading-[1.5] tracking-[-0.36px]">2026년 9월 4일(금) ~ 9월 9일(수)</p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-center gap-2.5">
                            <MapPin size={22}/>
                            <p className="text-2xl font-bold">행사 장소</p>
                        </div>
                        <div className="text-lg leading-[1.5] tracking-[-0.36px]">
                            <p>IFA 2026 (Messe Berlin 18Hall)</p>
                            <p>LG전자 부스</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
