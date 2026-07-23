import {ReactNode} from "react";
import {Outlet} from "react-router-dom";
import {useLayoutStore} from "../model/use-layout-store";

type Props = {
    headerSlot: ReactNode;
    navigationSlot?: ReactNode;
};

export const Mobile = (props: Props) => {
    const {headerSlot, navigationSlot} = props;
    const layout = useLayoutStore();

    return (
        <div className="mx-auto flex flex-col w-full max-w-[var(--maxWidth)] h-[100dvh] bg-lg-gray-6 scrollbar-hide">
            {layout.hasHeader && headerSlot && (
                <div className="shrink-0 h-[var(--headerHeight)]">{headerSlot}</div>
            )}
            <main className="flex-1 overflow-y-auto scrollbar relative">
                <Outlet/>
            </main>
            {layout.hasFooter && navigationSlot && (
                <div className="shrink-0 h-[var(--footerHeight)]">{navigationSlot}</div>
            )}
        </div>
    );
};
