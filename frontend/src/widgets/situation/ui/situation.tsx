import {useState} from "react";
import {Button} from "shared/ui";
import {useNavigate} from "react-router-dom";
import {useModal} from "app/provider/modal";
import {useTranslate} from "app/provider/lang";
import type {ZoneSlug} from "entities/experience";
import {useSaveSituation} from "features/experience/save-situation";

// 카피덱 zone.<slug>.options 항목 형태 (widget 로컬 — pages 타입 의존 회피)
type Option = {title: string; desc: string};

type SituationProps = {
    slug: ZoneSlug;     // 백엔드 ZONE 값 (상황 저장 키)
    titleKey: string;   // zone.<slug>.title
    optionsKey: string; // zone.<slug>.options → Option[]
    resultKey: string;  // zone.<slug>.result → string[]
};

type NextViewProps = {
    slug: ZoneSlug;      // QR 완료 처리 대상 존
    titleKey: string;
    resultKey: string;
    optionTitle: string; // 선택한 옵션 제목(상단 pill)
};

const NextView = ({slug, resultKey, optionTitle}: NextViewProps) => {
    const {close} = useModal();
    const {t, tRaw} = useTranslate();
    const navigate = useNavigate();

    // 선택 완료 시 result 배열로 본문 구성
    const result = tRaw<string[]>(resultKey) ?? [];

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
                <img src="/images/zone1.png" alt="" aria-hidden className='w-full'/>
            </div>
            {/* 로봇(핑크 글로우) */}
            <div className="relative flex flex-1 items-center justify-center ">
                <img
                    src="/images/welcome/cloi.png"
                    alt={t('common.robotAlt')}
                    className="w-[360px] max-w-full"
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
        const ok = await save(slug, options[selected].title);
        if (ok) {
            pushFullPage({
                content: <NextView slug={slug} titleKey={titleKey} resultKey={resultKey} optionTitle={options[selected].title}/>,
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
                <img src="/images/zone1.png" alt="" aria-hidden className='w-full'/>
            </div>
            {/* 로봇(핑크 글로우) */}
            <div className="relative flex flex-1 items-center justify-center ">
                <img
                    src="/images/welcome/cloi.png"
                    alt={t('common.robotAlt')}
                    className="w-[200px] max-w-full"
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
