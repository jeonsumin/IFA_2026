import {Button} from "shared/ui";
import {useNavigate} from "react-router-dom";

export const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-bg-default">
            <div className='flex flex-col w-full px-5 text-center gap-4'>
                <p className='text-4xl text-black font-bold leading-9'>Welcome !</p>
                <p> {''} 님</p>
                <p> 당신의 라이프스타일을 발견하고, <br/>
                    LG AI가 제안하는 맞춤 경험을 만나보세요.</p>
            </div>

            <div className='pt-12 pb-[60px] px-5'>
                <Button onClick={() => navigate("/persona")}>시작하기</Button>
            </div>
        </div>
    );
};
