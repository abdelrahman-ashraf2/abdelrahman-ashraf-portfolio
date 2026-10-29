import { useEffect, useRef, useState } from 'react';

const chapters = [
  { id: 'home', label: 'Home', title: 'Arrival' },
  { id: 'about', label: 'About', title: 'Behind the terminal' },
  { id: 'projects', label: 'Projects', title: 'Inspect the work' },
  { id: 'writeups', label: 'Writeups', title: 'Follow the reasoning' },
  { id: 'toolkit', label: 'Toolkit', title: 'Inside the toolkit' },
  { id: 'journey', label: 'Journey', title: 'Keep learning' },
  { id: 'contact', label: 'Contact', title: 'Open a conversation' },
] as const;

type ChapterId = (typeof chapters)[number]['id'];
const routes = {
  straight: 'M0,75H1000',
  elbow: 'M0,75H340L390,30H610L660,75H1000',
  bracket: 'M0,75H280V25H720V75H1000',
};
const routeSequence = ['elbow', 'straight', 'bracket'] as const;
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const number = (index: number) => String(index).padStart(2, '0');

export function TraceSectionBridge({ to }: { to: Exclude<ChapterId, 'home'> }) {
  const index = chapters.findIndex((chapter) => chapter.id === to);
  const next = chapters[index];
  const previous = chapters[index - 1];
  const route = routeSequence[(index - 1) % routeSequence.length];

  return (
    <div
      className="trace-section-bridge"
      data-route={route}
      data-next={to}
      aria-hidden="true"
    >
      <span className="trace-bridge-from">
        {number(index - 1)} / {previous.label.toUpperCase()}
      </span>
      <svg viewBox="0 0 1000 100" preserveAspectRatio="none" focusable="false">
        <path className="trace-route-base" d={routes[route]} />
        <path className="trace-route-active" d={routes[route]} pathLength="1" />
        <g className="trace-route-cursor" transform="translate(1000,75)">
          <circle r="4" />
          <circle r="10" />
        </g>
      </svg>
      <div className="trace-bridge-label">
        <small>TRACE / {number(index)}</small>
        <strong>{next.title}</strong>
      </div>
      <span className="trace-bridge-arrival">
        {next.label.toUpperCase()} / {number(index)}
      </span>
    </div>
  );
}

/** Native scrolling drives one drawing loop; no pinned or transformed sections. */
export function TraceJourney() {
  const [active, setActive] = useState<ChapterId>('home');
  const rail = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = document.getElementById('main');
    if (!main) return;
    const root = document.documentElement;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sections = chapters.flatMap((chapter) => {
      const element = main.querySelector<HTMLElement>(`#${chapter.id}`);
      return element ? [{ ...chapter, element, top: 0 }] : [];
    });
    const cards = Array.from(
      main.querySelectorAll<HTMLElement>(
        '.case-card, .tool-group, .timeline-item, .writeup-card',
      ),
    );
    const bridges = Array.from(
      main.querySelectorAll<HTMLElement>('.trace-section-bridge'),
    ).flatMap((element) => {
      const path = element.querySelector<SVGPathElement>('.trace-route-active');
      const cursor = element.querySelector<SVGGElement>('.trace-route-cursor');
      return path && cursor
        ? [
            {
              element,
              path,
              cursor,
              length: path.getTotalLength(),
              top: 0,
              height: 0,
              progress: -1,
            },
          ]
        : [];
    });
    const observed = new Map<Element, HTMLElement>();
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let needsMeasure = true;
    let disposed = false;
    let viewport = window.innerHeight;
    let pageHeight = 0;
    let current: ChapterId = 'home';
    let previousPageProgress = -1;

    const reveal = (element: HTMLElement) => {
      element.dataset.traceVisible = 'true';
    };

    sections.forEach(({ element }) => element.classList.add('trace-chapter'));
    cards.forEach((element) => {
      element.classList.add('trace-entry');
      const siblings = element.parentElement?.children;
      const index = siblings
        ? Array.prototype.indexOf.call(siblings, element)
        : 0;
      element.style.setProperty('--trace-order', String(index % 4));
    });

    const update = () => {
      frame = 0;
      const scroll = window.scrollY;
      if (needsMeasure) {
        viewport = window.innerHeight;
        pageHeight = root.scrollHeight - viewport;
        sections.forEach((section) => {
          section.top = section.element.getBoundingClientRect().top + scroll;
        });
        bridges.forEach((bridge) => {
          const bounds = bridge.element.getBoundingClientRect();
          bridge.top = bounds.top + scroll;
          bridge.height = bounds.height;
        });
        needsMeasure = false;
      }

      let next: ChapterId = 'home';
      sections.forEach((section) => {
        if (section.top <= scroll + viewport * 0.3) next = section.id;
      });
      if (pageHeight > 0 && scroll >= pageHeight - 2) next = 'contact';
      if (next !== current) {
        current = next;
        setActive(next);
      }

      const progress = pageHeight > 0 ? clamp(scroll / pageHeight) : 0;
      if (progress !== previousPageProgress) {
        rail.current?.style.setProperty(
          '--trace-page-progress',
          progress.toFixed(4),
        );
        previousPageProgress = progress;
      }
      if (preference.matches) return;

      bridges.forEach((bridge) => {
        const top = bridge.top - scroll;
        const progress = clamp(
          (viewport * 0.82 - top) / (viewport * 0.45 + bridge.height),
        );
        if (Math.abs(bridge.progress - progress) < 0.001) return;
        bridge.progress = progress;
        bridge.element.style.setProperty(
          '--trace-progress',
          progress.toFixed(4),
        );
        const point = bridge.path.getPointAtLength(progress * bridge.length);
        bridge.cursor.setAttribute(
          'transform',
          `translate(${point.x},${point.y})`,
        );
      });
    };

    const schedule = () => {
      if (!frame && !disposed) frame = window.requestAnimationFrame(update);
    };
    const measure = () => {
      needsMeasure = true;
      schedule();
    };
    const configureMotion = () => {
      observer?.disconnect();
      observed.clear();
      root.classList.remove('trace-motion-ready');
      if (preference.matches || !('IntersectionObserver' in window)) {
        sections.forEach(({ element }) => reveal(element));
        cards.forEach(reveal);
      } else {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const target = observed.get(entry.target);
              if (target) reveal(target);
              observer?.unobserve(entry.target);
            });
          },
          { rootMargin: '0px 0px -8% 0px', threshold: 0 },
        );
        const observe = (target: HTMLElement, trigger: Element) => {
          if (target.dataset.traceVisible === 'true') return;
          if (
            trigger.getBoundingClientRect().top <=
            window.innerHeight * 0.92
          ) {
            reveal(target);
          } else {
            observed.set(trigger, target);
            observer?.observe(trigger);
          }
        };
        sections.forEach(({ element }) => {
          const heading = element.querySelector('.section-heading');
          if (heading) observe(element, heading);
          else reveal(element);
        });
        cards.forEach((element) => observe(element, element));
        root.classList.add('trace-motion-ready');
      }
      bridges.forEach((bridge) => {
        bridge.progress = -1;
      });
      measure();
    };
    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const entry = event.target.closest<HTMLElement>('.trace-entry');
      const chapter = event.target.closest<HTMLElement>('.trace-chapter');
      if (entry) reveal(entry);
      if (chapter) reveal(chapter);
    };

    configureMotion();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('hashchange', measure);
    main.addEventListener('focusin', revealFocused);
    preference.addEventListener('change', configureMotion);
    const resizeObserver =
      'ResizeObserver' in window ? new ResizeObserver(measure) : undefined;
    resizeObserver?.observe(main);
    void document.fonts.ready.then(() => {
      if (!disposed) measure();
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      window.removeEventListener('hashchange', measure);
      main.removeEventListener('focusin', revealFocused);
      preference.removeEventListener('change', configureMotion);
      observer?.disconnect();
      resizeObserver?.disconnect();
      root.classList.remove('trace-motion-ready');
      sections.forEach(({ element }) => {
        element.classList.remove('trace-chapter');
        delete element.dataset.traceVisible;
      });
      cards.forEach((element) => {
        element.classList.remove('trace-entry');
        element.style.removeProperty('--trace-order');
        delete element.dataset.traceVisible;
      });
    };
  }, []);

  return (
    <nav className="trace-chapter-rail" aria-label="Page chapters" ref={rail}>
      <span className="trace-rail-caption" aria-hidden="true">
        TRACE
      </span>
      <span className="trace-rail-track" aria-hidden="true">
        <i />
      </span>
      <ol>
        {chapters.map((chapter, index) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              aria-label={`${number(index)} — ${chapter.label}`}
              aria-current={active === chapter.id ? 'location' : undefined}
            >
              <span className="trace-rail-number" aria-hidden="true">
                {number(index)}
              </span>
              <span className="trace-rail-tooltip" aria-hidden="true">
                {chapter.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
