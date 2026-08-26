import {useRef, useState} from "react";
import html2canvas from "html2canvas-pro";
import {waitForImages} from "../lib/wait-for-images";

// 화면 밖 ReportCard 노드를 PNG로 캡처해 다운로드. html2canvas-pro는 Tailwind v4 oklch 지원.
export const useDownloadReport = () => {
    const [loading, setLoading] = useState(false);
    const warmed = useRef(false); // 첫 html2canvas 렌더는 클론에 스타일/폰트가 덜 실려 레이아웃이 깨짐

    const download = async (node: HTMLElement | null, filename = "lg-ifa-report.png") => {
        if (!node || loading) return;
        setLoading(true);
        const BG = "#f0ece4";
        try {
            await document.fonts.ready;   // 폰트 로드 후 캡처(누락 방지)
            await waitForImages(node);     // 이미지 로드 후 캡처 (버튼 비활성화와 동일 조건 — 안전망)
            const opts = {
                scale: 3,               // 레티나 선명도
                backgroundColor: BG,
                useCORS: true,
                width: node.offsetWidth,    // 고정 카드 박스(450×900)로 캡처 크기 고정
                height: node.offsetHeight,  // overflow 넘침분(scrollHeight)까지 캡처되던 문제 방지
            } as const;
            // 첫 캡처는 클론에 스타일/폰트 미적용으로 깨지므로 1회 버리는 워밍업 후 실제 캡처.
            if (!warmed.current) {
                await html2canvas(node, opts).catch(() => {});
                warmed.current = true;
            }
            const captured = await html2canvas(node, opts);
            // 출력 450×900 고정. scale 3(1350×2700)로 떠서 여기로 줄여 계단현상 없이 깔끔하게(안티에일리어싱). 비율 동일이라 여백·크롭 없음.
            const canvas = document.createElement("canvas");
            canvas.width = captured.width;
            canvas.height = captured.height;
            const ctx = canvas.getContext("2d")!;
            ctx.fillStyle = BG;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const ratio = Math.min(canvas.width / captured.width, canvas.height / captured.height);
            const w = captured.width * ratio;
            const h = captured.height * ratio;
            ctx.drawImage(captured, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
            const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        } finally {
            setLoading(false);
        }
    };

    return {download, loading};
};
