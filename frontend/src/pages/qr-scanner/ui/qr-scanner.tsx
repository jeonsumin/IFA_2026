import {lazy, Suspense, useCallback, useEffect, useState} from "react";
import {XIcon} from 'lucide-react'
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "shared/ui";
import {useTranslate} from "app/provider/lang";
import {useModal} from "app/provider/modal";
import {getExperienceStatus, type ZoneSlug} from "entities/experience";
import {useCompleteQr} from "features/experience/complete-qr";
import {useSubmitLog} from "features/submit-log";

const QrScannerView = lazy(() =>
    import("widgets/qr-scanner").then((m) => ({default: m.QrScanner}))
);

const ZONE_SLUGS: readonly ZoneSlug[] = ['entertainment', 'living', 'harmony', 'elegance'];

// 스캔 QR에서 zone 추출 — "https://.../ifa?qr=entertainment"(URL) 또는 "entertainment"(생짜) 모두 허용.
// qr 파라미터가 없거나 존 화이트리스트 밖이면 null.
const parseZone = (value: string): ZoneSlug | null => {
    let raw = value.trim();
    try {
        raw = new URL(value).searchParams.get('persona')?.trim() ?? '';
    } catch {
        // 비-URL이면 값 자체를 존 slug로 간주
    }
    raw = raw.toLowerCase();
    return (ZONE_SLUGS as readonly string[]).includes(raw) ? (raw as ZoneSlug) : null;
};

// Front_011_이미체험한경우: 스캐너 위 블러+딤 오버레이 + 클로이 + 안내 + 추가 에피소드 버튼
const AlreadyExperienceCard = () => {
    const {t} = useTranslate();
    return (
        <div
            className="absolute inset-0 z-10 flex flex-col items-center bg-black/20 px-5 pt-[26%] pb-14 backdrop-blur-[12.5px]">
            <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
                <img src="/images/cloid_clear.svg" alt="" aria-hidden className="w-[300px] max-w-[80%]"/>
                <p className="text-2xl font-bold text-white">
                    {t('qrScanner.alreadyDone')}
                </p>
            </div>
            <Button className="font-bold">
                {t('common.moreEpisodes')}
            </Button>
        </div>
    )
}

export const QrScanner = () => {
    const {t} = useTranslate();
    const navigate = useNavigate();
    const {openAlert} = useModal();
    const {complete} = useCompleteQr();
    const {logSubmit} = useSubmitLog();
    const {state} = useLocation();
    // 어느 존의 QR인지 — Situation 결과화면에서 navigate state로 전달
    const zone = (state as { zone?: ZoneSlug } | null)?.zone;

    // 이 존을 이미 완료했는지 — 완료 시 스캐너 대신 '이미 체험' 오버레이 노출
    const [alreadyDone, setAlreadyDone] = useState(false);
    useEffect(() => {
        if (!zone) return;
        let alive = true;
        getExperienceStatus()
            .then((status) => {
                if (alive) setAlreadyDone(status.zones.some((z) => z.zone === zone && z.qrScanned));
            })
            .catch(() => { /* 조회 실패 → 스캐너 노출(기본) */
            });
        return () => {
            alive = false;
        };
    }, [zone]);

    // 인식 즉시 카메라가 멈추므로, 거부(무효/타존) 시 key를 바꿔 스캐너 remount → 재스캔 가능하게.
    const [scanKey, setScanKey] = useState(0);
    const rescan = useCallback(() => setScanKey((k) => k + 1), []);

    // 스캔값의 zone이 현재 존과 일치할 때만 완료 처리.
    const handleScan = useCallback(async (value: string) => {
        if (!zone) return;
        const scanned = parseZone(value);
        if (!scanned) {
            openAlert({message: t('qrScanner.invalid'), onConfirm: rescan});
            return;
        }
        if (scanned !== zone) {
            openAlert({message: t('qrScanner.wrongZone'), onConfirm: rescan});
            return;
        }
        const ok = await complete(zone);
        if (ok) {
            await logSubmit(zone);
            navigate('/dashboard');
        }
        else openAlert({message: t('qrScanner.failed'), onConfirm: () => navigate('/dashboard')});
    }, [complete, navigate, openAlert, rescan, t, zone]);

    useEffect(() => {
        if (!import.meta.env.DEV) return;
        const injectScan = (event: Event) => {
            const value = (event as CustomEvent<string>).detail;
            if (typeof value === "string") void handleScan(value);
        };
        window.addEventListener("e2e:qr-scan", injectScan);
        return () => window.removeEventListener("e2e:qr-scan", injectScan);
    }, [handleScan]);

    return (
        <div className="relative bg-lg-gray-2 flex flex-col h-[100dvh] items-center justify-center">

            <Suspense fallback={<div
                className="flex h-full items-center justify-center">{t('qrScanner.cameraLoading')}</div>}>
                <QrScannerView
                    key={scanKey}
                    onScan={handleScan}
                    onError={(message) => console.log(message)}
                />
            </Suspense>

            <button
                type="button"
                aria-label={t('common.close')}
                onClick={() => navigate('/dashboard')}
                className='absolute bottom-10 bg-lg-gray-1 size-[60px] text-center items-center flex justify-center rounded-full'>
                <XIcon className='text-white'/>
            </button>

            {alreadyDone && <AlreadyExperienceCard/>}
        </div>
    )
}
