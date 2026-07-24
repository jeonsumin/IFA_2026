import {useRef} from "react";
import type {FullPageScreen} from "../types/types";

type Props = {
    stack: FullPageScreen[];
    pop: () => void;
    close: () => void;
};

export const FullPage = ({stack, pop, close}: Props) => {
    const depth = stack.length;
    const top = stack[depth - 1];

    // 첫 페이지(초기 오픈)는 애니메이션 없음. 깊이가 변할 때만 push=forward / pop=back
    const prevDepth = useRef<number | null>(null);
    const prev = prevDepth.current;
    const slideClass =
        prev === null || depth === prev
            ? ''
            : depth > prev
                ? 'modal-slide-forward'
                : 'modal-slide-back';
    prevDepth.current = depth;

    const canGoBack = depth > 1;

    return (
        <div className="fixed inset-0 z-[100] flex justify-center bg-black/50">
            <div
                role="dialog"
                aria-modal="true"
                className="relative flex h-full w-full max-w-[var(--maxWidth)] flex-col overflow-hidden bg-white"
            >
                <header
                    className="relative flex h-[var(--headerHeight)] shrink-0 items-center justify-center border-b border-lg-gray-5">
                    {canGoBack && (
                        <button
                            type="button"
                            onClick={pop}
                            aria-label="back"
                            className="absolute left-[16px] flex h-8 w-8 items-center justify-center"
                        >
                            ←
                        </button>
                    )}
                    {top.title && <h2 className="text-lg font-bold">{top.title}</h2>}
                    <button
                        type="button"
                        onClick={close}
                        aria-label="close"
                        className="absolute right-[16px] flex h-8 w-8 items-center justify-center"
                    >
                        ✕
                    </button>
                </header>
                <div
                    key={depth}
                    className={`flex-1 overflow-y-auto scrollbar-hide bg-white ${slideClass}`}
                >
                    {top.content}
                </div>
            </div>
        </div>
    );
};
