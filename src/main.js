import projects from '../content/projects.json';

const grid = document.querySelector('#project-grid');
const activityToggle = document.querySelector('#activity-toggle');
const activities = projects.flatMap((project) => project.activities.map((activity) => ({
  ...activity,
  projectId: project.id,
  category: project.category,
  categoryLabel: project.categoryLabel,
}))).sort((a, b) => b.sortDate.localeCompare(a.sortDate));
let activeCategory = 'all';
let activitiesExpanded = false;

// Content is local, but escape it here so future editors cannot accidentally inject markup.
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

function renderActivities() {
  const matching = activities.filter((activity) => activeCategory === 'all' || activity.category === activeCategory);
  const visible = activitiesExpanded ? matching : matching.slice(0, 4);
  grid.innerHTML = visible.map((activity) => {
    const linked = activity.detail !== false;
    const content = `
      <span class="activity-card-top"><span>${String(activities.indexOf(activity) + 1).padStart(2, '0')}</span><span>${escape(activity.categoryLabel)}</span></span>
      <span class="activity-card-format">${activity.format === 'recurring' ? 'PROGRAM BERULANG' : 'SATU KALI'}</span>
      <h3>${escape(activity.title)}</h3>
      <p>${escape(activity.summary)}</p>
      <span class="activity-card-bottom"><span><strong>${escape(activity.timing)}</strong>${escape(activity.status)}</span><span class="${linked ? '' : 'activity-card-record'}" aria-hidden="true">${linked ? '↗' : 'ARSIP'}</span></span>`;
    const classes = `activity-card activity-card--${activity.format === 'recurring' ? 'recurring' : 'one-off'}${linked ? '' : ' activity-card--static'}`;
    return linked
      ? `<a class="${classes}" href="./kegiatan/${escape(activity.projectId)}/" aria-label="Baca catatan kegiatan: ${escape(activity.title)}">${content}</a>`
      : `<article class="${classes}" aria-label="Catatan kegiatan: ${escape(activity.title)}">${content}</article>`;
  }).join('');
  activityToggle.hidden = matching.length <= 4;
  activityToggle.setAttribute('aria-expanded', String(activitiesExpanded));
  activityToggle.innerHTML = activitiesExpanded
    ? 'Tampilkan 4 kegiatan <span aria-hidden="true">↑</span>'
    : `Lihat semua ${matching.length} kegiatan <span aria-hidden="true">↓</span>`;
  document.querySelector('#filter-status').textContent = `${visible.length} dari ${matching.length} kegiatan ditampilkan.`;
}

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    activeCategory = button.dataset.filter;
    activitiesExpanded = false;
    renderActivities();
  });
});

activityToggle.addEventListener('click', () => {
  activitiesExpanded = !activitiesExpanded;
  renderActivities();
});

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Buka navigasi');
  nav.classList.remove('open');
}
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(expanded));
  toggle.setAttribute('aria-label', expanded ? 'Tutup navigasi' : 'Buka navigasi');
  nav.classList.toggle('open', expanded);
});
nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});

renderActivities();
