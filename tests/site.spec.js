import { test, expect } from '@playwright/test';

test('the public site and documentation placeholders load at a repository subpath', async ({ page }) => {
  const failures = [];
  page.on('pageerror', (error) => failures.push(error.message));
  page.on('response', (response) => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
  for (const path of [
    './',
    './profil/',
    './kegiatan/gotong-royong-lingkungan/',
    './kegiatan/ruang-belajar-budaya/',
    './kegiatan/lapang-dan-olahraga/',
    './cerita/renovasi-lapang-voli/',
    './cerita/krisis-air-bersih/',
    './cerita/phbn-hut-ri-81/',
  ]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('.image-placeholder').first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(failures).toEqual([]);
});

test('category filters, occurrence tags, and activity expansion work together', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('.activity-card')).toHaveCount(4);
  await expect(page.locator('.activity-card h3').first()).toHaveText('Latihan voli');
  await expect(page.locator('.activity-card-format')).toHaveCount(4);
  await expect(page.locator('.story-feature, .story-note')).toHaveCount(3);
  await expect(page.locator('.story-feature h3, .story-note h3')).toHaveText([
    'Lapang dibangun, kampung bergerak.',
    'Air datang, warga saling jaga.',
    'Agustus dirawat bersama.',
  ]);
  await expect(page.getByRole('button', { name: 'Lihat semua 20 kegiatan' })).toBeVisible();
  await page.getByRole('button', { name: 'Lihat semua 20 kegiatan' }).click();
  await expect(page.locator('.activity-card')).toHaveCount(20);
  await expect(page.locator('#activity-toggle')).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('button', { name: 'Pendidikan', exact: true }).click();
  await expect(page.locator('.activity-card')).toHaveCount(4);
  await expect(page.getByRole('button', { name: 'Pendidikan', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Lihat semua 6 kegiatan' }).click();
  await expect(page.locator('.activity-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Lingkungan', exact: true }).click();
  await expect(page.locator('.activity-card')).toHaveCount(4);
  await expect(page.locator('#activity-toggle')).toBeHidden();
  await page.getByRole('button', { name: /Semua kegiatan/ }).click();
  await page.getByRole('button', { name: 'Lingkungan', exact: true }).click();
  const opener = page.getByRole('link', { name: 'Baca catatan kegiatan: Penyaluran bantuan air bersih' });
  await opener.click();
  await expect(page).toHaveURL(/\/kegiatan\/gotong-royong-lingkungan\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Jaga lingkungan, bantu warga.');
  await expect(page.locator('main')).toContainText('Apa hasilnya, dan apa yang belum tercatat?');
  await expect(page.locator('.activity-support')).toContainText('donasi, atau sponsor');
  await page.getByRole('link', { name: 'Kembali ke daftar kegiatan' }).click();
  await expect(page).toHaveURL(/#gerakan$/);
  await expect(page.locator('.activity-card')).toHaveCount(4);
  await page.locator('.projects-bottom a[href="./kegiatan/ruang-belajar-budaya/"]').click();
  await expect(page).toHaveURL(/\/kegiatan\/ruang-belajar-budaya\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Belajar dekat rumah.');
  await expect(page.locator('main')).toContainText('Cara ikut, berpartisipasi, atau membantu');
  const contactURL = new URL(await page.getByRole('link', { name: /Tanya cara ikut/ }).getAttribute('href'));
  expect(contactURL.hostname).toBe('wa.me');
  expect(contactURL.pathname).toBe('/6285871277601');
  expect(contactURL.searchParams.get('text')).toContain('Belajar dekat rumah.');
});

test('editorial cards lead through the three long-form posts', async ({ page }) => {
  await page.goto('./');
  await page.locator('.story-feature').click();
  await expect(page).toHaveURL(/\/cerita\/renovasi-lapang-voli\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Lapang yang dibangun');
  await expect(page.locator('main')).toContainText('Sebelum garis putih ditarik');
  await page.locator('.post-next a').click();
  await expect(page).toHaveURL(/\/cerita\/krisis-air-bersih\/$/);
  await expect(page.locator('main')).toContainText('Distribusi adalah soal urutan');
  await page.locator('.post-next a').click();
  await expect(page).toHaveURL(/\/cerita\/phbn-hut-ri-81\/$/);
  await expect(page.locator('main')).toContainText('Perayaan dimulai jauh sebelum hari acara');
});

test('the organization profile supports inline exploration', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('link', { name: /Buka halaman profil/ }).click();
  await expect(page).toHaveURL(/\/profil\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Kepemudaan Kampung');
  await page.getByRole('tab', { name: /Persiapan/ }).click();
  await expect(page.locator('#method-rangkai')).toBeVisible();
  await expect(page.locator('#method-dengar')).toBeHidden();
  await page.getByRole('tab', { name: /Persiapan/ }).press('ArrowRight');
  await expect(page.locator('#method-gerak')).toBeVisible();
  await page.getByRole('link', { name: /04 Bidang/ }).click();
  await expect(page).toHaveURL(/#bidang-kegiatan$/);
});

test('contact routes open WhatsApp with audience-specific messages', async ({ page }) => {
  await page.goto('./');
  const routes = page.locator('.contact-path');
  await expect(routes).toHaveCount(2);
  const partnerURL = new URL(await routes.nth(0).getAttribute('href'));
  const participantURL = new URL(await routes.nth(1).getAttribute('href'));
  expect(partnerURL.origin + partnerURL.pathname).toBe('https://wa.me/6285871277601');
  expect(partnerURL.searchParams.get('text')).toContain('mitra/sponsor');
  expect(participantURL.searchParams.get('text')).toContain('bergabung sebagai anggota');
  await expect(page.getByRole('link', { name: /\+62 858-7127-7601/ })).toHaveAttribute('href', 'https://wa.me/6285871277601');
  await expect(page.getByRole('link', { name: /pemudababakanrw009@gmail.com/ })).toHaveAttribute('href', 'mailto:pemudababakanrw009@gmail.com');
});

test('navigation and contact routes remain usable at narrow widths', async ({ page, isMobile }) => {
  await page.goto('./');
  if (isMobile) {
    await page.getByRole('button', { name: 'Buka navigasi' }).click();
    await expect(page.locator('#main-nav')).toBeVisible();
    await page.locator('#main-nav').getByRole('link', { name: 'Kegiatan', exact: true }).click();
    await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
  } else {
    await page.locator('#main-nav').getByRole('link', { name: 'Kegiatan', exact: true }).click();
  }
  await expect(page).toHaveURL(/#gerakan$/);
  await expect(page.locator('#faq')).toHaveCount(0);
  await expect(page.locator('.contact-path')).toHaveCount(2);
  await expect(page.locator('.contact-path').nth(1)).toHaveAttribute('href', /wa\.me\/6285871277601/);
  for (const width of [320, 540, 768]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}px`).toBe(true);
  }
});
