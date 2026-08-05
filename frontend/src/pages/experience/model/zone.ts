type Zone = {
    img: string;
    title: string;
    descKey: string; // 카피덱 키 (zone.*)
    clear?: boolean;
};

export const ZONES: Zone[] = [
    {
        img: "/images/experience/zone-entertainment.jpg",
        title: "zone.entertainment.title",
        descKey: "zone.entertainment.desc",
        clear: false,
    },
    {
        img: "/images/experience/zone-living.jpg",
        title: "zone.living.title",
        descKey: "zone.living.desc",
        clear: false,
    },
    {
        img: "/images/experience/zone-harmony.png",
        title: "zone.harmony.title",
        descKey: "zone.harmony.desc",
        clear: false,
    },
    {
        img: "/images/experience/zone-elegance.png",
        title: "zone.elegance.title",
        descKey: "zone.elegance.desc",
        clear: false,
    },
];
