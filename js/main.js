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

// ===============================
// 空闲检测：30秒无操作后显示遮罩和SVG
// ===============================
(function setupIdleOverlay() {
  let idleTimer = null;
  const IDLE_TIME = 3000; // 30秒
  let overlay = null;
  let svg = null;

  function createOverlay() {
    // 如果遮罩已存在，直接返回
    if (document.getElementById('idle-overlay')) {
      return;
    }

    // 创建遮罩容器
    overlay = document.createElement('div');
    overlay.id = 'idle-overlay';
    overlay.className = 'idle-overlay';

    // 创建SVG容器
    svg = document.createElement('img');
    svg.src = 'assets/b2.svg';
    svg.className = 'idle-svg';
    svg.alt = '';

    overlay.appendChild(svg);
    document.body.appendChild(overlay);
  }

  function showOverlay() {
    if (!overlay) {
      createOverlay();
    }
    if (overlay) {
      overlay.classList.add('active');
    }
  }

  function hideOverlay() {
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  function resetIdleTimer() {
    // 清除现有定时器
    if (idleTimer) {
      clearTimeout(idleTimer);
    }
    // 隐藏遮罩
    hideOverlay();
    // 设置新的定时器
    idleTimer = setTimeout(() => {
      showOverlay();
    }, IDLE_TIME);
  }

  // 监听用户活动事件
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
  events.forEach(event => {
    document.addEventListener(event, resetIdleTimer, { passive: true });
  });

  // 点击遮罩时隐藏
  document.addEventListener('click', (e) => {
    if (overlay && overlay.contains(e.target)) {
      hideOverlay();
      resetIdleTimer();
    }
  }, { passive: true });

  // 初始化定时器
  resetIdleTimer();
})();
