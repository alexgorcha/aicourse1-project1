const revealItems = document.querySelectorAll(".reveal");
const heroImage = document.querySelector(".hero-media img");
const finalImage = document.querySelector(".final-cta-media img");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

let ticking = false;

function updateDepth() {
  const scrollY = window.scrollY;

  if (heroImage) {
    heroImage.style.transform = `scale(1.03) translateY(${scrollY * 0.12}px)`;
  }

  if (finalImage) {
    const rect = finalImage.parentElement.getBoundingClientRect();
    const offset = Math.max(-80, Math.min(80, rect.top * -0.08));
    finalImage.style.transform = `scale(1.04) translateY(${offset}px)`;
  }

  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateDepth);
      ticking = true;
    }
  },
  { passive: true },
);

updateDepth();
