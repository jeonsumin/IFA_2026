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

export type FullPageOptions = {
    progress?: boolean;   // 진행률 바 노출 여부 (기본 false)
    steps?: number;       // 전체 단계 수(진행률 분모). 미지정 시 스택 길이로 대체
};

export type ModalContextValue = {
    openAlert: (options: AlertOptions) => void;
    openFullPage: (screen: FullPageScreen, options?: FullPageOptions) => void;   // 스택 초기화 + 첫 화면
    pushFullPage: (screen: FullPageScreen) => void;    // 다음 화면 진입
    popFullPage: () => void;                           // 이전 화면(마지막이면 닫힘)
    close: () => void;
};
