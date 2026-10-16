import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Check, Fingerprint } from 'lucide-react';

const phases = [
  {
    name: 'Discover',
    title: 'Start with the right questions.',
    text: 'Understand the scope. Map applications, hosts, and services. Follow the details worth investigating.',
    note: '01 / ATTACK SURFACE',
  },
  {
    name: 'Validate',
    title: 'A finding needs proof.',
    text: 'Investigate the signal, reproduce the behavior, and understand its impact before calling it a vulnerability.',
    note: '02 / REPRODUCIBLE EVIDENCE',
  },
  {
    name: 'Report',
    title: 'Make the next step clear.',
    text: 'Connect technical evidence to practical risk. Document what happened, why it matters, and how to fix it.',
    note: '03 / ACTIONABLE REMEDIATION',
  },
];

export function EvidenceDesk() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % phases.length;
    else if (event.key === 'ArrowLeft')
      next = (index + phases.length - 1) % phases.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = phases.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <div className="hero-panel">
      <div className="desk-margin" aria-hidden="true">
        <span>TRACE // 01</span>
        <span>THE ASSESSMENT PROCESS</span>
      </div>
      <div className="evidence-desk" data-phase={active}>
        <div className="casefile-header">
          <span>
            <Fingerprint size={16} /> EVIDENCE WORKSPACE
          </span>
          <span className="casefile-status">
            IN SCOPE <Check size={12} />
          </span>
        </div>
        <div className="evidence-map">
          <span className="map-annotation">
            A signal is only the beginning.
          </span>
          <svg
            viewBox="0 0 468 232"
            aria-label="Illustrative assessment map: agreed scope branches into web applications and networks, then converges on documented evidence."
          >
            <path
              className="evidence-wire"
              d="M120 116 C145 116 150 58 176 58 M120 116 C145 116 150 174 176 174 M292 58 C322 58 322 116 348 116 M292 174 C322 174 322 116 348 116"
            />
            <g className="map-node map-scope">
              <rect x="24" y="87" width="96" height="58" rx="2" />
              <text x="72" y="111" className="map-node-label">
                SCOPE
              </text>
              <text x="72" y="129" className="map-node-sub">
                ask + understand
              </text>
            </g>
            <g className="map-node map-web">
              <rect x="176" y="30" width="116" height="56" rx="2" />
              <text x="234" y="54" className="map-node-label">
                WEB APP
              </text>
              <text x="234" y="72" className="map-node-sub">
                requests + behavior
              </text>
            </g>
            <g className="map-node map-network">
              <rect x="176" y="146" width="116" height="56" rx="2" />
              <text x="234" y="170" className="map-node-label">
                NETWORK
              </text>
              <text x="234" y="188" className="map-node-sub">
                hosts + services
              </text>
            </g>
            <g className="map-node map-evidence">
              <rect x="348" y="87" width="96" height="58" rx="2" />
              <text x="396" y="111" className="map-node-label">
                EVIDENCE
              </text>
              <text x="396" y="129" className="map-node-sub">
                verify + document
              </text>
            </g>
            <circle className="map-junction" cx="144" cy="116" r="3" />
            <circle className="map-junction" cx="324" cy="116" r="3" />
          </svg>
          <span className="map-key">
            ILLUSTRATIVE PROCESS / AUTHORIZED ENVIRONMENTS
          </span>
        </div>
        <div
          className="casefile-tabs"
          role="tablist"
          aria-label="Explore the assessment process"
        >
          {phases.map((phase, index) => (
            <button
              key={phase.name}
              type="button"
              role="tab"
              id={`process-tab-${index}`}
              aria-selected={active === index}
              aria-controls="process-panel"
              tabIndex={active === index ? 0 : -1}
              ref={(element) => {
                tabsRef.current[index] = element;
              }}
              onClick={() => setActive(index)}
              onKeyDown={(event) => navigate(event, index)}
            >
              <span>0{index + 1}</span> {phase.name}
            </button>
          ))}
        </div>
        <div
          className="casefile-notes"
          id="process-panel"
          role="tabpanel"
          aria-labelledby={`process-tab-${active}`}
          tabIndex={0}
        >
          <span className="note-index">{phases[active].note}</span>
          <h3>{phases[active].title}</h3>
          <p>{phases[active].text}</p>
        </div>
        <div className="casefile-footer">
          <span>RESEARCH → EVIDENCE → REMEDIATION</span>
          <a href="#methodology">
            My methodology <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="desk-caption">
        <span className="desk-handnote">
          Choose a phase. Follow the process.
        </span>
        <span>EXPLORE ↑</span>
      </div>
    </div>
  );
}
