import {Button} from "shared/ui";
import {useNavigate} from "react-router-dom";
import {useModal} from "app/provider/modal";

const NextView = () => {
    const {close} = useModal();
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
                    alt="LG 클로이 로봇"
                    className="w-[360px] max-w-full"
                />
            </div>

            <div className='relative px-5 text-center space-y-6 mt-6'>
                <div className="flex flex-col gap-6 ">
                    <p>
                        일과 휴식이 공존하는 공간에서는<br/>
                        휴식의 몰입감도 중요합니다
                    </p>
                    <p>
                        LG Sound Suite가 재생되는 콘텐츠를 분석해<br/>
                        공간에 맞는 입체 사운드와<br/>
                        최적의 음향을 자동으로 조율하고,<br/>
                        집에서도 새로운 공간에 있는 듯한 몰입감을
                        선사합니다.
                    </p>
                    <p>
                        새로운 공간을 만들어주는<br/>
                        사운드를 경험 해 보세요
                    </p>
                </div>
                <div className='pt-12 pb-[60px]'>
                    <Button onClick={handlerQrScan}>
                        QR 스캔하기
                    </Button>
                </div>
            </div>
        </div>
    )
}
export const Situation = () => {
    const {pushFullPage} = useModal();
    return (
        <div className="bg-bg-default relative">
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lg-active-red/25 to-lg-gray-6/25"/>

            <div className='relative flex flex-col justify-center  items-center '>
                <div className="absolute z-10 top-4 text-white text-center flex flex-col justify-center gap-4 ">
                    <p className='bg-lg-ai-gradient w-fit px-3 text-white rounded-full self-center'>
                        Entertainment in Tune
                    </p>
                    <p>
                        LG AI가 당신의 라이프스타일에 <br/>
                        어떻게 조율되는지 경험해 보세요.
                    </p>
                </div>
                <img src="/images/zone1.png" alt="zone1" className='w-full'/>
            </div>
            {/* 로봇(핑크 글로우) */}
            <div className="relative flex flex-1 items-center justify-center ">
                <img
                    src="/images/welcome/cloi.png"
                    alt="LG 클로이 로봇"
                    className="w-[200px] max-w-full"
                />
            </div>

            <div className='relative px-5 text-center space-y-6 mt-6'>
                <p className="text-xl font-bold text-black">
                    어떤 상황을 <br/>
                    경험해 보고 싶으신가요?
                </p>
                <Button variant='outline' className="rounded-2xl bg-white/70" endIcon>
                    <div className='flex flex-col gap-2'>
                        <p className="font-bold text-base text-black"> LG Sound Suite</p>
                        <p className="text-xs"> 공간을 사운드로 더욱 MAX하게<br/>
                            Tune해주는 LG Sound Suite <br/>
                            최적화 사운드로 홈 오디오 루틴을 만나보세요
                        </p>
                    </div>
                </Button>

                <div className='pt-12 pb-[60px]'>
                    <Button
                        onClick={() => pushFullPage({content: <NextView/>})}
                    >
                        다음
                    </Button>
                </div>
            </div>
        </div>
    )
};
