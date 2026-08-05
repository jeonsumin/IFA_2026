import {useState} from "react";
import {BottomSheet, Button} from "shared/ui";
import {cn} from "shared/lib/cn";
import {PERSONAS} from '../model/persona'
import {ButtonItem} from "widgets/survey/ui/button-item.tsx";
import {useNavigate} from "react-router-dom";
import {useTranslate} from "app/provider/lang";

// 인물 사진 좌측 경계를 카드 배경으로 부드럽게 페이드(디자인 alpha 마스크 근사)
const photoFade =
    "[mask-image:linear-gradient(to_right,transparent,#000_45%)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_45%)]";

const outlineActive =
    "border-2 border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(90deg,var(--lg-red),var(--lg-ai-pink),var(--lg-ai-purple))_border-box]";
export const Persona = () => {
    const navigate = useNavigate();
    const {t} = useTranslate();

    const [selected, setSelected] = useState<number | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const setAnswer = (surveyId: string, value: string | string[]) => {
        setAnswers((prev) => ({...prev, [surveyId]: value}));
    };

    const selectedPersona = (target: number) => {
        setSelected(target)
    }

    // 선택된 페르소나 (없으면 null) — 바텀시트에 이 페르소나의 item을 넘김
    const persona = selected !== null ? PERSONAS[selected] : null;

    const submitPersona = () => {
        if (persona == null) return
        const param = {
            persona: persona.title.join(''),
            reason: answers[persona.id]
        }
        console.log(param);
        navigate("/experience")
    }

    return (
        <div className="bg-bg-default ">
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lg-active-red/25 to-lg-gray-6/25"/>

            {/* 로봇(핑크 글로우) */}
            <div className="relative flex flex-1 items-center justify-center mt-10">
                <img
                    src="/images/welcome/cloi.png"
                    alt={t('common.robotAlt')}
                    className="w-[360px] max-w-full"
                />
            </div>

            <div className="relative mt-auto">
                <div
                    aria-hidden
                    className=" h-20 w-full bg-white/40 backdrop-blur-[8px]"
                    style={{
                        maskImage: "url(/images/welcome/glass-wave-mask.svg)",
                        WebkitMaskImage: "url(/images/welcome/glass-wave-mask.svg)",
                        maskSize: "100% 100%",
                        WebkitMaskSize: "100% 100%",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                    }}
                />


                <div className="-mt-px flex flex-col bg-white/40 px-5 pb-15 backdrop-blur-[8px] space-y-10">

                    {/* 배경 핑크→베이지 그라데이션 */}
                    <div className='flex flex-col w-full px-4 text-center gap-4'>
                        <p className='text-2xl text-black font-bold leading-6'>{t('common.slogan')}</p>
                        <p className="whitespace-pre-line text-base font-normal leading-6">
                            {t('persona.prompt')}
                        </p>
                    </div>


                    <div className="gap-2 flex flex-col">
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
                                        on ? outlineActive : "border border-white",
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
                                            {p.title.map((line) => <p key={line}>{line}</p>)}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                        <div className='pt-12 pb-[60px]'>
                            <Button disabled={!persona} onClick={() => setSheetOpen(true)}>{t('common.next')}</Button>
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
                        <p className="whitespace-pre-line">{t('persona.reasonQuestion')}</p>
                    </div>

                    <div className="w-full px-5 space-y-4 pb-10">
                        {persona && (
                            <ButtonItem
                                title=""
                                questions={persona.item}
                                value={answers[persona.id]}
                                endIcon
                                onChange={(v) => setAnswer(persona.id, v)}
                            />
                        )}
                        <Button
                            variant="ghost"
                            disabled={!persona || !answers[persona.id]}
                            onClick={submitPersona}
                            className="bg-lg-ai-gradient font-bold text-white"
                        >
                            {t('common.confirm')}
                        </Button>
                    </div>
                </div>
            </BottomSheet>
        </div>
    );
};
