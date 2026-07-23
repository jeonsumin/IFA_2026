import type {ReactNode} from "react";

export type AlertOptions = {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
};

export type FullPageOptions = {
    title?: string;
    content: ReactNode;
};

export type ModalContextValue = {
    openAlert: (options: AlertOptions) => void;
    openFullPage: (options: FullPageOptions) => void;
    close: () => void;
};
