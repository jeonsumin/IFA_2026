import type {FullPageOptions} from "../types/types";

type Props = {
    options: FullPageOptions;
    close: () => void;
};

export const FullPage = ({options, close}: Props) => {
    const {title, content} = options;

    return (
        <div className="fixed inset-0 z-[100] flex justify-center bg-black/50">
            <div
                role="dialog"
                aria-modal="true"
                className="relative flex h-full w-full max-w-[var(--maxWidth)] flex-col bg-white"
            >
                <header className="relative flex h-[var(--headerHeight)] shrink-0 items-center justify-center border-b border-lg-gray-5">
                    {title && <h2 className="text-lg font-bold">{title}</h2>}
                    <button
                        type="button"
                        onClick={close}
                        aria-label="close"
                        className="absolute right-[16px] flex h-8 w-8 items-center justify-center"
                    >
                        ✕
                    </button>
                </header>
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    {content}
                </div>
            </div>
        </div>
    );
};
