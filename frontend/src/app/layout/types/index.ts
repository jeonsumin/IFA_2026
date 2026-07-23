export type LayoutState = {
    headerComponentName?: string;
    routeName?: string;
    hasFooter: boolean;
    hasHeader: boolean;
    referrer?: string;
    isAndroid: boolean;
    isApple: boolean;
    isApp: boolean;
    appNo: string;

    setMobileHeader: (payload?: MobileHeaderPayload) => void;
};

export type MobileHeaderPayload = {
    headerComponentName?: string;
    routeName?: string;
    hasFooter?: boolean;
    hasHeader?: boolean;
    referrer?: string;
};
