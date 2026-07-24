import type {ReactNode} from "react";

export type AlertOptions = {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
};

export type FullPageScreen = {
    title?: string;
    content: ReactNode;
};

export type ModalContextValue = {
    openAlert: (options: AlertOptions) => void;
    openFullPage: (screen: FullPageScreen) => void;   // 스택 초기화 + 첫 화면
    pushFullPage: (screen: FullPageScreen) => void;    // 다음 화면 진입
    popFullPage: () => void;                           // 이전 화면(마지막이면 닫힘)
    close: () => void;
};
