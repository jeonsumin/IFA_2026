type Zone = {
    img: string;
    title: string;
    desc: string[];
    clear?: boolean;
};

export const ZONES: Zone[] = [
    {
        img: "/images/experience/zone-entertainment.jpg",
        title: "Entertainment in Tune",
        desc: ["AI가 완성하는", "몰입형 엔터테인먼트", "경험을 만나보세요."],
        clear: true,
    },
    {
        img: "/images/experience/zone-living.jpg",
        title: "Living in Tune",
        desc: ["공간은 FIT하게,", "생활은 MAX하게. 더 스마트한", "AI 가전을 경험해 보세요."],
        clear: true,
    },
    {
        img: "/images/experience/zone-harmony.png",
        title: "Harmony in Tune",
        desc: ["집안의 모든 공간을 연결하는 LG AI", "Home을 경험해 보세요."],
        clear: true,
    },
    {
        img: "/images/experience/zone-elegance.png",
        title: "Elegance in Tune",
        desc: ["AI와 프리미엄 디자인이 완성하는", "럭셔리 라이프를 경험해 보세요."],
        clear: false,
    },
];
