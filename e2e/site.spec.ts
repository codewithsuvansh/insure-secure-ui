import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { catalog } from '../src/content/catalog';
import { guides } from '../src/content/guides';
import { investments } from '../src/content/investments';

const staticPaths = [
  '/', '/insurance/', '/nri-families/', '/business/', '/tools/', '/tools/coverage-check/', '/tools/term-cover/', '/tools/health-cover/',
  '/tools/sip-calculator/', '/tools/goal-planner/', '/investments/', '/tools/renewal-reminder/', '/claims/', '/guides/', '/about/', '/contact/', '/disclosures/', '/privacy/', '/terms/',
];
const allPaths = [...staticPaths, ...catalog.map((p) => `/insurance/${p.slug}/`), ...investments.map((i) => `/investments/${i.slug}/`), ...guides.map((g) => `/guides/${g.slug}/`)];
const templates = [...staticPaths, '/insurance/car-insurance/', '/investments/sip/', `/guides/${guides[0]!.slug}/`];

const WHATSAPP_NUMBER = '917986108922';

/** Records window.open instead of leaving the site. */
async function stubWindowOpen(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { opened: string[] }).opened = [];
    window.open = (url?: string | URL) => {
      (window as unknown as { opened: string[] }).opened.push(String(url));
      return null;
    };
  });
}

test.describe('links', () => {
  test('every page loads, and every internal link resolves', async ({ page, request }) => {
    test.setTimeout(240_000);
    const seen = new Map<string, number>();
    const check = async (path: string) => {
      if (!seen.has(path)) seen.set(path, (await request.get(path)).status());
    };
    for (const path of allPaths) {
      await check(path);
      const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), path).toBe(200);
      const hrefs = await page.$$eval('a[href^="/"]', (links) => links.map((l) => l.getAttribute('href')!.split('#')[0]!.split('?')[0]!));
      for (const href of new Set(hrefs)) await check(href);
    }
    const broken = [...seen].filter(([, status]) => status >= 400);
    expect(broken).toEqual([]);
  });

  test('every WhatsApp and phone link uses the client number', async ({ page }) => {
    test.setTimeout(240_000);
    for (const path of allPaths) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const hrefs = await page.$$eval('a[href*="wa.me"], a[href^="tel:"]', (links) => links.map((l) => l.getAttribute('href')!));
      expect(hrefs.length, path).toBeGreaterThan(0);
      for (const href of hrefs) {
        if (href.startsWith('tel:')) {
          expect(href, path).toBe('tel:+917986108922');
        } else {
          const url = new URL(href);
          expect(url.pathname, path).toBe(`/${WHATSAPP_NUMBER}`);
          expect(url.searchParams.get('text')?.length ?? 0, path).toBeGreaterThan(10);
        }
      }
    }
  });

  test('the floating WhatsApp link matches the product page', async ({ page }) => {
    await page.goto('/insurance/car-insurance/');
    const href = await page.getByRole('link', { name: 'WhatsApp us: chat with Insure Secure' }).getAttribute('href');
    expect(new URL(href!).searchParams.get('text')).toContain('Car Insurance');
  });

  test('unknown pages show the custom 404', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist/');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'This page isn’t covered.' })).toBeVisible();
  });
});

test.describe('quote form', () => {
  test('rejects invalid input and does not open WhatsApp', async ({ page }) => {
    await stubWindowOpen(page);
    await page.goto('/contact/');
    const form = page.getByTestId('quote-form');
    await form.getByRole('button', { name: 'Continue on WhatsApp' }).click();
    await expect(form.getByText('Please enter your name.')).toBeVisible();
    await expect(form.getByText('valid 10-digit Indian mobile')).toBeVisible();
    await expect(form.getByText('choose what you need help with')).toBeVisible();
    await expect(form.getByText('enter your city')).toBeVisible();
    await expect(form.getByText('confirm that Insure Secure')).toBeVisible();
    await form.getByLabel('Mobile number').fill('12345');
    await form.getByRole('button', { name: 'Continue on WhatsApp' }).click();
    await expect(form.getByText('valid 10-digit Indian mobile')).toBeVisible();
    expect(await page.evaluate(() => (window as unknown as { opened: string[] }).opened)).toEqual([]);
  });

  test('a valid form opens WhatsApp with a structured message', async ({ page }) => {
    await stubWindowOpen(page);
    await page.goto('/contact/');
    const form = page.getByTestId('quote-form');
    await form.getByLabel('Your name').fill('Asha Verma');
    await form.getByLabel('Mobile number').fill('+91 98765 43210');
    await form.getByLabel('What do you need help with?').selectOption('Car Insurance');
    await form.getByLabel('City').fill('Jalandhar');
    await form.getByLabel(/Anything else/).fill('Swift, 2022 model');
    await form.getByRole('checkbox').check();
    await form.getByRole('button', { name: 'Continue on WhatsApp' }).click();
    await expect(page.getByText('One last step: press send in WhatsApp')).toBeVisible();
    const opened = await page.evaluate(() => (window as unknown as { opened: string[] }).opened);
    expect(opened).toHaveLength(1);
    const url = new URL(opened[0]!);
    expect(url.pathname).toBe(`/${WHATSAPP_NUMBER}`);
    const text = url.searchParams.get('text')!;
    for (const part of ['Name: Asha Verma', 'Mobile: +91 9876543210', 'Interested in: Car Insurance', 'City: Jalandhar', 'Details: Swift, 2022 model']) {
      expect(text).toContain(part);
    }
  });

  test('a product page preselects its own product', async ({ page }) => {
    await page.goto('/insurance/marine-cargo-insurance/');
    await expect(page.getByTestId('quote-form').getByLabel('What do you need help with?')).toHaveValue('Marine Cargo Insurance');
  });
});

test.describe('interactive features', () => {
  test('the hero selector changes the message and the WhatsApp link', async ({ page }) => {
    await page.goto('/');
    const link = page.getByTestId('hero-whatsapp');
    const before = await link.getAttribute('href');
    await page.getByRole('button', { name: 'My business' }).click();
    await expect(page.getByText('Keep your business running after a setback.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'My business' })).toHaveAttribute('aria-pressed', 'true');
    const after = await link.getAttribute('href');
    expect(after).not.toBe(before);
    expect(new URL(after!).searchParams.get('text')).toContain('my business');
  });

  test('the product explorer switches category with mouse and keyboard', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Motor' }).click();
    await expect(page.getByRole('link', { name: /Two-Wheeler Insurance/ }).first()).toBeVisible();
    await page.getByRole('tab', { name: 'Motor' }).press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Home and travel' })).toHaveAttribute('aria-selected', 'true');
  });

  test('catalogue search and category links filter results', async ({ page }) => {
    await page.goto('/insurance/');
    await expect(page.getByText(`Showing ${catalog.length} of ${catalog.length}`)).toBeVisible();
    await page.getByLabel('Search insurance types').fill('tractor');
    await expect(page.getByText(`Showing 1 of ${catalog.length}`)).toBeVisible();
    await page.getByLabel('Search insurance types').fill('zzzz');
    await expect(page.getByText('No matching cover found.')).toBeVisible();
    await page.getByRole('button', { name: 'Clear search' }).click();
    await page.goto('/insurance/?category=farm');
    await expect(page.getByText(`Showing 3 of ${catalog.length}`)).toBeVisible();
  });

  test('the coverage check reaches a result with a WhatsApp summary', async ({ page }) => {
    await page.goto('/tools/coverage-check/');
    const answers = ['Yes, people depend on me', 'None, or I am not sure', 'Only through my employer', 'No, they are not covered', 'Third-party only', 'No, or I am not sure'];
    for (const answer of answers) await page.getByRole('button', { name: answer }).click();
    const result = page.getByTestId('coverage-result');
    await expect(result).toBeVisible();
    await expect(result.getByText(/Your score: \d+ out of 100/)).toBeVisible();
    await expect(result.getByText('Your family has no income protection')).toBeVisible();
    const href = await result.getByRole('link', { name: 'Send my result on WhatsApp' }).getAttribute('href');
    expect(new URL(href!).searchParams.get('text')).toContain('Your family has no income protection'.slice(0, 20));
    await page.getByRole('button', { name: 'Start again' }).click();
    await expect(page.getByText('Question 1 of 6')).toBeVisible();
  });

  test('the term calculator reacts to its sliders', async ({ page }) => {
    await page.goto('/tools/term-cover/');
    const result = page.getByTestId('term-result');
    await expect(result).toContainText('₹1.25 crore');
    await page.getByLabel('Outstanding loans').fill(String(50_00_000));
    await expect(result).toContainText('₹1.55 crore');
  });

  test('the health cover guide reacts to its inputs', async ({ page }) => {
    await page.goto('/tools/health-cover/');
    const result = page.getByTestId('health-result');
    await expect(result).toContainText('₹15 lakh to ₹20 lakh');
    await page.getByLabel(/Metro city/).check();
    await expect(result).toContainText('₹20 lakh to ₹30 lakh');
    await page.getByLabel('I also want to cover my parents').check();
    await expect(result).toContainText('separate plan for parents');
  });

  test('the renewal reminder requires a date and downloads a calendar file', async ({ page }) => {
    await page.goto('/tools/renewal-reminder/');
    await page.getByRole('button', { name: 'Add to my calendar' }).click();
    await expect(page.getByText('Please choose your renewal date.')).toBeVisible();
    await page.getByLabel('Renewal date').fill('2027-06-15');
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Add to my calendar' }).click();
    const file = await download;
    expect(file.suggestedFilename()).toBe('renew-health-insurance.ics');
    const chunks: Buffer[] = [];
    for await (const chunk of await file.createReadStream()) chunks.push(chunk as Buffer);
    const ics = Buffer.concat(chunks).toString();
    expect(ics).toContain('DTSTART;VALUE=DATE:20270516');
    await expect(page.getByText('Your calendar file has downloaded.')).toBeVisible();
    const href = await page.getByRole('link', { name: 'Ask us to remind you' }).getAttribute('href');
    expect(new URL(href!).searchParams.get('text')).toContain('2027-06-15');
  });

  test('the claim desk switches type and counts ready documents', async ({ page }) => {
    await page.goto('/claims/');
    await page.getByRole('tab', { name: 'Motor' }).click();
    const panel = page.getByRole('tabpanel', { name: 'Motor' });
    await panel.getByLabel('Driving licence').check();
    await expect(panel.getByText('1 of 6 documents ready')).toBeVisible();
    const href = await panel.getByRole('link', { name: 'Get claim help on WhatsApp' }).getAttribute('href');
    const text = new URL(href!).searchParams.get('text')!;
    expect(text).toContain('motor insurance claim');
    expect(text).toContain('Driving licence');
  });

  test('desktop menus open, close with Escape and navigate', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Insurance', exact: true }).click();
    await expect(page.locator('#menu-insurance')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#menu-insurance')).toBeHidden();
    await page.getByRole('button', { name: 'Tools', exact: true }).click();
    await page.locator('#menu-tools').getByRole('link', { name: /Term cover calculator/ }).click();
    await expect(page).toHaveURL(/\/tools\/term-cover\/$/);
    await expect(page.locator('#menu-tools')).toBeHidden();
  });

  test('the mobile menu opens and navigates, and the action bar shows', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Quick contact' })).toBeVisible();
    await page.getByRole('button', { name: 'Open menu' }).click();
    const dialog = page.getByRole('dialog', { name: 'Menu' });
    await dialog.getByText('Claim help').click();
    await expect(page).toHaveURL(/\/claims\/$/);
    await expect(dialog).toBeHidden();
  });
});

test.describe('investments', () => {
  test('every investment page and tool shows the market risk notice', async ({ page }) => {
    const paths = ['/investments/', ...investments.map((i) => `/investments/${i.slug}/`), '/tools/sip-calculator/', '/tools/goal-planner/'];
    for (const path of paths) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await expect(page.getByTestId('mf-notice').first(), path).toContainText('subject to market risks');
    }
  });

  test('the footer shows the notice and the email on every template', async ({ page }) => {
    for (const path of templates) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('footer'), path).toContainText('Mutual fund investments are subject to market risks');
      await expect(page.locator('footer a[href="mailto:insuresecure1961@gmail.com"]'), path).toBeVisible();
    }
  });

  test('the SIP calculator reacts, and its table matches', async ({ page }) => {
    await page.goto('/tools/sip-calculator/');
    const result = page.getByTestId('sip-result');
    const before = await result.innerText();
    await page.getByLabel('Monthly investment').fill('20000');
    await expect.poll(() => result.innerText()).not.toBe(before);
    await page.getByLabel('Years invested').fill('10');
    await expect(result).toContainText('₹24 lakh');
    const chart = page.getByTestId('growth-chart');
    await chart.getByText('Show the numbers as a table').click();
    await expect(chart.locator('tbody tr')).toHaveCount(10);
    await chart.getByRole('group', { name: /Column chart/ }).press('ArrowLeft');
    await expect(chart.getByText('Year 9', { exact: true }).first()).toBeVisible();
  });

  test('the goal planner applies presets and builds a message', async ({ page }) => {
    await page.goto('/tools/goal-planner/');
    const result = page.getByTestId('goal-result');
    const before = await result.innerText();
    await page.getByRole('button', { name: 'Retirement fund' }).click();
    await expect(page.getByRole('button', { name: 'Retirement fund' })).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => result.innerText()).not.toBe(before);
    const href = await result.getByRole('link', { name: 'Plan this on WhatsApp' }).getAttribute('href');
    expect(new URL(href!).searchParams.get('text')).toContain('Retirement fund');
  });

  test('the hero offers savings, with the risk notice', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'My savings' }).click();
    await expect(page.getByText('Give your savings a job, and a plan to match.')).toBeVisible();
    await expect(page.locator('main').getByText('subject to market risks').first()).toBeVisible();
  });

  test('investment options appear in the quote form', async ({ page }) => {
    await page.goto('/investments/sip/');
    await expect(page.getByTestId('quote-form').getByLabel('What do you need help with?')).toHaveValue('SIP (Systematic Investment Plan)');
  });

  test('the desktop investments menu opens and navigates', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Investments', exact: true }).click();
    await page.locator('#menu-investments').getByRole('link', { name: /Retirement Investing/ }).click();
    await expect(page).toHaveURL(/\/investments\/retirement-investing\/$/);
  });
});

test('the office address and map links use the correct address', async ({ page }) => {
  const address = 'House No 511, Karol Bagh Road, near DIPS School, Karol Bagh, Kot Ram Dass, Rail Vihar, Jalandhar, Punjab 144001';
  await page.goto('/contact/');
  await expect(page.locator('main')).toContainText(address);
  await expect(page.locator('footer')).toContainText(address);
  const embed = await page.locator('iframe').getAttribute('src');
  expect(embed).toContain('/maps/embed?pb=');
  expect(embed).toContain('0x391a59b088cc1c15');
  const directions = await page.getByRole('link', { name: 'Get directions' }).getAttribute('href');
  expect(new URL(directions!).searchParams.get('destination')).toBe('31.3337898,75.61989');
  await expect(page.locator(`footer a[href="https://www.google.com/maps?cid=2009759202812149853"]`)).toBeVisible();
  await expect(page.locator('body')).not.toContainText('763');
});

test.describe('honest content', () => {
  test('testimonials and insurers stay hidden while their data is empty', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-section="testimonials"]')).toHaveCount(0);
    await expect(page.locator('[data-section="insurers"]')).toHaveCount(0);
  });

  test('visible copy avoids absolute claims and invented statistics', async ({ page }) => {
    test.setTimeout(240_000);
    const banned = /\b(best|cheapest|lowest|number one|no\.? ?1|guaranteed|assured returns|double your money|happy clients|claims settled|\d+\s?[kK]\+|100% )\b/i;
    for (const path of allPaths) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const text = await page.locator('body').innerText();
      expect(text.match(banned)?.[0] ?? null, path).toBeNull();
    }
  });
});

for (const width of [360, 768, 1440]) {
  test(`no horizontal scrolling at ${width} pixels`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 850 });
    for (const path of templates) {
      await page.goto(path, { waitUntil: 'load' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
}

for (const width of [390, 1440]) {
  test(`axe accessibility scan at ${width} pixels`, async ({ page }) => {
    test.setTimeout(240_000);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width, height: 900 });
    const problems: string[] = [];
    for (const path of templates) {
      await page.goto(path, { waitUntil: 'load' });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('iframe')
        .analyze();
      for (const v of results.violations) {
        problems.push(`${path} [${v.id}] ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`);
      }
    }
    expect(problems).toEqual([]);
  });
}

test('the site works with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'My home' }).click();
  await expect(page.getByText('Protect the home you have worked so hard to build.')).toBeVisible();
  await expect(page.getByRole('img', { name: /brick house/ })).toBeVisible();
});
