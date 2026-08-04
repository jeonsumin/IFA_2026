import {Button} from "shared/ui";
import {useModal} from "app/provider/modal";

const NextView = () => {
    return (
        <div className='bg-bg-default h-full flex flex-col gap-10 px-5 text-center'>
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
                <Button>
                    다음
                </Button>
            </div>
        </div>
    )
}
export const Situation = () => {
    const {pushFullPage} = useModal();
    return (
        <div className='bg-bg-default h-full flex flex-col gap-10 px-5 text-center'>
            <p className=" text-xl font-bold text-black">
                어떤 상황을 <br/>
                경험해 보고 싶으신가요?
            </p>
            <Button variant='outline' className="rounded-md" endIcon>
                <div className='flex flex-col gap-6'>
                    <p className="font-bold text-base text-black"> LG Sound Suite</p>
                    <p className="text-xs"> 공간을 사운드로 더욱 MAX하게<br/>
                        Tune해주는 LG Sound Suite <br/>
                        최적화 사운드로 홈 오디오 루틴을 만나보세요
                    </p>
                </div>
            </Button>

            <div className='pt-12 pb-[60px]'>
                <Button
                    onClick={() => pushFullPage({ content: <NextView/>})}
                >
                    다음
                </Button>
            </div>
        </div>
    )
};
