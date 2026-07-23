import type {ReactNode} from "react";

type Props = {
    content: ReactNode;
    close: () => void;
};

export const FullPage = ({content, close}: Props) => {
    return (
        <div className="fixed inset-0 z-[100] flex justify-center bg-black/50">
            <div
                role="dialog"
                aria-modal="true"
                className="relative flex h-full w-full max-w-[var(--maxWidth)] flex-col overflow-y-auto bg-white scrollbar-hide"
            >
                <button
                    type="button"
                    onClick={close}
                    aria-label="close"
                    className="absolute right-[16px] top-[16px] z-10 flex h-8 w-8 items-center justify-center"
                >
                    ✕
                </button>
                {content}
            </div>
        </div>
    );
};
