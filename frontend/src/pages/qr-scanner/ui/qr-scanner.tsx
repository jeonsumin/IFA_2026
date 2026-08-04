import {lazy, Suspense} from "react";
import {XIcon} from 'lucide-react'
import {Button} from "shared/ui";

const QrScannerView = lazy(() =>
    import("widgets/qr-scanner").then((m) => ({default: m.QrScanner}))
);

// Front_011_이미체험한경우: 스캐너 위 블러+딤 오버레이 + 클로이 + 안내 + 추가 에피소드 버튼
const AlreadyExperienceCard = () => (
    <div className="absolute inset-0 z-10 flex flex-col items-center bg-black/20 px-5 pt-[26%] pb-14 backdrop-blur-[12.5px]">
        <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
            <img src="/images/cloid_clear.svg" alt="" aria-hidden className="w-[300px] max-w-[80%]"/>
            <p className="text-2xl font-bold text-white">
                이미 체험을 완료하였습니다.
            </p>
        </div>
        <Button className="font-bold">
            추가 에피소드 만나기
        </Button>
    </div>
)

export const QrScanner = () => {
    return (
        <div className="relative bg-lg-gray-2 flex flex-col h-screen items-center justify-center">

            <Suspense fallback={<div className="flex h-full items-center justify-center">카메라 로딩 중…</div>}>
                <QrScannerView
                    onScan={(value) => {
                        console.log(value)
                    }}
                    onError={(message) => console.log(message)}
                />
            </Suspense>

            <div
                className='absolute bottom-10 bg-lg-gray-1 size-[60px] text-center items-center flex justify-center rounded-full '>
                <XIcon className='text-white'/>
            </div>

            <AlreadyExperienceCard/>
        </div>
    )
}
