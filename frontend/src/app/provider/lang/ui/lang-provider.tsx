import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    cloneElement,
    isValidElement,
    type ReactElement,
    type ReactNode,
} from "react";
import type {LangContextValue, Locale, TFn, Vars} from "../types/types";

const DEFAULT_LOCALE: Locale = 'kor';

// 점 표기 키를 중첩 카피덱에서 해석: 'report.zone.sound'
const resolve = (dict: unknown, key: string): unknown =>
    key.split('.').reduce<unknown>((acc, k) => (acc as Record<string, unknown> | undefined)?.[k], dict);

// {{name}} 치환. 미제공 변수는 원형 유지({{name}})해 누락을 눈에 띄게 둠
const interpolate = (text: string, vars?: Vars): string =>
    vars ? text.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? String(vars[k]) : `{{${k}}}`)) : text;

const LangContext = createContext<LangContextValue | undefined>(undefined);

export const LangProvider = ({children}: {children: ReactNode}) => {
    const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
    const [dict, setDict] = useState<Record<string, unknown> | null>(null);

    useEffect(() => {
        let alive = true;
        fetch(`/lang/${locale}.json`)
            .then((r) => r.json())
            .then((d) => { if (alive) setDict(d); });
        return () => { alive = false; };
    }, [locale]);

    const t = useCallback<TFn>((key, vars) => {
        const raw = resolve(dict, key);
        // 누락 키는 키 자체를 반환해 조용한 실패 대신 화면에 드러냄
        if (typeof raw !== 'string') return key;
        return interpolate(raw, vars);
    }, [dict]);

    // 전 화면이 카피덱에 의존 → 로드 전엔 렌더 보류
    if (!dict) return null;

    return (
        <LangContext.Provider value={{t, locale, setLocale}}>
            {children}
        </LangContext.Provider>
    );
};

export const useTranslate = (): LangContextValue => {
    const ctx = useContext(LangContext);
    if (ctx === undefined) throw new Error('useLang must be used within a LangProvider');
    return ctx;
};

// t만 필요할 때 쓰는 편의 훅
export const useT = (): TFn => useTranslate().t;

// ponytail: <n>..</n> 태그만 지원하는 최소 rich-text (i18n Trans의 축소판).
// 예) "report.poweredBy": "<1>CLOiD</1>가 함께 한" + components={[<span className="font-bold"/>]}
export const Trans = ({tKey, components, vars}: {
    tKey: string;
    components: ReactElement[]; // 인덱스 1부터 <1>, <2> ... 에 매핑
    vars?: Vars;
}) => {
    const t = useT();
    // split(캡처그룹) 결과: [before, idx, inner, after, idx, inner, ...]
    const parts = t(tKey, vars).split(/<(\d+)>(.*?)<\/\1>/g);
    const nodes: ReactNode[] = [];
    for (let i = 0; i < parts.length; i++) {
        if (i % 3 === 0) {
            if (parts[i]) nodes.push(parts[i]);
            continue;
        }
        const el = components[Number(parts[i]) - 1];
        const inner = parts[i + 1];
        nodes.push(isValidElement(el) ? cloneElement(el, {key: i}, inner) : inner);
        i++; // inner 소비
    }
    return <>{nodes}</>;
};
