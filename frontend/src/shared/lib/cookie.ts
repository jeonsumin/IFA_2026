// document.cookie 기반 원시 쿠키 헬퍼
export const getCookie = (name: string): string | null => {
    const escaped = name.replace(/([.*+?^${}()|[\]\\])/g, "\\$1");
    const match = document.cookie.match(new RegExp("(?:^|; )" + escaped + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : null;
};

export const setCookie = (
    name: string,
    value: string,
    options: {expires?: string; maxAge?: number} = {}
): void => {
    let cookie = `${name}=${encodeURIComponent(value)}; path=/`;
    if (options.expires) cookie += `; expires=${options.expires}`;
    if (options.maxAge !== undefined) cookie += `; max-age=${options.maxAge}`;
    document.cookie = cookie;
};

export const deleteCookie = (name: string): void => {
    document.cookie = `${name}=; path=/; max-age=0`;
};
