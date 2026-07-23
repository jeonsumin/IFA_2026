import {createContext, useContext, useState} from "react";

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

type ContextType = {
    deviceType: DeviceType;
    isMobile: boolean;
};

export const DeviceContext = createContext<ContextType | undefined>(undefined);

// Pure helper: resolve device type from UA string and touch point count.
// Kept pure (no navigator access) for testability.
export const resolveDeviceType = (ua: string, maxTouchPoints: number): DeviceType => {


    // iPadOS 13+ masquerades as "Macintosh"; distinguish by touch points.
    const isIPadOS = /Macintosh/.test(ua) && maxTouchPoints > 1;

    // tablet first: explicit tablet UAs, Android without "Mobile", or iPadOS.
    if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua)) || isIPadOS) {
        return 'tablet';
    }

    // then mobile.
    if (/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
        return 'mobile';
    }

    return 'desktop';
};

const getDeviceType = (): DeviceType => {
    if (import.meta.env.DEV) return 'mobile';
    if (typeof navigator === 'undefined') return 'desktop';


    return resolveDeviceType(navigator.userAgent, navigator.maxTouchPoints);
};

export const DeviceProvider = ({children}: { children: React.ReactNode }) => {
    // UA does not change at runtime, compute once on mount.
    const [deviceType] = useState<DeviceType>(getDeviceType);

    return (
        <DeviceContext.Provider value={{deviceType, isMobile: deviceType === 'mobile'}}>
            {children}
        </DeviceContext.Provider>
    );
};

export const useDevice = (): ContextType => {
    const ctx = useContext(DeviceContext);
    if (ctx === undefined) {
        throw new Error('useDevice must be used within a DeviceProvider');
    }
    return ctx;
};
