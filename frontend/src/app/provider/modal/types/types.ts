import type {ReactNode} from "react";

export type AlertOptions = {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
};

export type ModalContextValue = {
    openAlert: (options: AlertOptions) => void;
    openFullPage: (content: ReactNode) => void;
    close: () => void;
};
