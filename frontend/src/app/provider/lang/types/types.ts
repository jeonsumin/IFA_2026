// 지원 로케일. 카피덱 파일명과 1:1 (public/lang/<locale>.json). 언어 추가 시 여기에 확장.
export type Locale = 'kor';

export type Vars = Record<string, string | number>;

// 점 표기 키 → 문자열. 예: t('report.zone.sound'), t('welcome.greeting', {name})
export type TFn = (key: string, vars?: Vars) => string;

export type LangContextValue = {
    t: TFn;
    locale: Locale;
    setLocale: (locale: Locale) => void;
};
