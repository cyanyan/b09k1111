// ===============================
// main.js — 2025 final version
// ===============================

(function setupStaggerChars() {
  const fullSpans = document.querySelectorAll('.tab-labels .label .full');
  fullSpans.forEach(full => {
    if (full.dataset.staggered === '1') return;
    const text = full.textContent.trim();
    full.textContent = '';
    Array.from(text).forEach((ch, idx) => {
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch === ' ' ? '\u00A0' : ch; 
      s.style.transitionDelay = `${idx * 60}ms`; 
      full.appendChild(s);
    });
    full.dataset.staggered = '1';
  });
})();

// ===============================
// 标签点击逻辑
// ===============================
document.querySelectorAll('.tab-labels .label').forEach(label => {
  label.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = label.dataset.id;

    if (label.classList.contains('active')) return;
    if (window.openTabById) {
      window.openTabById(id);
    } else {
      switch (id) {
        case 'lunar_practices':
          window.location.href = 'moon.html';
          break;
        case 'book':
          window.location.href = 'book.html';
          break;
        case 'exhibitions':
          window.location.href = 'exhibitions.html';
          break;
        case 'events':
          window.location.href = 'events.html';
          break;
        case 'about':
          window.location.href = 'about.html';
          break;
        default:
          console.warn(`No action defined for tab id: ${id}`);
      }
    }
  });
});

// ===============================
// 点击 Logo 返回首页
// ===============================
const logoEl = document.querySelector('.logo');
if (logoEl) {
  logoEl.addEventListener('click', () => {
    const isIndex =
      /\/index\.html?$/.test(location.pathname) ||
      location.pathname.endsWith('/') ||
      location.pathname === '';

    if (!isIndex) {
      window.location.href = 'index.html';
      return;
    }

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => {
      t.classList.remove('active');
      t.innerHTML = '';
    });
    document.body.classList.remove('tab-open');

    document.querySelectorAll('.tab-labels .label').forEach(label => {
      label.classList.remove('active');
    });

    document.title = 'B09K';

    const container = document.getElementById('imageContainer');
    if (container) {
      if (typeof window.homeShowRandomImage === 'function') {
        window.homeShowRandomImage();
      } else {
        container.innerHTML = '';
        const img = document.createElement('img');
        img.src = 'assets/home/h1.jpg';
        img.classList.add('visible');
        img.style.zIndex = Date.now();
        img.style.width = '350px';
        container.style.width = '560px';
        container.appendChild(img);
      }
    }
  });
}
