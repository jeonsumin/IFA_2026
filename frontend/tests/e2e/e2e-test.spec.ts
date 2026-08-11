import { test, expect, devices } from '@playwright/test';

test.use({
    ...devices['iPhone 13'],
});

test('check-in 테스트', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByText('Innovation in tune with you')).toBeVisible();
    await expect(page.getByRole('img', { name: 'Life\'s Good.' })).toBeVisible();
    await expect(page.getByText('가전, 공간, 라이프스타일')).toBeVisible();
    await expect(page.getByText('흩어진 일상을 LG AI')).toBeVisible();
    await expect(page.getByText('지금, 당신을 위한 오케스트라가 시작됩니다')).toBeVisible();
    await expect(page.getByRole('button', { name: '시작하기' })).toBeVisible();
    await page.getByRole('button', { name: '시작하기' }).click();
    await expect(page.getByRole('heading', { name: '당신에 대해 알려주세요' })).toBeVisible();
    await expect(page.getByText('이름 (최대 8자 이내)')).toBeVisible();
    await expect(page.getByRole('textbox', { name: '이름' })).toBeVisible();
    await expect(page.getByText('이메일')).toBeVisible();
    await expect(page.getByRole('textbox', { name: '이메일' })).toBeVisible();
    await expect(page.getByText('성별')).toBeVisible();
    await expect(page.getByRole('textbox', { name: '이메일' })).toBeVisible();
    await expect(page.getByText('연령')).toBeVisible();
    await expect(page.getByRole('combobox').nth(1)).toBeVisible();
    await page.getByRole('combobox').nth(1).click();
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`- combobox: 선택해주세요`);
    await page.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: '30대' }).click();
    await page.getByText('(필수) 개인정보 수집 및 이용 동의').click();
    await expect(page.locator('div').filter({ hasText: 'Bei Ihrer Teilnahme an den' }).nth(4)).toBeVisible();
    await expect(page.getByRole('dialog')).toMatchAriaSnapshot(`
    - paragraph: Bei Ihrer Teilnahme an den interaktiven Inhalten dieser Website werden die folgenden personenbezogenen Daten erhoben und verwendet. Diese Einverständniserklärung dient dem Schutz Ihrer Rechte als Nutzer. Wir erheben nur die minimal erforderlichen Informationen zur Bereitstellung des Services und geben diese nicht an Dritte weiter oder verwenden sie für Marketingzwecke.
    - heading "1. Erhobene Informationen" [level=3]
    - list:
      - listitem: Name, E-Mail-Adresse, Altersgruppe, Geschlecht, Wohnform und Umfrageantworten, die während der Erfahrung bereitgestellt werden.
    - heading "2. Zweck der Erhebung und Nutzung" [level=3]
    - list:
      - listitem: Bereitstellung der interaktiven Inhalte und Nutzeridentifikation.
      - listitem: Generierung personalisierter Ergebnisse basierend auf Ihren Umfrageantworten.
      - listitem: Interne statistische Analyse und zukünftige Inhaltsverbesserung.
    - heading "3. Erhebungsmethode" [level=3]
    - list:
      - listitem: Direkte Eingabe durch Sie auf dem Check-in-Bildschirm und während der gesamten Erfahrung.
      - listitem: "Automatisch über funktionale Cookies während der Servicenutzung erhobene Informationen. (Hinweis: Diese Informationen werden automatisch ohne separate Einwilligung erhoben. Bitte beachten Sie den unten stehenden Hinweis.)"
    - heading "4. Aufbewahrungs- und Nutzungsdauer" [level=3]
    - list:
      - listitem: Ihre Informationen werden 3 Monate ab dem Erhebungsdatum gespeichert und anschließend automatisch gelöscht.
    - heading "5. Hinweis zur automatisierten Verarbeitung" [level=3]
    - list:
      - listitem: Diese Inhalte generieren personalisierte Ergebnisse in Echtzeit durch ein automatisiertes Analysesystem basierend auf Ihren Eingaben und Umfrageantworten.
      - listitem: Dieser Prozess basiert auf Ihren individuellen Antworten und umfasst keine separate Profilerstellung oder Marketingzwecke.
    - heading "6. Hinweis zur Verwendung funktionaler Cookies" [level=3]
    - list:
      - listitem: /Wir verwenden funktionale Cookies, um den normalen Betrieb der Website zu gewährleisten und die Inhalte bereitzustellen \\(z[\\d,.]+[bkmBKM]+\\. für Seitennavigation, Klicks und Aufrechterhaltung Ihres Eingabestatus\\)\\./
      - listitem: Diese Cookies sind ein technisches Mittel zur Servicebereitstellung. Sie werden automatisch ohne separate Einwilligung erhoben und nicht extern übertragen oder für Marketingzwecke verwendet.
    - heading "7. Sicherheitsmaßnahmen" [level=3]
    - list:
      - listitem: Erhobene personenbezogene Daten werden durch angemessene technische und administrative Schutzmaßnahmen wie verschlüsselte Speicherung und Zugriffskontrolle geschützt, um unbefugten Zugriff, Verlust, Fälschung, Änderung und Beschädigung zu verhindern. Diese Informationen werden durch kontinuierliche Überwachung sicher verwaltet.
    - heading "8. Rechte des Nutzers" [level=3]
    - list:
      - listitem: Sie haben das Recht, diese Einwilligung zu verweigern. Wenn Sie jedoch nicht einwilligen, können Sie nicht an der Erfahrung teilnehmen.
      - listitem: Sie können den Zugang, die Berichtigung oder Löschung Ihrer erhobenen personenbezogenen Daten beantragen. Bitte wenden Sie sich für entsprechende Anfragen an den unten genannten Datenschutzbeauftragten.
    - heading "Datenschutzbeauftragter" [level=3]
    `);
    await page.getByRole('button', { name: 'close' }).click();
    await expect(page.getByRole('button', { name: '다음' })).toBeVisible();
    await page.getByRole('button', { name: '다음' }).click();
    await page.getByText('Welcome ! 님당신의 라이프스타일을 발견하고,').click();
    await expect(page.getByText('Welcome !')).toBeVisible();
    await expect(page.getByText('당신의 라이프스타일을 발견하고, LG AI')).toBeVisible();
    await expect(page.getByRole('button', { name: '시작하기' })).toBeVisible();
    await page.getByRole('button', { name: '시작하기' }).click();
});
