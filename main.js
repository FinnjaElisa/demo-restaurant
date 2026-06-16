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
//  HERO PARALLAX
// =============================================
const heroBg = document.getElementById('heroBg');
function heroParallax() {
  if (!heroBg) return;
  const scrolled = window.scrollY;
  // Move background upward at 40% of scroll speed for depth
  heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
}
window.addEventListener('scroll', heroParallax, { passive: true });

// =============================================
//  ÜBER UNS PARALLAX
// =============================================
const ueberParallax = document.getElementById('ueberParallax');
function ueberParallaxFn() {
  if (!ueberParallax) return;
  const rect = ueberParallax.closest('.ueber-img-wrap').getBoundingClientRect();
  const viewH = window.innerHeight;
  // Only animate when section is in view
  if (rect.bottom < 0 || rect.top > viewH) return;
  const progress = (viewH - rect.top) / (viewH + rect.height);
  const offset = (progress - 0.5) * 80;
  ueberParallax.style.transform = `translateY(${offset}px)`;
}
window.addEventListener('scroll', ueberParallaxFn, { passive: true });
ueberParallaxFn();

// =============================================
//  GALERIE IMAGE PARALLAX
// =============================================
const galerieImgs = document.querySelectorAll('.galerie-item img[data-parallax]');
function galerieParallax() {
  galerieImgs.forEach(img => {
    const rect = img.getBoundingClientRect();
    const viewH = window.innerHeight;
    if (rect.bottom < 0 || rect.top > viewH) return;
    const speed = parseFloat(img.dataset.parallax) || 0.1;
    const progress = (viewH - rect.top) / (viewH + rect.height);
    const offset = (progress - 0.5) * speed * 120;
    img.style.transform = `translateY(${offset}px) scale(1.12)`;
  });
}
window.addEventListener('scroll', galerieParallax, { passive: true });
galerieParallax();

// =============================================
//  SCROLL REVEAL
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
