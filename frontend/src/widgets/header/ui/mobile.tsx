import {useLayoutStore} from "app/layout/model/use-layout-store.ts";

export const MobileHeader = () => {
    const layout = useLayoutStore();
    return (
        <header
            className={`relative h-[var(--headerHeight)] w-full flex items-center justify-center bg-white z-50 ${layout.referrer ? "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]" : ""}`}
        >
            {layout.routeName ? (
                <div className="flex items-center gap-2 w-full">
                    <p className="w-full text-xl text-center font-bold">{layout.routeName}</p>
                    <button
                        type="button"
                        className="absolute right-[16px]"
                        onClick={() => window.history.back()}
                    >
                        <img src="/assets/images/close.svg" alt="close"/>
                    </button>
                </div>
            ) : (
                <img src="/images/logo.svg" alt={"logo"}/>
            )}
        </header>
    );
};
