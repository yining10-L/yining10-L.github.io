const toggle = document.getElementById('langToggle');
let language = 'zh';

toggle.addEventListener('click', () => {
  language = language === 'zh' ? 'en' : 'zh';
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-zh]').forEach(el => {
    el.textContent = el.dataset[language];
  });
  toggle.textContent = language === 'zh' ? 'EN' : '中';
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: .12});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const galleries = {
  pause: { title: 'Pause Before You Trust', pages: [1,2,3,4,5,6,7] },
  panda: { title: 'Panda Trip', pages: [8,9] },
  paws: { title: 'Retired Paws', pages: [10,11,12] },
  push: { title: 'The “Push” Puzzle', pages: [13,14] },
  loom: { title: 'Loom of Sentiment', pages: [15,16] }
};
const modal = document.getElementById('galleryModal');
const galleryBody = document.getElementById('galleryBody');
const galleryTitle = document.getElementById('galleryTitle');
const close = document.getElementById('galleryClose');

document.querySelectorAll('[data-gallery]').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = galleries[btn.dataset.gallery];
    galleryTitle.textContent = item.title;
    galleryBody.innerHTML = item.pages.map(p => `<img loading="lazy" src="assets/portfolio/page-${p}.png" alt="${item.title} portfolio page ${p}">`).join('');
    modal.showModal();
    galleryBody.scrollTop = 0;
  });
});
close.addEventListener('click', () => modal.close());
modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
