import {test, expect} from "playwright/test";
import {
    PERSONA_KEYS,
    resolvePersonaKey,
    experienceOptionsKey,
} from "../../src/pages/experience/lib/persona-options";
import ko from "../../public/lang/kor.json" with {type: "json"};

// 앱의 t/tRaw와 동일한 dot-path 조회 (kor.json 실제 값 기준)
const at = (key: string): unknown => key.split(".").reduce<any>((o, k) => (o == null ? o : o[k]), ko);
const koTitleOf = (key: string) => (at(key) as string) ?? key;
const hasCopy = (key: string) => Array.isArray(at(key)) && (at(key) as unknown[]).length > 0;

const ZONE_SLUGS = ["entertainment", "living", "harmony", "elegance"] as const;
type Option = {title: string; desc: string; result: string[]};

// 카피덱 persona.<key>.title 스텁 (실제 kor.json 값)
const TITLES: Record<string, string> = {
    "persona.optimizer.title": "THE INDEPENDENT\nURBAN OPTIMIZER",
    "persona.coordinator.title": "THE CONNECTED\nFAMILY COORDINATOR",
    "persona.homemaker.title": "THE SUSTAINABLE\nHOMEMAKER",
    "persona.worker.title": "THE FLEXIBLE\nHYBRID WORKER",
};
const titleOf = (key: string) => TITLES[key] ?? key;

test.describe("resolvePersonaKey", () => {
    test("title이 일치하는 persona key를 반환한다", () => {
        expect(resolvePersonaKey("THE CONNECTED\nFAMILY COORDINATOR", titleOf)).toBe("coordinator");
        expect(resolvePersonaKey("THE FLEXIBLE\nHYBRID WORKER", titleOf)).toBe("worker");
        expect(resolvePersonaKey("THE INDEPENDENT\nURBAN OPTIMIZER", titleOf)).toBe("optimizer");
    });

    test("일치하는 title이 없거나 빈 문자열이면 undefined", () => {
        expect(resolvePersonaKey("UNKNOWN PERSONA", titleOf)).toBeUndefined();
        expect(resolvePersonaKey("", titleOf)).toBeUndefined();
    });

    test("PERSONA_KEYS는 4개 페르소나", () => {
        expect([...PERSONA_KEYS]).toEqual(["optimizer", "coordinator", "homemaker", "worker"]);
    });
});

test.describe("experienceOptionsKey", () => {
    const fallback = "zone.entertainment.options";

    test("persona×zone 옵션 카피가 있으면 persona.<key>.zone.<zone>.options 사용", () => {
        const hasCopy = (k: string) => k === "persona.coordinator.zone.entertainment.options";
        expect(experienceOptionsKey("coordinator", "entertainment", hasCopy, fallback))
            .toBe("persona.coordinator.zone.entertainment.options");
    });

    test("persona×zone 옵션 카피가 없으면 zone fallback", () => {
        expect(experienceOptionsKey("coordinator", "entertainment", () => false, fallback))
            .toBe(fallback);
    });

    test("personaKey가 빈 문자열(미로드)이면 카피 유무와 무관하게 fallback", () => {
        expect(experienceOptionsKey("", "living", () => true, "zone.living.options"))
            .toBe("zone.living.options");
    });
});

// 페르소나 선택 → 대시보드 페르소나 → 공간별 옵션 → 옵션 결과 (kor.json 실제 바인딩)
test.describe("페르소나 선택 → 옵션 → 결과 플로우", () => {
    for (const key of PERSONA_KEYS) {
        const title = koTitleOf(`persona.${key}.title`);

        test(`[${key}] 선택한 페르소나가 대시보드 title로 역해석된다`, () => {
            // 대시보드가 현황에서 받은 persona title → 카피덱 key로 되돌림
            expect(resolvePersonaKey(title, koTitleOf)).toBe(key);
        });

        for (const zone of ZONE_SLUGS) {
            test(`[${key}/${zone}] 공간 선택 시 페르소나 옵션 키가 잡히고 옵션·결과가 바인딩된다`, () => {
                // 1) 공간 선택 → persona×zone 옵션 키 결정
                const optionsKey = experienceOptionsKey(key, zone, hasCopy, `zone.${zone}.options`);
                expect(optionsKey).toBe(`persona.${key}.zone.${zone}.options`);

                // 2) 옵션 리스트 존재 (fallback 아님 = 페르소나별 옵션이 실제로 있음)
                const options = at(optionsKey) as Option[];
                expect(Array.isArray(options)).toBe(true);
                expect(options.length).toBeGreaterThan(0);

                // 3) 각 옵션 = 상황 title/desc + 결과(result) 보유
                for (const opt of options) {
                    expect(typeof opt.title).toBe("string");
                    expect(opt.title.length).toBeGreaterThan(0);
                    expect(Array.isArray(opt.result)).toBe(true);
                    expect(opt.result.length).toBeGreaterThan(0);
                    expect(opt.result.every((line) => typeof line === "string" && line.length > 0)).toBe(true);
                }
            });
        }
    }
});
