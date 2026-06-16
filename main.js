// =============================================
//  NAVIGATION: scrolled state
// =============================================
const nav = document.getElementById('nav');
function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// =============================================
//  SMOOTH PARALLAX (requestAnimationFrame)
// =============================================
const heroBg = document.getElementById('heroBg');
const ueberParallax = document.getElementById('ueberParallax');
const galerieImgs = document.querySelectorAll('.galerie-item img[data-parallax]');

let currentScroll = window.scrollY;
let targetScroll = window.scrollY;
let rafId = null;

// Capture scroll target passively
window.addEventListener('scroll', () => {
  targetScroll = window.scrollY;
}, { passive: true });

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function tick() {
  // Smooth interpolation toward target scroll (0.12 = smoothing factor)
  currentScroll = lerp(currentScroll, targetScroll, 0.12);

  // Hero parallax
  if (heroBg) {
    heroBg.style.transform = `translate3d(0, ${currentScroll * 0.4}px, 0)`;
  }

  // Über uns parallax
  if (ueberParallax) {
    const wrap = ueberParallax.closest('.ueber-img-wrap');
    if (wrap) {
      const rect = wrap.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom >= 0 && rect.top <= viewH) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const offset = (progress - 0.5) * 80;
        ueberParallax.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    }
  }

  // Galerie parallax
  galerieImgs.forEach(img => {
    const rect = img.getBoundingClientRect();
    const viewH = window.innerHeight;
    if (rect.bottom >= 0 && rect.top <= viewH) {
      const speed = parseFloat(img.dataset.parallax) || 0.1;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const offset = (progress - 0.5) * speed * 120;
      img.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
    }
  });

  rafId = requestAnimationFrame(tick);
}

// Start loop
rafId = requestAnimationFrame(tick);

// =============================================
//  SCROLL REVEAL (allgemein)
// =============================================
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => observer.observe(el));

// =============================================
//  MENÜ-KARTEN FALL-ANIMATION
// =============================================
const menuCards = document.querySelectorAll('.menu-card');

const cardObserver = new IntersectionObserver((entries) => {
  // Trigger all cards at once when the grid comes into view
  const anyVisible = entries.some(e => e.isIntersecting);
  if (anyVisible) {
    menuCards.forEach(card => card.classList.add('card-visible'));
    cardObserver.disconnect();
  }
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
});

// Observe the first card as trigger
if (menuCards.length > 0) {
  cardObserver.observe(menuCards[0]);
}
