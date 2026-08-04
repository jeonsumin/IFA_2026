export interface PersonaOption {
    id: number;
    content: string;
}

export interface Persona {
    id: string;
    img: string;
    desc: string[];
    title: string[];
    /** 페르소나 선택 이유 옵션(바텀시트에 노출) */
    item: PersonaOption[];
}

export const PERSONAS: Persona[] = [
    {
        id: "0",
        img: "/images/persona/persona-1.png",
        desc: ["혼자 살며 집을 효율적으로", "관리하고 싶은 도시생활자"],
        title: ["THE INDEPENDENT", "URBAN OPTIMIZER"],
        item: [
            {id: 0, content: '내가 꿈꾸는 라이프스타일이라서'},
            {id: 1, content: '지금의 내 일상과 가장 비슷해서'},
            {id: 2, content: '평소 관심 있던 라이프스타일 이라서'},
            {id: 3, content: '가장 흥미롭게 느껴져서'},
        ]
    },
    {
        id: "1",
        img: "/images/persona/persona-2.png",
        desc: ["가족의 식사와 집안일을", "조율하는 생활관리자"],
        title: ["THE CONNECTED", "FAMILY COORDINATOR"],
        item: [
            {id: 0, content: '내가 꿈꾸는 라이프스타일이라서'},
            {id: 1, content: '지금의 내 일상과 가장 비슷해서'},
            {id: 2, content: '평소 관심 있던 라이프스타일 이라서'},
            {id: 3, content: '가장 흥미롭게 느껴져서'},
        ]
    },
    {
        id: "2",
        img: "/images/persona/persona-3.png",
        desc: ["에너지 효율을 중요시하는", "지속가능 생활 실천가"],
        title: ["THE SUSTAINABLE ", "HOMEMAKER"],
        item: [
            {id: 0, content: '내가 꿈꾸는 라이프스타일이라서'},
            {id: 1, content: '지금의 내 일상과 가장 비슷해서'},
            {id: 2, content: '평소 관심 있던 라이프스타일 이라서'},
            {id: 3, content: '가장 흥미롭게 느껴져서'},
        ]
    },
    {
        id: "3",
        img: "/images/persona/persona-4.png",
        desc: ["시간은 FIT하게 공간은 MAX로", "활용하는 하이브리드 워커"],
        title: ["THE FLEXIBLE", "HYBRID WORKER"],
        item: [
            {id: 0, content: '내가 꿈꾸는 라이프스타일이라서'},
            {id: 1, content: '지금의 내 일상과 가장 비슷해서'},
            {id: 2, content: '평소 관심 있던 라이프스타일 이라서'},
            {id: 3, content: '가장 흥미롭게 느껴져서'},
        ]
    },
];
