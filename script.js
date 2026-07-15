const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const progress = document.querySelector('.scroll-progress span');
const header = document.querySelector('.site-header');
const parallaxItems = document.querySelectorAll('[data-parallax]');

function animatePage() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  header.classList.toggle('is-stuck', window.scrollY > 40);

  parallaxItems.forEach((element) => {
    const speed = Number(element.dataset.parallax);
    const offset = (window.innerHeight / 2 - element.getBoundingClientRect().top) * speed;
    element.style.setProperty('--parallax-y', `${Math.max(-20, Math.min(20, offset))}px`);
  });
}

animatePage();
window.addEventListener('scroll', animatePage, { passive: true });
window.addEventListener('resize', animatePage);

// Hero device: subtle 3D tilt following the cursor (desktop only)
const heroVisual = document.querySelector('.hero-visual');
const hero = document.querySelector('.hero');
if (hero && heroVisual && window.matchMedia('(pointer: fine)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroVisual.style.setProperty('--tilt-x', `${x * 7}deg`);
    heroVisual.style.setProperty('--tilt-y', `${-y * 6}deg`);
  });
  hero.addEventListener('mouseleave', () => {
    heroVisual.style.setProperty('--tilt-x', '0deg');
    heroVisual.style.setProperty('--tilt-y', '0deg');
  });
}
