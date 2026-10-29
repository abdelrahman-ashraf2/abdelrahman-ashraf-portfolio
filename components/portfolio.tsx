import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Download,
  GitBranch,
  Link2,
  Mail,
  Menu,
  Shield,
  Terminal,
  X,
} from 'lucide-react';
import { TraceJourney, TraceSectionBridge } from '@/components/trace-journey';
import {
  learningJourney,
  profile,
  selectedWork,
  toolkit,
  writeups,
} from '@/lib/identity-data';

const navigation = [
  ['about', 'About'],
  ['projects', 'Projects'],
  ['writeups', 'Writeups'],
  ['toolkit', 'Toolkit'],
  ['journey', 'Journey'],
  ['contact', 'Contact'],
] as const;

function Heading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="section-heading">
      <p className="eyebrow">
        <span>{number}</span> / {label}
      </p>
      <h2>{title}</h2>
      {description && <p className="section-intro">{description}</p>}
    </header>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const wider = window.matchMedia('(min-width: 761px)');
    const resize = () => {
      if (wider.matches) setOpen(false);
    };
    document.addEventListener('keydown', escape);
    wider.addEventListener('change', resize);
    return () => {
      document.removeEventListener('keydown', escape);
      wider.removeEventListener('change', resize);
    };
  }, [open]);
  return (
    <header className="identity-header">
      <div className="identity-wrap">
        <a
          className="identity-mark"
          href="#home"
          onClick={() => setOpen(false)}
          aria-label="Abdelrahman Ashraf, home"
        >
          AA<span>/ security</span>
        </a>
        <button
          className="identity-menu"
          type="button"
          ref={toggle}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="identity-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav
          id="identity-navigation"
          className={`identity-nav${open ? ' is-open' : ''}`}
          aria-label="Main navigation"
        >
          {navigation.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href={profile.cv} download className="nav-cv">
            CV <Download size={13} />
          </a>
        </nav>
      </div>
    </header>
  );
}

function LabConsole() {
  const [tab, setTab] = useState(0);
  const tabs = ['profile.json', 'crypto_lab.py', 'workflow.md'];
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft')
      next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    setTab(next);
    buttons.current[next]?.focus();
  };
  return (
    <div className="hero-console">
      <div className="console-top">
        <div aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>~/abdelrahman / lab-notes</span>
        <Terminal size={14} />
      </div>
      <div
        className="console-tabs"
        role="tablist"
        aria-label="Explore my lab notes"
      >
        {tabs.map((label, index) => (
          <button
            key={label}
            id={`console-tab-${index}`}
            role="tab"
            type="button"
            aria-selected={tab === index}
            aria-controls="console-panel"
            tabIndex={tab === index ? 0 : -1}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            onKeyDown={(event) => navigate(event, index)}
            onClick={() => setTab(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        className="console-body"
        role="tabpanel"
        tabIndex={0}
        id="console-panel"
        aria-labelledby={`console-tab-${tab}`}
      >
        <p className="console-prompt">
          <span>$</span>{' '}
          <code>
            {
              [
                'cat profile.json',
                'open applied-cryptography-lab',
                'cat workflow.md',
              ][tab]
            }
          </code>
        </p>
        <div className="console-content">
          {tab === 0 && (
            <div className="console-profile">
              <span className="console-brace">{'{'}</span>
              <dl>
                <div>
                  <dt>name</dt>
                  <dd>Abdelrahman Ashraf</dd>
                </div>
                <div>
                  <dt>focus</dt>
                  <dd>Web & network security</dd>
                </div>
                <div>
                  <dt>track</dt>
                  <dd>VAPT trainee @ DEPI</dd>
                </div>
                <div>
                  <dt>build</dt>
                  <dd>Python security projects</dd>
                </div>
                <div>
                  <dt>approach</dt>
                  <dd>Understand. Test. Document.</dd>
                </div>
              </dl>
              <span className="console-brace">{'}'}</span>
            </div>
          )}
          {tab === 1 && (
            <div className="console-project">
              <p className="console-comment">
                # From information-security coursework
              </p>
              <ul>
                <li>
                  <Check size={13} /> Feistel encryption rounds
                </li>
                <li>
                  <Check size={13} /> Diffie–Hellman & MITM
                </li>
                <li>
                  <Check size={13} /> AES modes · bring your own image
                </li>
                <li>
                  <Check size={13} /> DSA signatures & tampering
                </li>
              </ul>
              <a
                href={selectedWork[0].repository!}
                target="_blank"
                rel="noreferrer"
              >
                Read the source <ArrowUpRight size={13} />
              </a>
            </div>
          )}
          {tab === 2 && (
            <div className="console-workflow">
              <p>
                <span>01</span> Understand the system and the scope.
              </p>
              <p>
                <span>02</span> Test a specific assumption.
              </p>
              <p>
                <span>03</span> Validate and reproduce the behavior.
              </p>
              <p>
                <span>04</span> Document the evidence and the fix.
              </p>
              <p className="console-comment">
                # Practice stays inside authorized labs.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="console-footer">
        <span>
          <i /> PERSONAL LAB / READ-ONLY PREVIEW
        </span>
        <span>SELECT A FILE ↑</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="identity-hero identity-wrap">
      <div className="hero-intro">
        <p className="eyebrow">
          <span className="status-dot" /> CYBERSECURITY / PERSONAL LAB
        </p>
        <h1>
          <span>Abdelrahman</span>
          <span>
            Ashraf
            <span className="name-cursor" aria-hidden="true">
              _
            </span>
          </span>
        </h1>
        <p className="hero-role">
          Penetration testing.
          <br />
          <span>Python security projects.</span>
        </p>
        <p className="hero-summary">
          Cybersecurity student and VAPT trainee. I work through web and network
          labs, build Python security projects, and document what I can
          reproduce.
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="#projects">
            Explore my work <ArrowDown size={16} />
          </a>
          <a className="secondary-action" href={profile.cv} download>
            <Download size={15} /> Download CV
          </a>
        </div>
        <div className="hero-facts">
          <span>
            <Shield size={13} /> VAPT trainee · DEPI
          </span>
          <span>
            <Code2 size={13} /> Cyber Security & Data Analysis
          </span>
        </div>
      </div>
      <LabConsole />
      <p className="hero-bottom">
        <span>CURIOUS BY NATURE. METHODICAL IN PRACTICE.</span>
        <a href="#about">
          Inside the lab <ArrowDown size={13} />
        </a>
      </p>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="identity-section identity-wrap">
      <Heading
        number="01"
        label="THE PERSON BEHIND THE LAB"
        title="My work starts with understanding."
      />
      <div className="about-layout">
        <p className="about-lead">
          I’m Abdelrahman—a cybersecurity student building a practical
          foundation in offensive security.
        </p>
        <div className="about-detail">
          <p>
            I study Cyber Security and Data Analysis at Menoufia University.
            Alongside my degree, I train in vulnerability analysis and
            penetration testing through DEPI and Instant.
          </p>
          <p>
            My SOC internship gave me experience investigating alerts and
            endpoint activity. Now I’m bringing that perspective to web and
            network testing, Python projects, and clear technical notes.
          </p>
          <p className="education-line">
            <span>EDUCATION</span>B.Eng. · Faculty of Electronic Engineering
            <br />
            Menoufia University · 2023–2028
          </p>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <section id="projects" className="identity-section identity-wrap">
      <Heading
        number="02"
        label="SELECTED WORK"
        title="Code. Labs. Evidence."
        description="A project you can run, and the practical training behind my testing workflow."
      />
      <div className="case-list">
        {selectedWork.map((project, index) => (
          <article
            className={`case-card${index === 0 ? ' case-featured' : ''}`}
            key={project.id}
          >
            <span className="case-index" aria-hidden="true">
              {project.number}
            </span>
            <div className="case-content">
              <p className="case-meta">
                <span>{project.category}</span>
                {index === 0 && (
                  <span className="code-available">SOURCE AVAILABLE</span>
                )}
              </p>
              <div className="case-title-row">
                <h3>{project.title}</h3>
                {index === 0 ? <Code2 size={22} /> : <Shield size={22} />}
              </div>
              <p className="case-description">{project.description}</p>
              <div className="case-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="case-links">
                {project.repository && (
                  <a href={project.repository} target="_blank" rel="noreferrer">
                    <GitBranch size={15} /> View repository{' '}
                    <ArrowUpRight size={13} />
                  </a>
                )}
                <button
                  className="case-toggle"
                  type="button"
                  aria-expanded={expanded === project.id}
                  aria-controls={`details-${project.id}`}
                  onClick={() =>
                    setExpanded(expanded === project.id ? null : project.id)
                  }
                >
                  {expanded === project.id
                    ? 'Close notes'
                    : 'Read project notes'}
                  <ChevronDown size={14} />
                </button>
              </div>
              <div
                className="project-details"
                id={`details-${project.id}`}
                hidden={expanded !== project.id}
              >
                <dl>
                  {project.details.map(([title, copy]) => (
                    <div key={title}>
                      <dt>{title}</dt>
                      <dd>{copy}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="timeline-note">
        Testing practice is limited to authorized, intentionally vulnerable
        environments.
      </p>
    </section>
  );
}

function Writeups() {
  return (
    <section id="writeups" className="identity-section identity-wrap">
      <Heading
        number="03"
        label="FIELD NOTES / WRITEUPS"
        title="The reasoning behind the result."
        description="A place for lab walkthroughs, security notes, and lessons worth keeping."
      />
      {writeups.length ? (
        <div className="writeup-list">
          {writeups.map((entry) => (
            <article className="writeup-card" key={entry.href}>
              <p className="eyebrow">
                {entry.category} / {entry.date}
              </p>
              <h3>
                <a href={entry.href}>
                  {entry.title}
                  <ArrowUpRight size={17} />
                </a>
              </h3>
              <p>{entry.summary}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="writeups-empty">
          <div className="writeups-icon" aria-hidden="true">
            <BookOpen size={30} />
            <span>~/writeups</span>
          </div>
          <div>
            <p className="eyebrow">DIRECTORY INITIALIZED</p>
            <h3>No writeups published yet.</h3>
            <p>
              I’m preparing this space for future walkthroughs and technical
              notes. New entries will appear here as I publish them.
            </p>
            <div className="writeup-topics" aria-label="Planned topics">
              <span>Machine walkthroughs</span>
              <span>Web security</span>
              <span>Python & cryptography</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Toolkit() {
  return (
    <section id="toolkit" className="identity-section identity-wrap">
      <Heading
        number="04"
        label="TOOLKIT"
        title="Tools I use. Foundations I’m building."
        description="A working toolkit, not a list of everything in cybersecurity."
      />
      <div className="tool-grid">
        {toolkit.map((group, index) => (
          <article className="tool-group" key={group.title}>
            <span className="tool-number">0{index + 1}</span>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <div className="tool-tags">
              {group.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="identity-section identity-wrap">
      <Heading
        number="05"
        label="EXPERIENCE & LEARNING"
        title="Building the foundation, in practice."
      />
      <div className="journey-layout">
        <div className="timeline-list">
          {learningJourney.map((item) => (
            <article className="timeline-item" key={item.org}>
              <p className="timeline-date">{item.date}</p>
              <div>
                <h3>{item.title}</h3>
                <p className="timeline-org">{item.org}</p>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className="learning-panel">
          <p className="eyebrow">CONTINUING TO LEARN</p>
          <h3>From fundamentals to practical testing.</h3>
          <ul>
            <li>
              <span>Active Directory</span>Domain architecture and enumeration
              fundamentals.
            </li>
            <li>
              <span>Web application security</span>Authentication, access
              control, and manual validation.
            </li>
            <li>
              <span>Foundational coursework</span>Cybersecurity for Beginners ·
              Mahara-Tech.
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="identity-section identity-wrap">
      <Heading number="06" label="GET IN TOUCH" title="Let’s talk security." />
      <div className="contact-layout">
        <div>
          <p className="about-lead">
            Open to internships, junior opportunities, and building useful
            projects together.
          </p>
        </div>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>
            <Mail size={20} />
            <div>
              <span className="contact-link-label">EMAIL</span>
              <strong>{profile.email}</strong>
            </div>
            <ArrowUpRight size={18} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Link2 size={20} />
            <div>
              <span className="contact-link-label">LINKEDIN</span>
              <strong>Abdelrahman Ashraf</strong>
            </div>
            <ArrowUpRight size={18} />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <GitBranch size={20} />
            <div>
              <span className="contact-link-label">GITHUB</span>
              <strong>abdelrahman-ashraf2</strong>
            </div>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <div className="identity-site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <TraceSectionBridge to="about" />
        <About />
        <TraceSectionBridge to="projects" />
        <Projects />
        <TraceSectionBridge to="writeups" />
        <Writeups />
        <TraceSectionBridge to="toolkit" />
        <Toolkit />
        <TraceSectionBridge to="journey" />
        <Journey />
        <TraceSectionBridge to="contact" />
        <Contact />
      </main>
      <TraceJourney />
      <footer className="identity-footer">
        <div className="identity-wrap">
          <p>
            © {new Date().getFullYear()} Abdelrahman Ashraf{' '}
            <span>/ Learn. Test. Document.</span>
          </p>
          <a href="#home">
            Back to top <ArrowRight size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
}
