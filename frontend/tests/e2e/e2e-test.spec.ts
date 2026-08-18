import {devices, expect, test, type Page} from "playwright/test";
import ko from "../../public/lang/kor.json" with {type: "json"};

test.use({...devices["iPhone 13"]});

const appUrl = process.env.E2E_BASE_URL ?? "http://localhost:3000";
const zoneSlugs = ["entertainment", "living", "harmony", "elegance"] as const;

const namePattern = (text: string) => new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"));

const routeJson = (body: unknown) => ({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify(body),
});

type ZoneSlug = (typeof zoneSlugs)[number];

// 옵션/결과는 페르소나×존 카피덱(persona.<key>.zone.<slug>.options)에 있음. 테스트는 coordinator 선택.
const personaZone = ko.persona.coordinator.zone as Record<ZoneSlug, {options: {title: string; desc: string; result: string[]}[]}>;

const routeExperienceApis = async (page: Page, cleared: ZoneSlug[] = []) => {
    const clearedZones = new Set<ZoneSlug>(cleared);

    await page.route("**/api/check-in", (route) =>
        route.fulfill(routeJson({success: true, expiresAt: new Date(Date.now() + 86400000).toUTCString()})),
    );
    await page.route("**/api/experience", (route) => route.fulfill(routeJson({success: true})));
    await page.route("**/api/experience-qr", (route) => {
        const body = route.request().postDataJSON() as {zone?: ZoneSlug};
        if (body.zone && zoneSlugs.includes(body.zone)) clearedZones.add(body.zone);
        return route.fulfill(routeJson({success: true}));
    });
    await page.route("**/api/result-status", (route) =>
        route.fulfill(routeJson({
            success: true,
            // 실제 API 계약: situation/persona 항상 포함 (누락 시 report가 situation.map에서 크래시)
            data: {userReward: false, surveyReward: null, persona: "coordinator", situation: []},
        })),
    );
    await page.route("**/api/experience-status", (route) =>
        route.fulfill(
            routeJson({
                success: true,
                data: {
                    persona: "coordinator", // PERSONA_CODE (title 아님 — experience.tsx가 코드값을 그대로 사용)
                    zones: zoneSlugs.map((zone) => ({
                        zone,
                        situation: clearedZones.has(zone) ? personaZone[zone].options[0].title : "",
                        qrScanned: clearedZones.has(zone),
                    })),
                },
            }),
        ),
    );
};

const injectQrScan = async (page: Page, zone: ZoneSlug) => {
    await page.evaluate((zoneSlug) => {
        window.setTimeout(() => {
            window.dispatchEvent(
                new CustomEvent("e2e:qr-scan", {
                    detail: `${window.location.origin}/ifa?qr=${zoneSlug}`,
                }),
            );
        }, 1000);
    }, zone);
};

const startFromCheckIn = async (page: Page) => {
    await page.goto(`${appUrl}/check-in`);
    await page.getByLabel(ko.checkIn.nameAria).fill("테스터");
    await page.getByLabel(ko.checkIn.emailAria).fill("tester@example.com");

    await page.getByRole("combobox").nth(0).click();
    await page.getByRole("option", {name: ko.gender.female}).click();
    await page.getByRole("combobox").nth(1).click();
    await page.getByRole("option", {name: ko.age["30"]}).click();
    await page.getByText(ko.checkIn.agreeRequired).click();
    await expect(page.getByLabel(ko.checkIn.agreeAria)).toBeChecked();
    await page.getByRole("button", {name: "close"}).click();

    await page.getByRole("button", {name: ko.common.next}).click();
    await expect(page).toHaveURL(/\/welcome$/);
    await page.getByRole("button", {name: ko.common.start}).click();
    await expect(page).toHaveURL(/\/persona$/);
};

test.describe("공간체험 E2E", () => {
    test("페르소나 선택 후 공간체험 상황 선택 결과에서 QR 스캔으로 이동한다", async ({page}) => {
        await routeExperienceApis(page);

        await test.step("welcome 시작하기 이후 persona 화면에 진입한다", async () => {
            await startFromCheckIn(page);
            await expect(page.getByText(ko.persona.prompt)).toBeVisible();
        });

        await test.step("persona 카드 선택 후 선택 이유를 확인한다", async () => {
            await page.getByRole("button", {name: namePattern(ko.persona.coordinator.title)}).click();
            await page.getByRole("button", {name: ko.common.next}).click();
            await expect(page.getByText(ko.persona.reasonQuestion)).toBeVisible();

            await page.getByRole("button", {name: ko.persona.reasons["0"]}).click();
            await page.getByRole("button", {name: ko.common.confirm}).click();
            await expect(page).toHaveURL(/\/dashboard$/);
        });

        await test.step("dashboard에서 공간 선택 그리드를 확인하고 존 카드를 연다", async () => {
            await expect(page.getByText(ko.common.experienceSelectSpace)).toBeVisible();
            await expect(page.getByText(ko.zone.entertainment.title, {exact: true})).toBeVisible();
            await expect(page.getByText(ko.zone.living.title, {exact: true})).toBeVisible();
            await expect(page.getByText(ko.zone.harmony.title, {exact: true})).toBeVisible();
            await expect(page.getByText(ko.zone.elegance.title, {exact: true})).toBeVisible();

            await page.getByText(ko.zone.entertainment.title, {exact: true}).click();
            await expect(page.getByText(ko.situation.question)).toBeVisible();
        });

        await test.step("Situation 팝업에서 옵션 선택 후 결과 화면을 확인한다", async () => {
            const option = personaZone.entertainment.options[0];

            await page.getByRole("button", {name: namePattern(option.title)}).click();
            await page.getByRole("button", {name: ko.common.next}).click();

            await expect(page.getByText(option.title, {exact: true})).toBeVisible();
            await expect(page.getByText(option.result[0])).toBeVisible();
        });

        await test.step("QR 스캔 값을 주입해 완료 후 dashboard로 돌아온다", async () => {
            await page.getByRole("button", {name: ko.situation.qrScan}).click();
            await expect(page).toHaveURL(/\/qr$/);
            await injectQrScan(page, "entertainment");
            await expect(page).toHaveURL(/\/dashboard$/);
            await expect(page.getByText("CLEAR")).toBeVisible();
        });
    });

    test("4개 존이 모두 완료 상태면 dashboard에서 report로 자동 이동한다", async ({page}) => {
        await routeExperienceApis(page, [...zoneSlugs]);

        await test.step("완료 현황 응답을 받은 dashboard가 report로 이동한다", async () => {
            await page.goto(`${appUrl}/dashboard`);
            await expect(page).toHaveURL(/\/report$/);
            await expect(page.getByText(ko.report.dailyRoutine)).toBeVisible();
        });
    });

    test("완료된 존은 dashboard 카드에 CLEAR 오버레이가 노출된다", async ({page}) => {
        await routeExperienceApis(page, ["entertainment"]);

        await test.step("완료된 공간 카드 위에 CLEAR 상태를 표시한다", async () => {
            await page.goto(`${appUrl}/dashboard`);
            await expect(page).toHaveURL(/\/dashboard$/);
            await expect(page.getByText(ko.zone.entertainment.title, {exact: true})).toBeVisible();
            await expect(page.getByText("CLEAR")).toBeVisible();
        });
    });

    test("선택한 존과 다른 존의 QR을 스캔하면 거부하고 QR 화면에 머문다", async ({page}) => {
        await routeExperienceApis(page);

        await test.step("entertainment 존의 상황 결과 → QR 화면까지 진입", async () => {
            await startFromCheckIn(page);
            await page.getByRole("button", {name: namePattern(ko.persona.coordinator.title)}).click();
            await page.getByRole("button", {name: ko.common.next}).click();
            await page.getByRole("button", {name: ko.persona.reasons["0"]}).click();
            await page.getByRole("button", {name: ko.common.confirm}).click();
            await expect(page).toHaveURL(/\/dashboard$/);

            await page.getByText(ko.zone.entertainment.title, {exact: true}).click();
            await page.getByRole("button", {name: namePattern(personaZone.entertainment.options[0].title)}).click();
            await page.getByRole("button", {name: ko.common.next}).click();
            await page.getByRole("button", {name: ko.situation.qrScan}).click();
            await expect(page).toHaveURL(/\/qr$/);
        });

        await test.step("living QR을 주입하면 wrongZone 알럿 + /qr 유지", async () => {
            await injectQrScan(page, "living"); // entertainment 존인데 living QR
            await expect(page.getByText(ko.qrScanner.wrongZone)).toBeVisible();
            await expect(page).toHaveURL(/\/qr$/);
        });
    });

    test("report 페이지에 persona에서 선택한 존별 옵션(SITUATION/DESC)이 바인딩된다", async ({page}) => {
        // 실제 저장 계약: SITUATION = 선택 옵션 title, SITUATION_DESC = 옵션 desc (persona×존 카피덱).
        // coordinator가 각 존의 첫 옵션을 고른 상황을 재현.
        const chosen = zoneSlugs.map((zone) => personaZone[zone].options[0]);
        const situation = zoneSlugs.map((zone, i) => ({
            ZONE: zone,
            SITUATION: chosen[i].title,
            SITUATION_DESC: chosen[i].desc,
        }));
        await page.route("**/api/result-status", (route) =>
            route.fulfill(routeJson({
                success: true,
                data: {userReward: false, surveyReward: null, persona: "coordinator", situation},
            })),
        );

        await page.goto(`${appUrl}/report`);
        await expect(page).toHaveURL(/\/report$/);

        // 화면 밖 ReportCard가 같은 텍스트를 중복 렌더(DOM 뒤) → .first()로 리포트 리스트를 단언.
        // title은 desc에 부분포함될 수 있어 exact, desc는 멀티라인이라 substring 매칭.
        for (const opt of chosen) {
            await expect(page.getByText(opt.title, {exact: true}).first()).toBeVisible();
            await expect(page.getByText(opt.desc).first()).toBeVisible();
        }
        await expect(page.getByText(ko.zone.entertainment.title, {exact: true}).first()).toBeVisible();
    });

    test("리워드 완료 상태(userReward·surveyReward=2)면 두 버튼이 비활성으로 렌더된다", async ({page}) => {
        await page.route("**/api/result-status", (route) =>
            route.fulfill(routeJson({
                success: true,
                data: {userReward: true, surveyReward: 2, persona: "coordinator", situation: []},
            })),
        );

        await page.goto(`${appUrl}/report`);
        await expect(page).toHaveURL(/\/report$/);
        await expect(page.getByRole("button", {name: ko.report.extraReward})).toBeDisabled();
        // "리워드"는 "추가 리워드"에도 부분일치 → exact로 Gift 버튼만 지정
        await expect(page.getByRole("button", {name: ko.report.reward, exact: true})).toBeDisabled();
    });

});
