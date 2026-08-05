import {Button} from "shared/ui";
import {useNavigate} from "react-router-dom";
import {useModal} from "app/provider/modal";
import {useTranslate} from "app/provider/lang";

const NextView = () => {
    const {close} = useModal();
    const {t} = useTranslate();
    const navigate = useNavigate();

    const handlerQrScan = () => {
        close()
        navigate('/qr');
    }

    return (
        <div className="bg-bg-default relative">
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lg-active-red/25 to-lg-gray-6/25"/>

            <div className='relative flex flex-col justify-center  items-center '>
                <div className="absolute z-10 top-4 text-white text-center flex flex-col justify-center gap-4 ">
                    <p className='bg-lg-ai-gradient w-fit px-3 text-white rounded-full self-center'>
                        LG Sound Suite
                    </p>
                </div>
                <img src="/images/zone1.png" alt="zone1" className='w-full'/>
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
                    <p className="whitespace-pre-line">{t('situation.next1')}</p>
                    <p className="whitespace-pre-line">{t('situation.next2')}</p>
                    <p className="whitespace-pre-line">{t('situation.next3')}</p>
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
export const Situation = () => {
    const {pushFullPage} = useModal();
    const {t} = useTranslate();
    return (
        <div className="bg-bg-default relative">
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lg-active-red/25 to-lg-gray-6/25"/>

            <div className='relative flex flex-col justify-center  items-center '>
                <div className="absolute z-10 top-4 text-white text-center flex flex-col justify-center gap-4 ">
                    <p className='bg-lg-ai-gradient w-fit px-3 text-white rounded-full self-center'>
                        Entertainment in Tune
                    </p>
                    <p className="whitespace-pre-line">{t('situation.subtitle')}</p>
                </div>
                <img src="/images/zone1.png" alt="zone1" className='w-full'/>
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
                <Button variant='outline' className="rounded-2xl bg-white/70" endIcon>
                    <div className='flex flex-col gap-2'>
                        <p className="font-bold text-base text-black"> LG Sound Suite</p>
                        <p className="whitespace-pre-line text-xs">{t('situation.soundSuiteDesc')}</p>
                    </div>
                </Button>

                <div className='pt-12 pb-[60px]'>
                    <Button
                        onClick={() => pushFullPage({content: <NextView/>})}
                    >
                        {t('common.next')}
                    </Button>
                </div>
            </div>
        </div>
    )
};
