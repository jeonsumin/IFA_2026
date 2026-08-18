import type {ZoneSlug} from "entities/experience";

// 카피덱 zone.<slug>.options 항목 형태
export type ZoneOption = {
    title: string;
    desc: string;
};

export type Zone = {
    slug: ZoneSlug;     // 백엔드 ZONE 값 (현황 매칭 키)
    img: string;
    title: string;      // 카피덱 키 zone.<slug>.title
    descKey: string;    // 카피덱 키 zone.<slug>.desc
    optionsKey: string; // 카피덱 키 zone.<slug>.options → ZoneOption[] (tRaw)
    resultKey: string;  // 카피덱 키 zone.<slug>.result → string[] (tRaw)
};

export const ZONES: Zone[] = [
    {
        slug: "entertainment",
        img: "/images/experience/zone-entertainment.png",
        title: "zone.entertainment.title",
        descKey: "zone.entertainment.desc",
        optionsKey: "zone.entertainment.options",
        resultKey: "zone.entertainment.result",
    },
    {
        slug: "living",
        img: "/images/experience/zone-living.png",
        title: "zone.living.title",
        descKey: "zone.living.desc",
        optionsKey: "zone.living.options",
        resultKey: "zone.living.result",
    },
    {
        slug: "harmony",
        img: "/images/experience/zone-harmony.png",
        title: "zone.harmony.title",
        descKey: "zone.harmony.desc",
        optionsKey: "zone.harmony.options",
        resultKey: "zone.harmony.result",
    },
    {
        slug: "elegance",
        img: "/images/experience/zone-elegance.png",
        title: "zone.elegance.title",
        descKey: "zone.elegance.desc",
        optionsKey: "zone.elegance.options",
        resultKey: "zone.elegance.result",
    },
];
