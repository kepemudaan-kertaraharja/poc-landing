import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const projects = JSON.parse(await read('content/projects.json'));
const home = await read('index.html');
const stories = ['renovasi-lapang-voli', 'krisis-air-bersih', 'phbn-hut-ri-81'];

test('editable projects and public pages are complete and linked correctly', async () => {
  assert.ok(home.includes('href="./profil/"'), 'Landing page does not link to the organization profile');
  assert.ok(projects.length > 0, 'Provide at least one project');
  const ids = new Set();
  let activityCount = 0;
  const categories = { lingkungan: 'Lingkungan', pendidikan: 'Pendidikan', kebersamaan: 'Kebersamaan' };
  const formats = new Set(['one-off', 'recurring']);
  for (const project of projects) {
    assert.match(project.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase project slug');
    assert.ok(!ids.has(project.id), `Duplicate project ID: ${project.id}`);
    ids.add(project.id);
    for (const field of ['title', 'summary', 'imageAlt', 'imageNote', 'status', 'goal', 'context', 'audience', 'success', 'closing', 'owner', 'timing', 'location']) {
      assert.ok(typeof project[field] === 'string' && project[field].trim(), `${project.id}: missing ${field}`);
    }
    assert.ok(Object.hasOwn(categories, project.category), `Unknown category: ${project.category}`);
    assert.equal(project.categoryLabel, categories[project.category]);
    assert.ok(formats.has(project.format), `${project.id}: unknown activity format`);
    assert.ok(home.includes(`data-filter="${project.category}"`), `Missing category filter for ${project.id}`);
    assert.ok(Array.isArray(project.activities) && project.activities.length, `${project.id}: missing individual activities`);
    for (const activity of project.activities) {
      activityCount += 1;
      for (const field of ['title', 'summary', 'timing', 'status', 'sortDate']) {
        assert.ok(typeof activity[field] === 'string' && activity[field].trim(), `${project.id}: activity missing ${field}`);
      }
      assert.match(activity.sortDate, /^\d{4}-\d{2}-\d{2}$/, `${project.id}: sortDate must use YYYY-MM-DD`);
      assert.ok(formats.has(activity.format), `${project.id}: activity has unknown format`);
      if (Object.hasOwn(activity, 'detail')) assert.equal(typeof activity.detail, 'boolean', `${project.id}: invalid detail flag`);
    }
    for (const field of ['steps', 'needs']) {
      assert.ok(Array.isArray(project[field]) && project[field].length, `${project.id}: missing ${field}`);
      assert.ok(project[field].every((item) => typeof item === 'string' && item.trim()), `${project.id}: invalid ${field}`);
    }
    assert.match(project.image, /^images\/[a-zA-Z0-9_-]+\.(?:jpg|jpeg|webp|png)$/);
    await access(new URL(`public/${project.image}`, root));
    const activityPath = `kegiatan/${project.id}/index.html`;
    const activityPage = await read(activityPath);
    assert.ok(activityPage.includes(`data-activity="${project.id}"`), `${project.id}: dedicated page uses the wrong activity`);
  }
  assert.ok(activityCount >= 20, 'The public activity record should include the selected archive-backed additions');
  for (const [, id] of home.matchAll(/href="\.\/kegiatan\/([^/]+)\//g)) {
    assert.ok(ids.has(id), `Editorial note or agenda points to missing activity: ${id}`);
  }
  for (const story of stories) {
    assert.ok(home.includes(`./cerita/${story}/`), `Landing page does not link to story: ${story}`);
    const storyPage = await read(`cerita/${story}/index.html`);
    assert.ok(storyPage.includes('Kembali ke editorial'), `${story}: missing return link`);
  }
});

test('public document links and local source assets resolve', async () => {
  for (const page of ['index.html', 'profil/index.html', ...projects.map(({ id }) => `kegiatan/${id}/index.html`), ...stories.map((id) => `cerita/${id}/index.html`)]) {
    const html = await read(page);
    const pageURL = new URL(page, root);
    for (const [, path] of html.matchAll(/href="([^"#]+\.md)"/g)) {
      await access(new URL(path, pageURL));
    }
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `Duplicate HTML ID in ${page}`);
    for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(ids.includes(id), `Broken anchor #${id} in ${page}`);
    }
  }
  for (const asset of ['fonts/barlow-condensed-latin.woff2', 'fonts/dm-sans-latin.woff2', 'fonts/OFL.txt', 'favicon.svg', 'images/arsip-hayu-camp.jpg']) {
    await access(new URL(`public/${asset}`, root));
  }
});
