import {useState} from "react";
import html2canvas from "html2canvas-pro";

// 화면 밖 ReportCard 노드를 PNG로 캡처해 다운로드. html2canvas-pro는 Tailwind v4 oklch 지원.
export const useDownloadReport = () => {
    const [loading, setLoading] = useState(false);

    const download = async (node: HTMLElement | null, filename = "lg-ifa-report.png") => {
        if (!node || loading) return;
        setLoading(true);
        try {
            await document.fonts.ready; // 폰트 로드 후 캡처(누락 방지)
            const canvas = await html2canvas(node, {
                scale: 2,               // 레티나 선명도
                backgroundColor: "#f0ece4",
                useCORS: true,
            });
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
