import {create} from 'zustand';
import {LayoutState} from '../types';

export const useLayoutStore = create<LayoutState>((set) => ({
    component: 'mobile',
    headerComponentName: undefined,
    routeName: undefined,
    hasFooter: true,
    hasHeader: true,
    referrer: undefined,
    isAndroid: false,
    isApple: false,
    isApp: false,
    appNo: '',

    setMobileHeader: (payload = {}) =>
        set({
            headerComponentName: payload.headerComponentName,
            routeName: payload.routeName,
            hasFooter: payload.hasFooter ?? true,
            hasHeader: payload.hasHeader ?? true,
            referrer: payload.referrer,
        }),
}));
