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
        <div className="w-full max-w-[var(--maxWidth)]">
            <div className="max-w-screen-sm mx-auto w-full scrollbar-hide bg-lg-gray-6">
                {layout.hasHeader && headerSlot}
                <div className="w-full scrollbar relative min-h-[calc(100dvh-50px)] bg-red">
                    <Outlet/>
                </div>
            </div>
            {layout.hasFooter && navigationSlot}
        </div>
    );
};
