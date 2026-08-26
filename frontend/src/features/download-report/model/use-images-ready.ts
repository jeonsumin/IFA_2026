import {useEffect, useState, type RefObject} from "react";
import {waitForImages} from "../lib/wait-for-images";

// ref 노드 안 이미지가 다 로드되면 true. 다운로드(캡처) 준비 완료 판단 → 버튼 활성화용.
export const useImagesReady = (ref: RefObject<HTMLElement | null>) => {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        let cancelled = false;
        waitForImages(node).then(() => !cancelled && setReady(true));
        return () => {
            cancelled = true;
        };
    }, [ref]);
    return ready;
};
