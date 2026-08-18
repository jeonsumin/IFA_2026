import {defineConfig} from "playwright/test";

// e2e/unit 공통 설정. 디바이스(iPhone 13)는 각 스펙의 test.use에서 지정.
export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    reporter: [["list"], ["html", {open: "never"}]], // playwright-report/ (gitignore됨)
    use: {
        baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3000",
        screenshot: "only-on-failure",   // 실패 시 스크린샷
        video: "retain-on-failure",      // 실패 시 화면 녹화
        trace: "retain-on-failure",      // 실패 시 트레이스(스텝별 화면·DOM 스냅샷)
    },
});
