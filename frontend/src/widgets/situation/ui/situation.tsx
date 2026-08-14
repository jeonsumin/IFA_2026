import {useState} from "react";
import {Button} from "shared/ui";
import {useNavigate} from "react-router-dom";
import {useModal} from "app/provider/modal";
import {useTranslate} from "app/provider/lang";
import type {ZoneSlug} from "entities/experience";
import {useSaveSituation} from "features/experience/save-situation";

// 옵션 제목 → 히어로 파일명 슬러그 (공백·특수문자 제거). 예: "LG Sound Suite" → "lg-sound-suite"
const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// 카피덱 옵션 항목 (persona.<key>.<zone>.options[i]) — result는 상황별 결과 문구
type Option = { title: string; desc: string; result?: string[] };

type SituationProps = {
    slug: ZoneSlug;     // 백엔드 ZONE 값 (상황 저장 키)
    titleKey: string;   // zone.<slug>.title
    optionsKey: string; // zone.<slug>.options → Option[]
    resultKey: string;  // zone.<slug>.result → string[]
};

type NextViewProps = {
    slug: ZoneSlug;      // QR 완료 처리 대상 존
    result: string[];    // 선택 옵션의 result (persona×존×상황)
    optionTitle: string; // 선택한 옵션 제목(상단 pill)
};

const NextView = ({slug, result, optionTitle}: NextViewProps) => {
    const {close} = useModal();
    const {t} = useTranslate();
    const navigate = useNavigate();

    const handlerQrScan = () => {
        close()
        navigate('/qr', {state: {zone: slug}});
    }

    return (
        <div className="bg-bg-default relative">
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lg-active-red/25 to-lg-gray-6/25"/>

            <div className='relative flex flex-col justify-center  items-center '>
                <div className="absolute z-10 top-4 text-white text-center flex flex-col justify-center gap-4 ">
                    <p className='bg-lg-ai-gradient w-fit px-3 text-white rounded-full self-center'>
                        {optionTitle}
                    </p>
                </div>
                <img src={`/images/experience/hero_${slugify(optionTitle)}.png`} alt="" aria-hidden className='w-full'/>
            </div>
            {/* 로봇(핑크 글로우) */}
            <div className="relative flex flex-1 items-center justify-center ">
                <img
                    src="/images/cloid_zone_exp.png"
                    alt={t('common.robotAlt')}
                    className="w-full max-w-full px-16"
                />
            </div>

            <div className='relative px-5 text-center space-y-6 mt-6'>
                <div className="flex flex-col gap-6 ">
                    {result.map((line, i) => (
                        <p key={i} className="whitespace-pre-line">{line}</p>
                    ))}
                </div>
                <div className='pt-12 pb-[60px]'>
                    <Button onClick={handlerQrScan}>
                        {t('situation.qrScan')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export const Situation = ({slug, titleKey, optionsKey, resultKey}: SituationProps) => {
    const {pushFullPage, openAlert} = useModal();
    const {t, tRaw} = useTranslate();

    // 선택된 존의 options 리스트를 선택 항목으로
    const options = tRaw<Option[]>(optionsKey) ?? [];
    const [selected, setSelected] = useState<number | null>(null);
    const {save, loading: saving} = useSaveSituation();
    const chosen = selected !== null ? options[selected] : null;

    // 상황 확정 → 저장(upsert) 완료 후 결과화면으로. QR은 상황 행 선행이 전제라 저장을 await.
    const handleNext = async () => {
        if (selected === null || saving) return;
        const opt = options[selected];
        const ok = await save(slug, opt.title, opt.desc);
        if (ok) {
            pushFullPage({
                content: <NextView
                    slug={slug}
                    result={opt.result ?? tRaw<string[]>(resultKey) ?? []}
                    optionTitle={opt.title}
                />,
            });
        } else {
            openAlert({message: t('situation.saveFailed')});
        }
    };

    return (
        <div className="bg-bg-default relative">
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lg-active-red/25 to-lg-gray-6/25"/>

            <div className='relative flex flex-col justify-center  items-center '>
                <div className="absolute z-10 top-4 text-white text-center flex flex-col justify-center gap-4 ">
                    <p className='bg-lg-ai-gradient w-fit px-3 text-white rounded-full self-center'>
                        {t(titleKey)}
                    </p>
                    <p className="whitespace-pre-line">{t('situation.subtitle')}</p>
                </div>
                <img src={`/images/experience/hero_${slug}.png`} alt="" aria-hidden className='w-full'/>
            </div>
            {/* 로봇(핑크 글로우) */}
            <div className="relative flex flex-1 items-center justify-center ">
                <img
                    src="/images/welcome/cloi.png"
                    alt={t('common.robotAlt')}
                    className="w-full max-w-full"
                />
            </div>

            <div className='relative px-5 text-center space-y-6 mt-6'>
                <p className="whitespace-pre-line text-xl font-bold text-black">
                    {t('situation.question')}
                </p>

                <div className="flex flex-col gap-2">
                    {options.map((o, i) => (
                        <Button
                            key={o.title}
                            variant='outline'
                            active={selected === i}
                            className="rounded-2xl bg-white/70"
                            endIcon
                            onClick={() => setSelected(i)}
                        >
                            <div className='flex flex-col gap-2'>
                                <p className="font-bold text-base text-black">{o.title}</p>
                                <p className="whitespace-pre-line text-xs">{o.desc}</p>
                            </div>
                        </Button>
                    ))}
                </div>

                <div className='pt-12 pb-[60px]'>
                    <Button
                        disabled={!chosen || saving}
                        onClick={handleNext}
                    >
                        {t('common.next')}
                    </Button>
                </div>
            </div>
        </div>
    )
};
