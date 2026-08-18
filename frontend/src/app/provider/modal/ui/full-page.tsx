import type {FullPageScreen} from "../types/types";

type Props = {
    stack: FullPageScreen[];
    progress: boolean;
    steps?: number;
    pop: () => void;
    close: () => void;
};

export const FullPage = ({stack, progress, steps, pop, close}: Props) => {
    const depth = stack.length;
    const top = stack[depth - 1];
    const canGoBack = depth > 1;

    // 진행률 = 현재 단계 / 전체 단계. steps 미지정 시 스택 길이로 대체(항상 100%)
    const total = steps ?? depth;
    const percent = Math.min(100, Math.round((depth / total) * 100));

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
                    {!top.title && <img src="/images/logo.svg" alt={"logo"}/>}
                    {top.title && <h2 className="text-lg font-bold text-center whitespace-pre-line">{top.title}</h2>}
                    <button
                        type="button"
                        onClick={close}
                        aria-label="close"
                        className="absolute right-[16px] flex h-8 w-8 items-center justify-center"
                    >
                        ✕
                    </button>
                </header>
                {progress && (
                    <div className="h-[3px] w-full shrink-0 bg-lg-gray-5">
                        <div
                            role="progressbar"
                            aria-valuenow={percent}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            className="h-full bg-lg-ai-gradient transition-[width] duration-300 ease-out"
                            style={{width: `${percent}%`}}
                        />
                    </div>
                )}
                <div
                    key={depth}
                    className="flex-1 overflow-y-auto scrollbar-hide bg-white"
                >
                    {top.content}
                </div>
            </div>
        </div>
    );
};
