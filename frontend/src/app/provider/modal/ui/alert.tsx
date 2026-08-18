import type {AlertOptions} from "../types/types";

type Props = {
    options: AlertOptions;
    close: () => void;
};

export const Alert = ({options, close}: Props) => {
    const {title, message, confirmText = "확인", cancelText, onConfirm, onCancel} = options;

    const handleConfirm = () => { onConfirm?.(); close(); };
    const handleCancel = () => { onCancel?.(); close(); };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-6"
            onClick={handleCancel}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                className="w-full max-w-[var(--maxWidth)] rounded-[var(--radius)] bg-white p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {title && <h2 className="mb-2 text-lg font-bold">{title}</h2>}
                <p className="text-lg-gray-2 whitespace-pre-line">{message}</p>
                <div className="mt-6 flex gap-2">
                    {cancelText && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 rounded-[var(--radius-sm)] border border-lg-gray-4 py-3"
                        >
                            {cancelText}
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="flex-1 rounded-[var(--radius-sm)] bg-lg-gray-1 py-3 text-white"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};
