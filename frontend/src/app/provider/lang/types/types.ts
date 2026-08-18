// 지원 로케일. 카피덱 파일명과 1:1 (public/lang/<locale>.json). 언어 추가 시 여기에 확장.
export type Locale = 'kor' | 'eng';

export type Vars = Record<string, string | number>;

// 점 표기 키 → 문자열. 예: t('report.zone.sound'), t('welcome.greeting', {name})
export type TFn = (key: string, vars?: Vars) => string;

// 문자열이 아닌 값(배열/객체)을 카피덱에서 그대로 꺼낼 때. 예: tRaw<Option[]>('zone.x.options')
export type TRawFn = <T = unknown>(key: string) => T | undefined;

export type LangContextValue = {
    t: TFn;
    tRaw: TRawFn;
    locale: Locale;
    setLocale: (locale: Locale) => void;
};
