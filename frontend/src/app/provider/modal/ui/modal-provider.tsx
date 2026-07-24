import {createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode} from "react";
import type {AlertOptions, FullPageScreen, ModalContextValue} from "../types/types";
import {Alert} from "./alert";
import {FullPage} from "./full-page";

// ponytail: single active modal. fullPage는 화면 스택으로 관리(push/pop).
type ModalState =
    | {type: 'alert'; options: AlertOptions}
    | {type: 'fullPage'; stack: FullPageScreen[]}
    | null;

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const ModalProvider = ({children}: {children: ReactNode}) => {
    const [modal, setModal] = useState<ModalState>(null);

    const close = useCallback(() => setModal(null), []);
    const openAlert = useCallback((options: AlertOptions) => setModal({type: 'alert', options}), []);
    const openFullPage = useCallback((screen: FullPageScreen) => setModal({type: 'fullPage', stack: [screen]}), []);
    const pushFullPage = useCallback((screen: FullPageScreen) => {
        setModal((m) => (m?.type === 'fullPage' ? {type: 'fullPage', stack: [...m.stack, screen]} : m));
    }, []);
    const popFullPage = useCallback(() => {
        setModal((m) => {
            if (m?.type !== 'fullPage') return m;
            const next = m.stack.slice(0, -1);
            return next.length ? {type: 'fullPage', stack: next} : null;
        });
    }, []);

    // 모달 열림 동안 배경 스크롤 잠금
    useEffect(() => {
        if (!modal) return;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, [modal]);

    const value = useMemo<ModalContextValue>(
        () => ({openAlert, openFullPage, pushFullPage, popFullPage, close}),
        [openAlert, openFullPage, pushFullPage, popFullPage, close]
    );

    return (
        <ModalContext.Provider value={value}>
            {children}
            {modal?.type === 'alert' && <Alert options={modal.options} close={close}/>}
            {modal?.type === 'fullPage' && <FullPage stack={modal.stack} pop={popFullPage} close={close}/>}
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
