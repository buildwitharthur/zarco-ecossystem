// Entrada de seção: revela uma única vez, quando o elemento aparece (foundations §9).
const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -8% 0px' },
);

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
