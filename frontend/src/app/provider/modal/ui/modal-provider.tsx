import {createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode} from "react";
import type {AlertOptions, ModalContextValue} from "../types/types";
import {Alert} from "./alert";
import {FullPage} from "./full-page";

// ponytail: single active modal (한 번에 하나). 스택이 필요해지면 배열로 확장.
type ModalState =
    | {type: 'alert'; options: AlertOptions}
    | {type: 'fullPage'; content: ReactNode}
    | null;

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const ModalProvider = ({children}: {children: ReactNode}) => {
    const [modal, setModal] = useState<ModalState>(null);

    const close = useCallback(() => setModal(null), []);
    const openAlert = useCallback((options: AlertOptions) => setModal({type: 'alert', options}), []);
    const openFullPage = useCallback((content: ReactNode) => setModal({type: 'fullPage', content}), []);

    // 모달 열림 동안 배경 스크롤 잠금
    useEffect(() => {
        if (!modal) return;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, [modal]);

    const value = useMemo<ModalContextValue>(
        () => ({openAlert, openFullPage, close}),
        [openAlert, openFullPage, close]
    );

    return (
        <ModalContext.Provider value={value}>
            {children}
            {modal?.type === 'alert' && <Alert options={modal.options} close={close}/>}
            {modal?.type === 'fullPage' && <FullPage content={modal.content} close={close}/>}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextValue => {
    const ctx = useContext(ModalContext);
    if (ctx === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return ctx;
};
