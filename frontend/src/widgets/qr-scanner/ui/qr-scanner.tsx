import {useEffect, useRef} from "react";
import {BrowserQRCodeReader, type IScannerControls} from "@zxing/browser";

type Props = {
    onScan: (value: string) => void;
    onError?: (message: string) => void;
};

export const QrScanner = ({onScan, onError}: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    // 콜백을 ref로 고정 → 리렌더로 카메라 재시작되지 않게
    const onScanRef = useRef(onScan);
    const onErrorRef = useRef(onError);
    onScanRef.current = onScan;
    onErrorRef.current = onError;

    useEffect(() => {
        let controls: IScannerControls | undefined;
        let cancelled = false;
        const reader = new BrowserQRCodeReader(undefined, {delayBetweenScanAttempts: 300});

        (async () => {
            try {
                if (!videoRef.current) return;
                // deviceId undefined → 후면(환경) 카메라 자동 선택
                controls = await reader.decodeFromVideoDevice(
                    undefined,
                    videoRef.current,
                    (result, _err, ctrl) => {
                        if (result) {
                            ctrl.stop();
                            onScanRef.current(result.getText());
                        }
                        // _err: 빈 프레임마다 NotFoundException → 무시
                    }
                );
                if (cancelled) controls.stop(); // 마운트 해제 레이스 방지
            } catch (e) {
                onErrorRef.current?.(e instanceof Error ? e.message : "카메라를 시작할 수 없습니다.");
            }
        })();

        return () => {
            cancelled = true;
            controls?.stop(); // 언마운트 시 카메라 스트림 해제
        };
    }, []);

    return (
        <div className="relative flex h-full w-full items-center justify-center bg-black">
            <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover"/>
            {/* 조준 가이드 */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-56 w-56 rounded-lg border-2 border-white/80"/>
            </div>
        </div>
    );
};
