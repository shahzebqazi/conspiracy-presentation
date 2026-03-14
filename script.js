(function () {
  'use strict';

  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');
  const currentEl = document.querySelector('.slide-indicator .current');
  const totalEl = document.querySelector('.slide-indicator .total');

  if (totalEl) totalEl.textContent = totalSlides;

  let currentIndex = 0;

  function goToSlide(index) {
    index = Math.max(0, Math.min(index, totalSlides - 1));
    if (index === currentIndex) return;
    slides[currentIndex].classList.remove('active');
    currentIndex = index;
    slides[currentIndex].classList.add('active');
    if (currentEl) currentEl.textContent = currentIndex + 1;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalSlides - 1;
    slides[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.body.setAttribute('data-slide', currentIndex + 1);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    }
  });

  // Counter animation (Slide 2)
  const counterEl = document.querySelector('.counter[data-target]');
  if (counterEl) {
    const target = parseInt(counterEl.getAttribute('data-target'), 10) || 10;
    const duration = 2000;
    const startTime = null;

    function animateCounter(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 2);
      const value = Math.floor(easeOut * target);
      counterEl.textContent = value;
      if (progress < 1) requestAnimationFrame(animateCounter);
      else counterEl.textContent = target;
    }

    const observerCounter = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            requestAnimationFrame(animateCounter);
            observerCounter.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observerCounter.observe(counterEl);
  }

  // Intersection Observer: fade-in when slide enters view
  const observerSlides = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          const cards = entry.target.querySelectorAll('.conspiracy-card');
          cards.forEach(function (card, i) {
            card.style.setProperty('--i', i);
          });
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
  );

  slides.forEach(function (slide) {
    observerSlides.observe(slide);
  });

  // Fact-check toggle (Slide 5)
  document.querySelectorAll('.fact-check-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const card = this.closest('.conspiracy-card');
      if (card) card.classList.toggle('show-tooltip');
    });
  });

  // Build-A-Con workshop (Slide 7)
  const buildaconCols = ['villain', 'target', 'method', 'coverup'];
  const state = { villain: null, target: null, method: null, coverup: null };
  const sentenceEl = document.getElementById('buildacon-sentence');
  const shareBtn = document.getElementById('share-con-btn');

  function getSelected() {
    return {
      villain: state.villain,
      target: state.target,
      method: state.method,
      coverup: state.coverup
    };
  }

  function updateSentence() {
    const s = getSelected();
    if (s.villain && s.target && s.method && s.coverup) {
      const text = s.villain + ' is ' + s.method + ' to control ' + s.target + ', ' + s.coverup;
      if (sentenceEl) {
        sentenceEl.textContent = text;
        sentenceEl.classList.add('highlight');
      }
      if (shareBtn) shareBtn.style.display = 'inline-flex';
      updateUrlFragment();
    } else {
      if (sentenceEl) {
        sentenceEl.textContent = 'Pick one option from each column to generate your conspiracy.';
        sentenceEl.classList.remove('highlight');
      }
      if (shareBtn) shareBtn.style.display = 'none';
      if (window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }

  function updateUrlFragment() {
    const s = getSelected();
    if (!s.villain || !s.target || !s.method || !s.coverup) return;
    const params = new URLSearchParams();
    params.set('v', s.villain);
    params.set('t', s.target);
    params.set('m', s.method);
    params.set('c', s.coverup);
    const hash = '#' + params.toString();
    if (window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search + hash);
    } else {
      window.location.hash = hash;
    }
  }

  function parseUrlFragment() {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const params = new URLSearchParams(hash);
    const v = params.get('v');
    const t = params.get('t');
    const m = params.get('m');
    const c = params.get('c');
    if (v && t && m && c) {
      state.villain = v;
      state.target = t;
      state.method = m;
      state.coverup = c;
      // Select corresponding cards
      document.querySelectorAll('.buildacon-col').forEach(function (col) {
        const key = col.getAttribute('data-col');
        const map = { villain: v, target: t, method: m, coverup: c };
        const val = map[key];
        if (!val) return;
        col.querySelectorAll('.buildacon-card').forEach(function (card) {
          const cardVal = card.getAttribute('data-value');
          card.classList.toggle('selected', cardVal === val);
        });
      });
      updateSentence();
    }
  }

  document.querySelectorAll('.buildacon-col').forEach(function (col) {
    const key = col.getAttribute('data-col');
    if (!buildaconCols.includes(key)) return;
    col.querySelectorAll('.buildacon-card').forEach(function (card) {
      card.addEventListener('click', function () {
        col.querySelectorAll('.buildacon-card').forEach(function (c) { c.classList.remove('selected'); });
        this.classList.add('selected');
        state[key] = this.getAttribute('data-value');
        updateSentence();
      });
    });
  });

  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      const s = getSelected();
      if (!s.villain || !s.target || !s.method || !s.coverup) return;
      updateUrlFragment();
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(function () {
        const label = shareBtn.innerHTML;
        shareBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(function () {
          shareBtn.innerHTML = '<i class="fa-solid fa-link"></i> Copy shareable link';
        }, 2000);
      }).catch(function () {
        shareBtn.innerHTML = '<i class="fa-solid fa-link"></i> Share: ' + url.slice(0, 40) + '…';
      });
    });
  }

  parseUrlFragment();

  // Initial slide from hash (e.g. #slide-3)
  const hashSlide = window.location.hash.match(/^#slide-(\d+)$/);
  if (hashSlide) {
    const num = parseInt(hashSlide[1], 10);
    if (num >= 1 && num <= totalSlides) goToSlide(num - 1);
  }

  // Initialize nav button states
  if (prevBtn) prevBtn.disabled = true;
  if (nextBtn) nextBtn.disabled = totalSlides <= 1;
})();
