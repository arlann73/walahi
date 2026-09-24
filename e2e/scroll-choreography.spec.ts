import { test, expect } from "@playwright/test";

test.describe("Scroll Choreography & Round 3 Verification", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait until preloader finishes completely and detaches
    const preloader = page.locator("#preloader-overlay");
    if ((await preloader.count()) > 0) {
      await preloader.waitFor({ state: "detached", timeout: 20000 });
    }
    await page.waitForTimeout(600);
  });

  test("1. Hero stage is mounted and ready", async ({ page }) => {
    const heroTrack = page.locator("#hero-track");
    await expect(heroTrack).toBeVisible();

    const headline = page.locator(".hero-headline-wrap");
    await expect(headline).toBeVisible();
    await expect(headline).toContainText("PRASTYO");
  });

  test("2. Scroll triggers Editorial Blocks and Batch Catalog Cascade", async ({ page }) => {
    const track = page.locator("#hero-track");
    await expect(track).toBeVisible();

    // Scroll down past wave docking threshold (progress > 0.35) using Lenis + native scroll
    await page.evaluate(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(900, { immediate: true });
      } else {
        window.scrollTo(0, 900);
      }
    });

    // Allow GSAP ticker and Lenis a moment to settle animations
    await page.waitForTimeout(1200);

    // Verify all 4 project rows are rendered in DOM
    const projectRows = page.locator(".project-row");
    await expect(projectRows).toHaveCount(4);

    // Verify all 12 project cards are present
    const projectCards = page.locator(".project-card");
    const count = await projectCards.count();
    expect(count).toBeGreaterThanOrEqual(12);

    // First row should be fully visible
    await expect(projectRows.first()).toBeVisible();

    // Capture visual snapshot of the batch catalog cascade
    await page.screenshot({ path: "test-results/catalog-batch-reveal.png" });
  });

  test("3. Once-In Retention on reverse scroll and reset at apex", async ({ page }) => {
    // Scroll deep into catalog (progress ~0.50)
    await page.evaluate(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).__lenis;
      if (lenis) lenis.scrollTo(900, { immediate: true });
      else window.scrollTo(0, 900);
    });
    await page.waitForTimeout(1000);

    const projectRows = page.locator(".project-row");
    await expect(projectRows.first()).toBeVisible();

    // Reverse scroll slightly (to progress ~0.25)
    await page.evaluate(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).__lenis;
      if (lenis) lenis.scrollTo(450, { immediate: true });
      else window.scrollTo(0, 450);
    });
    await page.waitForTimeout(800);

    // Once-In retention: rows should STILL remain visible without hysteresis
    await expect(projectRows.first()).toBeVisible();

    // Scroll all the way back to top apex (progress 0)
    await page.evaluate(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).__lenis;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1000);

    const headline = page.locator(".hero-headline-wrap");
    await expect(headline).toBeVisible();
  });

  test("4. What I Do section scrolls into view with Swiss Editorial 3-Column Grid", async ({ page }) => {
    // Scroll deep into the unified canvas to reach #what-i-do
    await page.evaluate(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(document.body.scrollHeight, { immediate: true });
      } else {
        window.scrollTo(0, document.body.scrollHeight);
      }
    });
    await page.waitForTimeout(1000);

    const whatIDoSection = page.locator("#what-i-do");
    await expect(whatIDoSection).toBeVisible();

    // Verify Title
    const title = whatIDoSection.locator("h2");
    await expect(title).toHaveText("WHAT I DO.");

    // Verify 3 Swiss Editorial capability columns
    const columns = whatIDoSection.locator("h3");
    await expect(columns).toHaveCount(3);
    await expect(columns.nth(0)).toContainText("Subsurface & Well Logs");
    await expect(columns.nth(1)).toContainText("Mine Planning & 3D");
    await expect(columns.nth(2)).toContainText("Geomapping & Spatial Data");

    // Verify inquiry link with WhatsApp
    const contactLink = whatIDoSection.locator("a[href*='wa.me']");
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toContainText("+62 822-6710-8623");

    // Capture screenshot of the What I Do section
    await whatIDoSection.screenshot({ path: "test-results/what-i-do-section.png" });
  });

  test("5. About Me section is mounted with portrait frame and 8 milestone nodes", async ({ page }) => {
    // Scroll past wave threshold to dock at About Me
    await page.evaluate(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(1800, { immediate: true });
      } else {
        window.scrollTo(0, 1800);
      }
    });
    await page.waitForTimeout(1000);

    const aboutSection = page.locator("#about");
    await expect(aboutSection).toBeVisible();

    // Verify Title
    const title = aboutSection.locator("h2");
    await expect(title).toHaveText("ABOUT ME");

    // Verify portrait placeholder
    const portrait = aboutSection.locator("text=[ PORTRAIT // RESERVED ]");
    await expect(portrait).toBeVisible();

    // Verify 8 milestone nodes on the winding timeline
    const milestones = aboutSection.locator(".group.cursor-pointer");
    await expect(milestones).toHaveCount(8);

    // Verify affiliations strip
    const affiliations = aboutSection.locator("text=[ AFFILIATIONS & INSTITUTIONS ]");
    await expect(affiliations).toBeVisible();
  });
});
