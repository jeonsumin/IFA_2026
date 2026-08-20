import {Button} from "shared/ui";
import {useNavigate} from "react-router-dom";
import {useTranslate} from "app/provider/lang";


export const Home = () => {
    const navigate = useNavigate();
    const {t} = useTranslate();

    return (
        <div className="relative mx-auto h-[100dvh] w-full max-w-[var(--maxWidth)] overflow-hidden bg-lg-gray-1">
            {/* 배경 텍스처 */}
            <img
                src="/images/welcome/bg-main.jpg"
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 size-full object-cover"
            />

            {/* 장식 오브젝트 */}
            <img src="/images/welcome/object-wood.png" alt="" aria-hidden
                 className="pointer-events-none absolute left-[-51%] top-[73%] w-[111%]"/>
            <img src="/images/welcome/object-glass.png" alt="" aria-hidden
                 className="pointer-events-none absolute left-[70%] top-[11%] w-[33%] opacity-80"/>
            <img src="/images/welcome/object-redstone.png" alt="" aria-hidden
                 className="pointer-events-none absolute right-[35%] top-[-3%] w-[90%] rotate-[173.31deg]"/>
            <img src="/images/welcome/object-circle.png" alt="" aria-hidden
                 className="pointer-events-none absolute left-[61%] top-[46%] w-[32%] opacity-70"/>

            {/* 붉은 톤 블러 오버레이 */}
            <div
                className="pointer-events-none absolute left-0 top-[45%] h-[55%] w-full bg-[rgba(154,29,29,0.11)] backdrop-blur-[2.5px]"/>
            <div
                className="pointer-events-none absolute left-0 top-[45%] h-[55%] w-full bg-[rgba(154,29,29,0.02)] backdrop-blur-[2.5px]"/>
            {/* 상단 dim */}
            <div
                className="pointer-events-none absolute left-0 top-0 h-[13%] w-full bg-gradient-to-b from-black/50 to-transparent"/>

            {/* 콘텐츠 */}
            <div className="absolute inset-0 flex flex-col text-white">
                <div className="flex justify-center pt-[54px]">
                    <img src="/images/welcome/logo.svg" alt={t('common.logoAlt')} className="h-10"/>
                </div>

                <div className="mt-[9%] flex flex-col items-center gap-4 px-[30px] text-center">
                    <p className="text-2xl font-bold">{t('common.slogan')}</p>
                    <img src="/images/welcome/lifes-good.svg" alt={t('common.lifesGood')} className="w-full "/>
                </div>

                <div className="mt-auto flex flex-col bg-gradient-to-b from-transparent to-black/70 pt-10">
                    <div
                        className="flex flex-col items-center gap-4 px-5 text-center text-base leading-[1.4] tracking-[-0.32px]">
                        <p>{t('home.category')}</p>
                        <p className="whitespace-pre-line">{t('home.rhythm')}</p>
                        <p className="whitespace-pre-line">{t('home.orchestra')}</p>
                    </div>

                    <div className="px-5 py-[60px]">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/check-in")}
                            className="bg-white text-xl font-bold text-black"
                        >
                            {t('common.start')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
