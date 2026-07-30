import {forwardRef, useEffect, useRef, useState, type PointerEvent, type ReactNode} from "react";
import {X} from "lucide-react";
import {cn} from "shared/lib/cn";

interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
}

// 이 값 초과로 아래로 드래그하면 닫힘
const CLOSE_THRESHOLD = 100;

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
    ({open, onClose, title, children, className}, ref) => {
        // render: 실제 DOM 마운트 여부 / shown: 열림 목표 위치(translateY 0) 여부
        const [render, setRender] = useState(open);
        const [shown, setShown] = useState(false);
        // 드래그 오프셋(px). 드래그 중이 아니면 null
        const [dragY, setDragY] = useState<number | null>(null);
        const startY = useRef(0);
        const dragging = dragY !== null;

        // open 전이: 열리면 마운트, 닫히면 목표 위치를 100%로
        useEffect(() => {
            if (open) {
                setRender(true);
            } else {
                setShown(false);
            }
        }, [open]);

        // 마운트 직후 다음 프레임에 진입 전이(100% → 0)
        useEffect(() => {
            if (!render || !open) return;
            const id = requestAnimationFrame(() => setShown(true));
            return () => cancelAnimationFrame(id);
        }, [render, open]);

        // 마운트되어 있는 동안(닫는 중 포함) 배경 스크롤 잠금
        useEffect(() => {
            if (!render) return;
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = ""; };
        }, [render]);

        if (!render) return null;

        const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
            startY.current = e.clientY;
            setDragY(0);
            e.currentTarget.setPointerCapture(e.pointerId);
        };

        const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
            if (dragY === null) return;
            // 아래 방향으로만 따라오게(음수 방지)
            setDragY(Math.max(0, e.clientY - startY.current));
        };

        const handlePointerUp = () => {
            if (dragY === null) return;
            if (dragY > CLOSE_THRESHOLD) {
                setShown(false);   // 현재 위치에서 바로 닫힘 전이 시작
                onClose();         // controlled 계약 유지
            }
            setDragY(null);        // dragging 해제 → transition 켜짐, 목표로 보간
        };

        const handleTransitionEnd = () => {
            if (!shown) setRender(false);
        };

        const y = dragging ? `${dragY}px` : shown ? "0" : "100%";

        return (
            <div
                className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50"
                onClick={onClose}
            >
                <div
                    ref={ref}
                    role="dialog"
                    aria-modal="true"
                    className={cn(
                        "w-full max-w-[var(--maxWidth)] rounded-t-[var(--radius)] bg-white",
                        "transition-transform duration-[250ms] ease-out",
                        dragging && "transition-none",
                        className
                    )}
                    style={{transform: `translateY(${y})`}}
                    onClick={(e) => e.stopPropagation()}
                    onTransitionEnd={handleTransitionEnd}
                >
                    <div
                        className="flex justify-center py-3 touch-none cursor-grab"
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                    >
                        <span className="h-1 w-10 rounded-full bg-lg-gray-5" />
                    </div>
                    {title && (
                        <header className="relative flex items-center justify-center px-6 pb-3">
                            <h2 className="text-lg font-bold">{title}</h2>
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="close"
                                className="absolute right-[16px] flex h-8 w-8 items-center justify-center"
                            >
                                <X className="h-5 w-5 text-lg-gray-3" />
                            </button>
                        </header>
                    )}
                    <div className="px-6 pb-6">{children}</div>
                </div>
            </div>
        );
    }
);

BottomSheet.displayName = "BottomSheet";
