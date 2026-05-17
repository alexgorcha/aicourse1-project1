const revealItems = document.querySelectorAll(".reveal");
const heroImage = document.querySelector(".hero-media img");
const finalImage = document.querySelector(".final-cta-media img");
const modal = document.querySelector("#cta-modal");
const modalTitle = document.querySelector("#cta-modal-title");
const modalCopy = document.querySelector("#cta-modal-copy");
const modalTriggers = document.querySelectorAll("[data-modal-title]");

if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("reveal-ready");

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
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!modal || !modalTitle || !modalCopy) {
      return;
    }

    modalTitle.textContent = trigger.dataset.modalTitle;
    modalCopy.textContent = trigger.dataset.modalCopy;
    modal.showModal();
  });
});

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
