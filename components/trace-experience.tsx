import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, RotateCcw, ScanLine } from 'lucide-react';
import { EvidenceDesk } from '@/components/evidence-desk';

const INTRO_KEY = 'aa-trace-intro-v1';
type TraceStage = 'intro' | 'investigating' | 'connecting' | 'portfolio';

function initialStage(): TraceStage {
  if (typeof window === 'undefined') return 'intro';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return 'portfolio';
  if (window.location.hash && window.location.hash !== '#home')
    return 'portfolio';
  try {
    return window.localStorage.getItem(INTRO_KEY) === 'seen'
      ? 'portfolio'
      : 'intro';
  } catch {
    return 'intro';
  }
}

export function TraceExperience() {
  const [stage, setStage] = useState<TraceStage>(initialStage);
  const [motionReduced, setMotionReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const shouldRestoreFocus = useRef(false);
  const shouldFocusStart = useRef(false);

  useEffect(() => {
    if (stage !== 'intro') return;
    try {
      window.localStorage.setItem(INTRO_KEY, 'seen');
    } catch {
      // Only this visual preference is stored; storage is optional.
    }
  }, [stage]);

  const finish = useCallback(() => {
    shouldRestoreFocus.current =
      shouldRestoreFocus.current ||
      !!rootRef.current?.contains(document.activeElement);
    try {
      window.localStorage.setItem(INTRO_KEY, 'seen');
    } catch {
      // The experience also works when browser storage is unavailable.
    }
    setStage('portfolio');
  }, []);

  useEffect(() => {
    if (stage === 'connecting') {
      const timer = window.setTimeout(finish, 900);
      return () => window.clearTimeout(timer);
    }
  }, [stage, finish]);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    function motionChanged() {
      setMotionReduced(motion.matches);
      if (motion.matches) finish();
    }
    function hashChanged() {
      if (window.location.hash && window.location.hash !== '#home') finish();
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape' && stage !== 'portfolio') finish();
    }
    function focusMoved(event: FocusEvent) {
      if (
        event.target instanceof Node &&
        event.target !== document.body &&
        !rootRef.current?.contains(event.target)
      ) {
        shouldRestoreFocus.current = false;
      }
    }
    motion.addEventListener('change', motionChanged);
    window.addEventListener('hashchange', hashChanged);
    window.addEventListener('keydown', escape);
    document.addEventListener('focusin', focusMoved);
    return () => {
      motion.removeEventListener('change', motionChanged);
      window.removeEventListener('hashchange', hashChanged);
      window.removeEventListener('keydown', escape);
      document.removeEventListener('focusin', focusMoved);
    };
  }, [stage, finish]);

  useEffect(() => {
    if (stage === 'portfolio' && shouldRestoreFocus.current) {
      rootRef.current
        ?.querySelector<HTMLButtonElement>('#process-tab-0')
        ?.focus({ preventScroll: true });
      shouldRestoreFocus.current = false;
    }
    if (
      (stage === 'intro' || stage === 'investigating') &&
      shouldFocusStart.current
    ) {
      rootRef.current
        ?.querySelector<HTMLButtonElement>('[data-trace-start]')
        ?.focus({ preventScroll: true });
      shouldFocusStart.current = false;
    }
  }, [stage]);

  function replay() {
    // A reduced-motion visitor can still read and operate the untimed scene.
    shouldFocusStart.current = true;
    setStage(motionReduced ? 'investigating' : 'intro');
  }

  function start() {
    if (stage === 'investigating') {
      if (motionReduced) {
        finish();
        return;
      }
      shouldRestoreFocus.current = !!rootRef.current?.contains(
        document.activeElement,
      );
      setStage('connecting');
      return;
    }
    if (motionReduced) {
      finish();
      return;
    }
    setStage('investigating');
  }

  const revealed = stage === 'investigating' || stage === 'connecting';

  return (
    <div className="trace-experience" ref={rootRef} data-trace-stage={stage}>
      {stage === 'portfolio' ? (
        <div className="trace-portfolio-reveal">
          <EvidenceDesk />
          <button type="button" className="trace-replay" onClick={replay}>
            <RotateCcw size={12} /> Replay TRACE introduction
          </button>
        </div>
      ) : (
        <section
          className="trace-intro"
          aria-label="TRACE interactive introduction"
        >
          <div className="trace-masthead">
            <span className="trace-wordmark">
              <ScanLine size={16} /> TRACE
            </span>
            <button className="trace-skip" type="button" onClick={finish}>
              Skip intro <ArrowRight size={13} />
            </button>
          </div>
          <div className="trace-opening">
            <span className="trace-index">01 / LOOK A LITTLE CLOSER</span>
            <h3>
              Small details.
              <br />
              <span>Real impact.</span>
            </h3>
            <p>
              A response is only part of the story.
              <br />
              The next question is where the work begins.
            </p>
          </div>
          <div className="trace-scene" data-revealed={revealed}>
            <div className="trace-sample-label">
              <span>HTTP EXCHANGE</span>
              <span>ILLUSTRATIVE EXAMPLE</span>
            </div>
            <div className="trace-exchange">
              <code className="trace-request-line">
                <b>GET</b> /account/<span className="trace-resource">1042</span>{' '}
                HTTP/1.1
              </code>
              <code className="trace-host-line">Host: example.test</code>
              <span className="trace-exchange-rule" aria-hidden="true" />
              <code className="trace-response-line">
                HTTP/1.1 <span>200 OK</span>
              </code>
            </div>
            <ol className="trace-questions" aria-hidden={!revealed}>
              <li>
                <span>01</span>
                <strong>Who made the request?</strong>
                <i aria-hidden="true" />
              </li>
              <li>
                <span>02</span>
                <strong>Which resource is it?</strong>
                <i aria-hidden="true" />
              </li>
              <li>
                <span>03</span>
                <strong>What does this prove?</strong>
                <i aria-hidden="true" />
              </li>
            </ol>
            <div
              className="trace-connections"
              aria-hidden={stage !== 'connecting' && !motionReduced}
            >
              {['Observe', 'Validate', 'Document'].map((label, index) => (
                <span key={label}>
                  <small>0{index + 1}</small>
                  {label}
                  {index < 2 && <ArrowRight size={13} aria-hidden="true" />}
                </span>
              ))}
            </div>
          </div>
          <div className="trace-intro-actions">
            <button
              data-trace-start
              className="trace-start"
              type="button"
              onClick={start}
              disabled={stage === 'connecting'}
            >
              {stage === 'intro'
                ? 'Look closer'
                : stage === 'investigating'
                  ? 'Follow the evidence'
                  : 'Opening the workspace'}
              <ArrowUpRight size={16} />
            </button>
            <span>Curiosity → evidence → clarity</span>
          </div>
          <output className="trace-live-status" aria-live="polite">
            {stage === 'investigating'
              ? 'Who made the request? Which resource is it? What does this prove? Continue when you are ready.'
              : stage === 'connecting'
                ? 'Observe, validate, and document. Opening the assessment workspace.'
                : ''}
          </output>
        </section>
      )}
    </div>
  );
}
