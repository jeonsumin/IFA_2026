import {CalendarDays, MapPin} from "lucide-react";
import {useTranslate} from "app/provider/lang";

export const Promotion = () => {
    const {t} = useTranslate();

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
            {/* 풀블리드 배경(붉은 텍스처 + 오브젝트 + 좌우 dim, flatten) */}
            <img
                src="/images/promotion/bg.jpg"
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 size-full object-cover"
            />

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[960px] flex-col items-center justify-center gap-20 px-8 py-8 text-center">
                <img src="/images/welcome/logo.svg" alt={t('common.logoAlt')} className="h-10"/>
                {/* 로고 + Life's Good + 슬로건 */}
                <div className="flex flex-col items-center gap-6">
                    <img src="/images/welcome/lifes-good.svg" alt={t('common.lifesGood')} className="w-[700px] max-w-full"/>
                    <p className="text-4xl font-semibold">{t('common.slogan')}</p>
                </div>

                {/* 안내문 */}
                <div className="flex flex-col gap-4 text-2xl font-bold leading-[1.25]">
                    <p className="whitespace-pre-line">{t('promotion.notice1')}</p>
                    <p>{t('promotion.notice2')}</p>
                </div>

                {/* 행사 정보 글래스 카드 */}
                <div className="flex w-full max-w-[680px] flex-col gap-10 rounded-3xl bg-white/70 px-6 py-12 text-black backdrop-blur-[2px]">
                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-center gap-2.5">
                            <CalendarDays size={18}/>
                            <p className="text-2xl font-bold">{t('promotion.scheduleLabel')}</p>
                        </div>
                        <p className="text-lg leading-[1.5] tracking-[-0.36px]">{t('promotion.scheduleValue')}</p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-center gap-2.5">
                            <MapPin size={22}/>
                            <p className="text-2xl font-bold">{t('promotion.placeLabel')}</p>
                        </div>
                        <div className="text-lg leading-[1.5] tracking-[-0.36px]">
                            <p>{t('promotion.placeHall')}</p>
                            <p>{t('promotion.placeBooth')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
