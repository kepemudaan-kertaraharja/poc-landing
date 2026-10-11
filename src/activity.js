import projects from '../content/projects.json';

const project = projects.find(({ id }) => id === document.body.dataset.activity);

if (!project) throw new Error('Halaman kegiatan tidak ditemukan.');

const pageCopy = {
  'one-off': {
    format: 'SATU KALI',
    sections: {
      intro: ['01 / LATAR', 'Cerita di balik kegiatan'],
      people: ['02 / ORANG', 'Siapa yang bergerak?'],
      steps: ['03 / PROSES', 'Yang terjadi di lapangan'],
      ending: ['04 / HASIL & LAPORAN', 'Apa hasilnya, dan apa yang belum tercatat?'],
    },
    supportEyebrow: 'DUKUNG GERAK BERIKUTNYA',
    supportTitle: 'Bantu gerak berikutnya.',
    supportCopy: 'Dukungan dapat berupa waktu, perlengkapan, donasi, atau sponsor. Tulis tawaranmu agar pengurus dapat menilai kebutuhan kegiatan berikutnya.',
    supportAction: 'Tawarkan dukungan',
    needsTitle: 'Yang dapat didukung',
    supportNote: 'Situs ini tidak menerima pembayaran. Donasi atau sponsor perlu dibicarakan dan diverifikasi langsung dengan pengurus.',
  },
  recurring: {
    format: 'PROGRAM BERULANG',
    sections: {
      intro: ['01 / TENTANG', 'Kegiatan ini tentang apa?'],
      people: ['02 / PESERTA', 'Untuk siapa?'],
      steps: ['03 / RITME', 'Apa yang dilakukan?'],
      ending: ['04 / IKUT', 'Cara ikut, berpartisipasi, atau membantu'],
    },
    supportEyebrow: 'IKUT BERGERAK',
    supportTitle: 'Datang, ikut, atau bantu jalannya.',
    supportCopy: 'Tanyakan jadwal terbaru, cara berpartisipasi, atau kebutuhan yang dapat dibantu sebelum datang ke lokasi kegiatan.',
    supportAction: 'Tanya cara ikut',
    needsTitle: 'Yang membantu kegiatan berjalan',
    supportNote: 'Jadwal dan lokasi berikutnya belum dikonfirmasi. Pastikan informasi terbaru langsung kepada pengurus.',
  },
}[project.format];

if (!pageCopy) throw new Error('Jenis halaman kegiatan tidak dikenali.');

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => { element.textContent = value; });
};
const fillList = (selector, items) => {
  const list = document.querySelector(selector);
  items.forEach((item) => {
    const entry = document.createElement('li');
    entry.textContent = item;
    list.append(entry);
  });
};

document.title = `${project.title} | Kepemudaan Kampung Babakan RW 009`;
document.querySelector('meta[name="description"]').content = project.summary;
document.body.classList.add(`activity-page--${project.format}`);
setText('[data-format]', pageCopy.format);
setText('[data-category]', project.categoryLabel);
setText('[data-title]', project.title);
setText('[data-summary]', project.summary);
setText('[data-status]', project.status);
setText('[data-goal]', project.goal);
setText('[data-context]', project.context);
setText('[data-audience]', project.audience);
setText('[data-success]', project.success);
setText('[data-closing]', project.closing);
setText('[data-owner]', project.owner);
setText('[data-timing]', project.timing);
setText('[data-location]', project.location);
Object.entries(pageCopy.sections).forEach(([section, [label, title]]) => {
  setText(`[data-section-label="${section}"]`, label);
  setText(`[data-section-title="${section}"]`, title);
});
setText('[data-support-eyebrow]', pageCopy.supportEyebrow);
setText('[data-support-title]', pageCopy.supportTitle);
setText('[data-support-copy]', pageCopy.supportCopy);
setText('[data-support-action]', pageCopy.supportAction);
setText('[data-needs-title]', pageCopy.needsTitle);
setText('[data-support-note]', pageCopy.supportNote);
const image = document.querySelector('[data-image]');
image.textContent = `[${project.imageAlt}]`;
image.setAttribute('aria-label', project.imageAlt);

fillList('[data-steps]', project.steps);
fillList('[data-needs]', project.needs);

const contact = document.querySelector('[data-contact]');
contact.href = `https://wa.me/6285871277601?text=${encodeURIComponent(`Halo Pengurus Pemuda Babakan RW 009, saya ingin bertanya tentang kegiatan "${project.title}".`)}`;
contact.target = '_blank';
contact.rel = 'noreferrer';
