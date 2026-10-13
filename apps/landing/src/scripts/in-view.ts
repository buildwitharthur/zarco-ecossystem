// Observa a visibilidade de um elemento. Usado pelos scripts de cada componente
// para só animar o que está na tela (patterns.md §3).
export function onView(
  el: Element,
  enter?: (entry: IntersectionObserverEntry) => void,
  leave?: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit,
): void {
  new IntersectionObserver(([entry]) => {
    if (!entry) return;
    if (entry.isIntersecting) enter?.(entry);
    else leave?.(entry);
  }, options).observe(el);
}

export const prefersReducedMotion = (): boolean =>
  matchMedia('(prefers-reduced-motion: reduce)').matches;
