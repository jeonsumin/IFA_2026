type Zone = {
    img: string;
    title: string;
    descKey: string; // 카피덱 키 (zone.*)
    clear?: boolean;
};

export const ZONES: Zone[] = [
    {
        img: "/images/experience/zone-entertainment.jpg",
        title: "Entertainment in Tune",
        descKey: "zone.entertainment",
        clear: true,
    },
    {
        img: "/images/experience/zone-living.jpg",
        title: "Living in Tune",
        descKey: "zone.living",
        clear: true,
    },
    {
        img: "/images/experience/zone-harmony.png",
        title: "Harmony in Tune",
        descKey: "zone.harmony",
        clear: true,
    },
    {
        img: "/images/experience/zone-elegance.png",
        title: "Elegance in Tune",
        descKey: "zone.elegance",
        clear: false,
    },
];
