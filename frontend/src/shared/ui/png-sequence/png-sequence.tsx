import {useEffect, useRef} from "react";

interface PngSequenceProps {
    /** 재생할 프레임 URL 배열 (순서대로). 부모에서 useMemo로 고정 권장. */
    frames: string[];
    /** 초당 프레임 수. gif 느낌에 맞춰 조절하는 튜닝값. */
    fps?: number;
    /** 반복 재생 여부 */
    loop?: boolean;
    className?: string;
    alt: string;
}

/**
 * PNG 시퀀스를 gif처럼 재생. 프레임을 미리 로드해 캐시에서 src만 교체하므로
 * gif 특유의 배경 자글거림(디더링) 없이 매끄럽게 나온다.
 */
export const PngSequence = ({frames, fps = 24, loop = true, className, alt}: PngSequenceProps) => {
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // 프리로드 — 캐시에 올려두면 src 교체가 즉시 반영돼 깜빡임이 없다.
        frames.forEach((src) => {
            const img = new Image();
            img.src = src;
        });

        let raf = 0;
        let start: number | null = null;
        let last = -1;
        const frameDuration = 1000 / fps;

        const tick = (ts: number) => {
            if (start === null) start = ts;
            let idx = Math.floor((ts - start) / frameDuration);
            idx = loop ? idx % frames.length : Math.min(idx, frames.length - 1);
            if (idx !== last && imgRef.current) {
                imgRef.current.src = frames[idx];
                last = idx;
            }
            if (loop || idx < frames.length - 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [frames, fps, loop]);

    return <img ref={imgRef} src={frames[0]} alt={alt} className={className}/>;
};
