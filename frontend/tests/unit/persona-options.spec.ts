import {test, expect} from "playwright/test";
import {
    PERSONA_KEYS,
    resolvePersonaKey,
    experienceOptionsKey,
} from "../../src/pages/experience/lib/persona-options";

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

    test("persona×zone 옵션 카피가 있으면 persona.<key>.<zone>.options 사용", () => {
        const hasCopy = (k: string) => k === "persona.coordinator.entertainment.options";
        expect(experienceOptionsKey("coordinator", "entertainment", hasCopy, fallback))
            .toBe("persona.coordinator.entertainment.options");
    });

    test("persona×zone 옵션 카피가 없으면 zone fallback", () => {
        expect(experienceOptionsKey("coordinator", "entertainment", () => false, fallback))
            .toBe(fallback);
    });

    test("personaKey가 undefined면 카피 유무와 무관하게 fallback", () => {
        expect(experienceOptionsKey(undefined, "living", () => true, "zone.living.options"))
            .toBe("zone.living.options");
    });
});
