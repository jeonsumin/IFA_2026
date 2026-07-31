import {useState} from "react";
import {BottomSheet, Button} from "shared/ui";
import {cn} from "shared/lib/cn";
import {PERSONAS} from '../model/persona'
import {PERSONA_OPTIONS} from "pages/persona/model/persona-options.ts";
import {ButtonItem} from "widgets/survey/ui/button-item.tsx";

// 인물 사진 좌측 경계를 카드 배경으로 부드럽게 페이드(디자인 alpha 마스크 근사)
const photoFade =
    "[mask-image:linear-gradient(to_right,transparent,#000_45%)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_45%)]";

const outlineActive =
    "border-2 border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(90deg,var(--lg-red),var(--lg-ai-pink),var(--lg-ai-purple))_border-box]";

export const Persona = () => {
    const [selected, setSelected] = useState<number | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const setAnswer = (surveyId: string, value: string | string[]) => {
        setAnswers((prev) => ({...prev, [surveyId]: value}));
    };

    const selectedPersona = (target: number) => {
        setSelected(target)
        setSheetOpen(true);
    }

    return (
        <div className="relative min-h-full bg-bg-default">
            {/* 배경 핑크→베이지 그라데이션 */}
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lg-active-red/25 to-lg-gray-6/25"/>

            <div className="relative">
                {/* 로봇(그라데이션 링 + 원형 페이스) */}
                <div className="flex h-[280px] items-center justify-center">
                    <div className="relative size-[190px]">
                        <img src="/images/persona/robot-ring.svg" alt="" aria-hidden
                             className="absolute inset-0 size-full"/>
                        <div
                            className="absolute left-1/2 top-1/2 size-[180px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
                            <img src="/images/persona/robot-face.png" alt="" aria-hidden
                                 className="size-full object-cover"/>
                        </div>
                    </div>
                </div>

                {/* 콘텐츠 시트(웨이브 배경) */}
                <div className="relative -mt-10">
                    <img src="/images/persona/bg-shape.svg" alt="" aria-hidden
                         className="absolute inset-0 h-full w-full object-fill"/>

                    <div className="relative flex flex-col gap-10 px-5 pb-8 pt-20">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <p className="text-2xl font-bold text-black">Innovation in tune with you</p>
                            <div className="text-base leading-[1.4] tracking-[-0.32px] text-lg-gray-2">
                                <p>가장 마음에 드는</p>
                                <p>라이프스타일을 선택하고,</p>
                                <p>LG AI가 제안하는 맞춤형 루틴을</p>
                                <p>경험해 보세요.</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            {PERSONAS.map((p, i) => {
                                const on = selected === i;
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => selectedPersona(i)}
                                        aria-pressed={on}
                                        className={cn(
                                            "relative  w-full overflow-hidden rounded-2xl bg-white/70 text-left",
                                            on ? outlineActive : "border border-white"
                                        )}
                                    >
                                        <img
                                            src={p.img}
                                            alt=""
                                            aria-hidden
                                            className={cn("absolute right-0 top-0 h-full w-[55%] object-cover", photoFade)}
                                        />
                                        <div className="relative flex flex-col gap-2 p-4 ">
                                            <div className={cn(
                                                "text-xs leading-[1.4] tracking-[-0.24px]",
                                                on ? "text-[#a43d3a]" : "text-lg-gray-2"
                                            )}>
                                                {p.desc.map((l) => <p key={l}>{l}</p>)}
                                            </div>
                                            <div className={cn(
                                                "text-xl font-bold leading-[1.2]",
                                                on ? "text-lg-active-red" : "text-black"
                                            )}>
                                                {p.title.map((t) => <p key={t}>{t}</p>)}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex justify-center pt-4">
                            <Button
                                variant="ghost"
                                disabled={selected === null}
                                className={`bg-lg-ai-gradient font-bold text-white  ${selected === null ? 'bg-disabled' : ''}`}
                            >
                                다음
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
                {/* 로봇(그라데이션 링 + 원형 페이스) */}
                <div className="flex flex-col items-center gap-10 text-center">
                    <div className="flex items-center justify-center">
                        <div className="relative size-[190px]">
                            <img src="/images/persona/robot-ring.svg" alt="" aria-hidden
                                 className="absolute inset-0 size-full"/>
                            <div
                                className="absolute left-1/2 top-1/2 size-[180px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
                                <img src="/images/persona/robot-face.png" alt="" aria-hidden
                                     className="size-full object-cover"/>
                            </div>
                        </div>
                    </div>
                    <div className="items-center">
                        <p>이 라이프 스타일을 선택한 </p>
                        <p>가장 큰 이유는 무엇인가요? </p>
                    </div>

                    <div className="w-full px-5 space-y-4 pb-10">
                        {PERSONA_OPTIONS.map((item) =>
                            <ButtonItem
                                key={item.id}
                                title={''}
                                questions={item.item ?? []}
                                value={answers[item.id]}
                                onChange={(v) => setAnswer(item.id, v)}
                            />
                        )}
                        <Button
                            variant="ghost"
                            disabled={selected === null}
                            className={`bg-lg-ai-gradient font-bold text-white  ${selected === null ? 'bg-disabled' : ''}`}
                        >
                            다음
                        </Button>
                    </div>
                </div>
            </BottomSheet>
        </div>
    );
};
