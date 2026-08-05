// 카피덱 zone.<slug>.options 항목 형태
export type ZoneOption = {
    title: string;
    desc: string;
};

export type Zone = {
    img: string;
    title: string;      // 카피덱 키 zone.<slug>.title
    descKey: string;    // 카피덱 키 zone.<slug>.desc
    optionsKey: string; // 카피덱 키 zone.<slug>.options → ZoneOption[] (tRaw)
    resultKey: string;  // 카피덱 키 zone.<slug>.result → string[] (tRaw)
    clear?: boolean;
};

export const ZONES: Zone[] = [
    {
        img: "/images/experience/zone-entertainment.jpg",
        title: "zone.entertainment.title",
        descKey: "zone.entertainment.desc",
        optionsKey: "zone.entertainment.options",
        resultKey: "zone.entertainment.result",
        clear: false,
    },
    {
        img: "/images/experience/zone-living.jpg",
        title: "zone.living.title",
        descKey: "zone.living.desc",
        optionsKey: "zone.living.options",
        resultKey: "zone.living.result",
        clear: false,
    },
    {
        img: "/images/experience/zone-harmony.png",
        title: "zone.harmony.title",
        descKey: "zone.harmony.desc",
        optionsKey: "zone.harmony.options",
        resultKey: "zone.harmony.result",
        clear: false,
    },
    {
        img: "/images/experience/zone-elegance.png",
        title: "zone.elegance.title",
        descKey: "zone.elegance.desc",
        optionsKey: "zone.elegance.options",
        resultKey: "zone.elegance.result",
        clear: false,
    },
];
