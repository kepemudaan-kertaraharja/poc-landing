const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

function selectTab(index, focus = false) {
  tabs.forEach((tab, tabIndex) => {
    const selected = tabIndex === index;
    tab.setAttribute('aria-selected', selected);
    tab.tabIndex = selected ? 0 : -1;
    panels[tabIndex].hidden = !selected;
  });
  if (focus) tabs[index].focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(index));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') return selectTab(0, true);
    if (event.key === 'End') return selectTab(tabs.length - 1, true);
    selectTab((index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length, true);
  });
});

document.body.classList.add('org-profile-ready');
selectTab(0);

const links = [...document.querySelectorAll('.org-profile-nav a')];
const sections = links.map((link) => document.querySelector(link.hash));
const observer = new IntersectionObserver((entries) => {
  const visible = entries.find((entry) => entry.isIntersecting);
  if (!visible) return;
  links.forEach((link) => link.toggleAttribute('aria-current', link.hash === `#${visible.target.id}`));
}, { rootMargin: '-30% 0px -60%' });
sections.forEach((section) => observer.observe(section));
