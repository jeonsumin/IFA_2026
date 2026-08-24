import {useEffect, useState} from "react";
import {BottomSheet, Button} from "shared/ui";
import {cn} from "shared/lib/cn";
import {PERSONAS, PERSONA_REASON_COUNT} from '../model/persona'
import {ButtonItem} from "widgets/survey/ui/button-item.tsx";
import {useNavigate} from "react-router-dom";
import {useTranslate} from "app/provider/lang";
import {useModal} from "app/provider/modal";
import {useUserDraft} from "entities/user";
import {useSubmitCheckIn} from "features/submit-check-in";

// 인물 사진 좌측 경계를 카드 배경으로 부드럽게 페이드(디자인 alpha 마스크 근사)
export const Persona = () => {
    const navigate = useNavigate();
    const {t} = useTranslate();
    const {openAlert} = useModal();
    const draft = useUserDraft((s) => s.draft);
    const {submit} = useSubmitCheckIn();

    const [selected, setSelected] = useState<number | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const setAnswer = (surveyId: string, value: string | string[]) => {
        setAnswers((prev) => ({...prev, [surveyId]: value}));
    };

    const selectedPersona = (target: number) => {
        setSelected(target)
    }

    // 선택된 페르소나 (없으면 null)
    const persona = selected !== null ? PERSONAS[selected] : null;

    // 이유 옵션 — 카피덱 공통 persona.reasons.<i> (페르소나 무관)
    const reasons = persona
        ? Array.from({length: PERSONA_REASON_COUNT}, (_, i) => ({content: t(`persona.reasons.${i}`)}))
        : [];

    // 체크인 draft + persona 선택을 한 번에 제출 (통합 제출). 성공 시에만 체크인 확정.
    const submitPersona = async () => {
        if (persona == null || draft == null) return;
        const reason = answers[persona.id];

        // if (import.meta.env.DEV) {
        //     navigate("/dashboard");
        //     return;
        // }

        const ok = await submit({
            ...draft,
            persona: t(`${persona.key}.title`),
            personaCode: persona.id,
            reason: Array.isArray(reason) ? reason.join(", ") : reason ?? "",
        });
        if (ok) navigate("/dashboard");
        else openAlert({message: t('checkIn.submitFailed')});
    }

    useEffect(() => {
        if(draft == null){
            navigate('/')
        }
    }, [draft]);

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
                                        "relative h-[130px] w-full overflow-hidden rounded-2xl bg-white/70 bg-cover bg-no-repeat bg-right text-left tracking-[-0.24px]",
                                        !on && "border border-white",
                                    )}
                                    style={{ backgroundImage: `url('${p.img}')` }}
                                >
                                    {on && (
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent"
                                            style={{
                                                background:
                                                    "linear-gradient(#fff,#fff) padding-box, linear-gradient(90deg, var(--lg-red), var(--lg-ai-pink), var(--lg-ai-purple)) border-box",
                                                WebkitMask:
                                                    "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                                                WebkitMaskComposite: "xor",
                                                maskComposite: "exclude",
                                            }}
                                        />
                                    )}

                                    <div className="relative flex flex-col gap-2 p-4">
                                        <p className={cn(
                                            "whitespace-pre-line text-xs leading-[1.4] tracking-[-0.24px]",
                                            on ? "text-[#a43d3a]" : "text-lg-gray-2"
                                        )}>
                                            {t(`${p.key}.desc`)}
                                        </p>
                                        <p className={cn(
                                            "whitespace-pre-line text-xl font-bold leading-[1.2]",
                                            on ? "text-lg-active-red" : "text-black"
                                        )}>
                                            {t(`${p.key}.title`)}
                                        </p>
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
                <div className="flex flex-col items-center gap-10 text-center mt-10">
                    <div className="flex items-center justify-center px-20">
                        <img src="/images/cloid_welcome3.png" alt="cloid_welcome3" className='w-[188px]'/>
                    </div>
                    <div className="items-center">
                        <p className="whitespace-pre-line">{t('persona.reasonQuestion')}</p>
                    </div>

                    <div className="w-full px-5 space-y-4 pb-10">
                        {persona && (
                            <ButtonItem
                                title=""
                                questions={reasons}
                                value={answers[persona.id]}
                                endIcon
                                onChange={(v) => setAnswer(persona.id, v)}
                            />
                        )}
                        <Button
                            variant="ghost"
                            disabled={!persona || !answers[persona.id]}
                            onClick={submitPersona}
                            className="bg-lg-ai-gradient font-bold text-white "
                        >
                            {t('common.confirm')}
                        </Button>
                    </div>
                </div>
            </BottomSheet>
        </div>
    );
};
