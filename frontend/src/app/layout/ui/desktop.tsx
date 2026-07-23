import {Outlet} from "react-router-dom";
import {ReactNode} from "react";
import {useLayoutStore} from "../model/use-layout-store";

type Props = {
    headerSlot?: ReactNode;
    footerSlot?: ReactNode;
}

export const Desktop = (props: Props) => {
    const {headerSlot, footerSlot} = props;
    const layout = useLayoutStore();

    return (
        <div className="flex flex-col w-full h-[100dvh] scrollbar">
            {/* ponytail: header/footer are fixed chrome; heights via --headerHeight/--footerHeight tokens (tunable) */}
            {layout.hasHeader && headerSlot && (
                <div className="shrink-0 h-[var(--headerHeight)]">{headerSlot}</div>
            )}
            <main className="flex-1 overflow-y-auto scrollbar">
                <div className="mx-auto w-full max-w-[var(--pcContentWidth)]">
                    <Outlet/>
                </div>
            </main>
            {layout.hasFooter && footerSlot && (
                <div className="shrink-0 h-[var(--footerHeight)]">{footerSlot}</div>
            )}
        </div>
    );
};
