import { useEffect, useRef } from 'react';
import { ArrowUpRight, ShieldCheck, ScanLine } from 'lucide-react';

export function HeroPortrait() {
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;

    function reset() {
      if (!scene) return;
      cancelAnimationFrame(frame);
      scene.style.setProperty('--portrait-rx', '0deg');
      scene.style.setProperty('--portrait-ry', '0deg');
      scene.style.setProperty('--portrait-light-x', '50%');
      scene.style.setProperty('--portrait-light-y', '35%');
    }

    function move(event: PointerEvent) {
      if (!scene || motion.matches || !finePointer.matches) return;
      const bounds = scene.getBoundingClientRect();
      const x = Math.min(
        1,
        Math.max(0, (event.clientX - bounds.left) / bounds.width),
      );
      const y = Math.min(
        1,
        Math.max(0, (event.clientY - bounds.top) / bounds.height),
      );
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        scene.style.setProperty('--portrait-rx', `${(0.5 - y) * 5}deg`);
        scene.style.setProperty('--portrait-ry', `${(x - 0.5) * 7}deg`);
        scene.style.setProperty('--portrait-light-x', `${x * 100}%`);
        scene.style.setProperty('--portrait-light-y', `${y * 100}%`);
      });
    }

    const observer = new IntersectionObserver(([entry]) => {
      scene.classList.toggle('portrait-out-of-view', !entry.isIntersecting);
      if (!entry.isIntersecting) reset();
    });
    observer.observe(scene);
    scene.addEventListener('pointermove', move);
    scene.addEventListener('pointerleave', reset);
    motion.addEventListener('change', reset);
    finePointer.addEventListener('change', reset);
    return () => {
      observer.disconnect();
      scene.removeEventListener('pointermove', move);
      scene.removeEventListener('pointerleave', reset);
      motion.removeEventListener('change', reset);
      finePointer.removeEventListener('change', reset);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <figure className="portrait-scene" ref={sceneRef}>
      <div className="portrait-overline" aria-hidden="true">
        <span>THE PERSON BEHIND THE PROCESS</span>
        <span>AA / 01</span>
      </div>
      <div className="portrait-stage">
        <div className="portrait-card">
          <div className="portrait-grid" aria-hidden="true" />
          <div className="portrait-orbit" aria-hidden="true" />
          <div className="portrait-ring" aria-hidden="true" />
          <div className="portrait-light" aria-hidden="true" />
          <span
            className="portrait-crosshair portrait-crosshair-tl"
            aria-hidden="true"
          />
          <span
            className="portrait-crosshair portrait-crosshair-br"
            aria-hidden="true"
          />
          <picture className="portrait-picture">
            <source
              type="image/webp"
              srcSet="./images/abdelrahman-portrait-480.webp 480w, ./images/abdelrahman-portrait-960.webp 960w"
              sizes="(max-width: 760px) calc(100vw - 36px), (max-width: 1100px) 44vw, 520px"
            />
            <img
              src="./images/abdelrahman-portrait-960.webp"
              width="960"
              height="1280"
              alt="Abdelrahman Ashraf wearing a navy coat and dark turtleneck"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <span className="portrait-chip portrait-chip-web" aria-hidden="true">
            <ScanLine size={14} /> Web + network
          </span>
          <span
            className="portrait-chip portrait-chip-evidence"
            aria-hidden="true"
          >
            <ShieldCheck size={14} /> Evidence first
          </span>
          <div className="portrait-caption">
            <div>
              <span className="portrait-caption-label">
                CURIOUS MIND. SECURITY FOCUS.
              </span>
              <strong>
                Abdelrahman Ashraf<span>.</span>
              </strong>
              <span className="portrait-caption-role">
                Penetration Tester & Vulnerability Analyst
              </span>
            </div>
            <a
              href="#about"
              className="portrait-about"
              aria-label="More about Abdelrahman Ashraf"
            >
              <ArrowUpRight size={21} />
            </a>
          </div>
        </div>
      </div>
      <figcaption className="portrait-footnote">
        <span>
          <i aria-hidden="true" /> Open to opportunities
        </span>
        <span>Build. Test. Understand.</span>
      </figcaption>
    </figure>
  );
}
