import {Download} from 'lucide-react';
import {Gift} from 'lucide-react';
import {PenLine} from 'lucide-react';


import {Button} from "shared/ui";

export const Report = () => {
    return (
        <div className="bg-bg-default px-5">

            <div className='flex flex-col gap-4 pt-12 pb-[60px]'>
                <Button className="flex  justify-center gap-2 font-bold items-center">
                    <PenLine size={20}/>
                    서베이 참여하기
                </Button>
                <Button className="flex  justify-center gap-2 font-bold items-center">
                    <Gift size={20}/>
                    리워드
                </Button>
                <Button variant='ghost' className=''>
                    <div className="pb-1 border-b border-black inline-flex justify-start items-center gap-2">
                        <div className="size-4 relative overflow-hidden">
                            <Download className='text-black' size={16}/>
                        </div>
                        <div
                            className="text-center justify-center text-black text-sm font-semibold leading-4">루틴
                            리포트 다운로드
                        </div>
                    </div>
                </Button>
            </div>
        </div>
    )
}
