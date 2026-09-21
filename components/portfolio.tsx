'use client';
import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Globe,
  Network,
  ScanLine,
  FileText,
  Download,
  Menu,
  X,
  Check,
  Mail,
  GitBranch,
  ExternalLink,
  LockKeyhole,
  Terminal,
  Layers,
  Search,
  CheckCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import {
  navItems,
  services,
  skillGroups,
  methodology,
  projects,
  experience,
  training,
  reportSections,
  reportCopy,
} from '@/lib/portfolio-data';

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
    <div className="section-heading">
      <p className="eyebrow">
        {number} / {label}
      </p>
      <h2>{title}</h2>
      {description && <p className="section-intro">{description}</p>}
    </div>
  );
}
function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  );
}
export function Navbar() {
  const [open, setOpen] = useState(false),
    [active, setActive] = useState('home');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    );
    document
      .querySelectorAll('main section[id]')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <header className="navbar">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <a className="brand" href="#home" aria-label="Abdelrahman Ashraf home">
        AA<span>.</span>
        <small>
          SECURITY
          <br />
          PORTFOLIO
        </small>
      </a>
      <nav
        id="primary-navigation"
        aria-label="Main navigation"
        className={open ? 'is-open' : ''}
      >
        {navItems.map((item) => (
          <a
            key={item}
            href={'#' + item.toLowerCase()}
            onClick={() => setOpen(false)}
            className={active === item.toLowerCase() ? 'active' : ''}
            aria-current={
              active === item.toLowerCase() ? 'location' : undefined
            }
          >
            {item}
          </a>
        ))}
      </nav>
      <a className="nav-cta" href="#contact">
        Let’s Work Together <ArrowUpRight size={15} />
      </a>
      <Button
        variant="ghost"
        size="icon"
        className="menu-toggle"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </Button>
    </header>
  );
}

export function Hero() {
  return (
    <section id="home" className="hero wrap">
      <div>
        <span className="availability">
          <i />
          Available for Internships & Security Projects
        </span>
        <p className="eyebrow">OFFENSIVE SECURITY / DEFENSIVE THINKING</p>
        <h1>
          Abdelrahman
          <br />
          Ashraf<span className="cyan">.</span>
        </h1>
        <h2>
          Penetration Tester
          <br />
          <span>& Vulnerability Analyst</span>
        </h2>
        <p className="tagline">Finding vulnerabilities before attackers do.</p>
        <p className="hero-copy">
          I identify, validate, and document security vulnerabilities in web
          applications and network environments, providing clear evidence and
          actionable remediation recommendations.
        </p>
        <div className="actions">
          <a className="primary-link" href="#projects">
            View Security Projects <ArrowUpRight size={17} />
          </a>
          <a className="secondary-link" href="./Abdelrahman_Ashraf_CV.pdf" download>
            <Download size={14} />
            Download Resume
          </a>
          <a className="text-link" href="#contact">
            Contact Me <ArrowRight size={14} />
          </a>
        </div>
        <p className="micro-copy">
          One-page CV · PDF · Updated September 2026
        </p>
      </div>
      <div className="security-visual">
        <div className="visual-head">
          <span>● ASSESSMENT WORKSPACE</span>
          <span>LAB / 01</span>
        </div>
        <div
          className="network-map"
          role="img"
          aria-label="Illustrative assessment workflow connecting web applications and networks to manual VAPT validation"
        >
          <div className="node source">
            <Globe />
            <span>WEB APPLICATION</span>
          </div>
          <div className="node core">
            <ShieldCheck size={43} />
            <span>VAPT</span>
          </div>
          <div className="node target">
            <Network />
            <span>NETWORK</span>
          </div>
          <div className="node validation">
            <ScanLine />
            <span>MANUAL VALIDATION</span>
          </div>
          <svg
            viewBox="0 0 480 330"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M95 85L240 155L385 85M240 155V270" />
          </svg>
          <span className="network-label">
            ILLUSTRATIVE WORKFLOW / NO LIVE SCAN
          </span>
        </div>
        <div className="terminal">
          <p>
            ~/security-lab <span>— methodology</span>
          </p>
          <code>
            <span className="cyan">$</span> assessment --approach structured
            <br />
            <span className="muted">
              01 / Identify the attack surface
              <br />
              02 / Validate with reproducible evidence
              <br />
              03 / Prioritize actionable remediation
            </span>
            <br />
            <span className="cyan">›</span> Authorized environments only{' '}
            <span className="cursor" aria-hidden="true">
              ▌
            </span>
          </code>
        </div>
        <div className="visual-footer">
          <ShieldCheck size={13} /> Evidence first. Impact understood.
        </div>
      </div>
    </section>
  );
}
export function About() {
  return (
    <section id="about" className="section wrap about-grid">
      <Heading
        number="01"
        label="ABOUT ME"
        title="Curiosity. Discipline. Clear evidence."
      />
      <div>
        <p className="body-large">
          I’m Abdelrahman, a junior penetration tester and vulnerability analyst
          building my career in offensive security through hands-on training and
          practical security labs.
        </p>
        <p className="body-copy">
          I’m pursuing a B.Eng. in Cyber Security and Data Analysis at Menoufia
          University’s Faculty of Electronic Engineering (2023–2028).
        </p>
        <p className="body-copy">
          My experience spans network penetration testing, web application
          security, vulnerability assessment, Linux/Windows privilege
          escalation, security monitoring, and technical security reporting.
        </p>
        <p className="body-copy">
          My focus extends beyond finding a potential issue: I work to validate
          it, understand its impact, document reproducible evidence, and
          recommend practical remediation.
        </p>
        <div className="focus-cards">
          <div>
            <ScanLine />
            <strong>VAPT Focus</strong>
            <span>Structured assessment</span>
          </div>
          <div>
            <Network />
            <strong>Web + Network</strong>
            <span>Connected security thinking</span>
          </div>
          <div>
            <Terminal />
            <strong>Hands-On Labs</strong>
            <span>Authorized environments</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Services() {
  return (
    <div className="section-band">
      <section id="services" className="section wrap">
        <Heading
          number="02"
          label="SECURITY SERVICES"
          title="A clearer view of your security."
          description="Focused assessments for startups, small and medium businesses, SaaS teams, web agencies, and organizations securing their applications and networks."
        />
        <div className="service-grid">
          {services.map((s, i) => (
            <article className="service-card reveal" key={s.title}>
              <div className="card-top">
                <s.icon size={24} />
                <span>0{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <ul>
                {s.tags.map((t) => (
                  <li key={t}>
                    <Check size={12} />
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
export function Skills() {
  return (
    <section id="skills" className="section wrap">
      <Heading
        number="03"
        label="TECHNICAL TOOLKIT"
        title="The tools behind the process."
        description="Practical skills developed through training, investigation, and controlled security labs."
      />
      <div className="skills-grid">
        {skillGroups.map((g, i) => (
          <article className="skill-group" key={g.title}>
            <div className="skill-heading">
              <span>0{i + 1}</span>
              <h3>{g.title}</h3>
            </div>
            <Tags items={g.items} />
          </article>
        ))}
      </div>
    </section>
  );
}
export function Methodology() {
  return (
    <section id="methodology" className="methodology-section">
      <div className="wrap section">
        <Heading
          number="04"
          label="SECURITY METHODOLOGY"
          title="A process, not just a scan."
          description="Structured testing connects discovery to verified impact and practical fixes. Exploitation and privilege escalation are performed only when explicitly authorized and in scope."
        />
        <ol className="methodology">
          {methodology.map((m, i) => (
            <li key={m}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <strong>{m}</strong>
              {i < 8 && <ArrowRight size={13} aria-hidden="true" />}
            </li>
          ))}
        </ol>
        <p className="method-note">
          <LockKeyhole size={13} /> Every engagement starts with agreed scope,
          written authorization, and rules of engagement.
        </p>
      </div>
    </section>
  );
}
type Project = (typeof projects)[number];
export function ProjectCard({
  project,
  onOpen,
  onReport,
}: {
  project: Project;
  onOpen: () => void;
  onReport: () => void;
}) {
  return (
    <article className="project-card reveal">
      <div className="project-art">
        <div className="project-meta">
          <span>LAB PROJECT / {project.id}</span>
          <project.icon size={19} />
        </div>
        {project.id === '01' ? (
          <div className="web-diagram">
            <div>
              <Network size={17} /> Project Ban-Win7 <span>COMPLETED</span>
            </div>
            <p>
              5 documented findings <span>→</span> 5-page report
            </p>
            <p>
              Evidence <span>→</span> Impact <span>→</span> Remediation
            </p>
            <small>CONTROLLED WINDOWS 7 LAB</small>
          </div>
        ) : project.id === '02' ? (
          <div className="attack-path">
            {project.workflow.map((w, i) => (
              <span key={w}>
                {w}
                {i < 5 && <ArrowRight size={11} />}
              </span>
            ))}
          </div>
        ) : (
          <div className="assessment-diagram">
            <div>
              <ScanLine />
              <span>HTTP request</span>
            </div>
            <ArrowRight />
            <div>
              <Search />
              <span>Manual validation</span>
            </div>
            <ArrowRight />
            <div>
              <FileText />
              <span>Evidence</span>
            </div>
          </div>
        )}
        <div className="project-art-bottom">
          <span>{project.category}</span>
          <span>COMPLETED LAB</span>
        </div>
      </div>
      <div className="project-content">
        <span className="status-pill">Completed Lab Project</span>
        <p className="project-type">{project.type}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-actions">
          <Button variant="ghost" className="text-button" onClick={onOpen}>
            View Project{' '}
            <ArrowUpRight size={15} />
          </Button>
          {project.report && (
            <Button
              variant="ghost"
              className="text-button secondary"
              onClick={onReport}
            >
              View Sample Report <FileText size={14} />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
export function Projects({
  onProject,
  onReport,
}: {
  onProject: (project: Project) => void;
  onReport: () => void;
}) {
  return (
    <section id="projects" className="section wrap">
      <div className="section-title-row">
        <Heading
          number="05"
          label="PROJECTS & CASE STUDIES"
          title="From methodology to evidence."
          description="Completed, authorized lab work covering internal penetration testing, vulnerable machines, web security practice, evidence collection, and technical reporting."
        />
        <span className="outline-label">
          <ShieldCheck size={13} /> AUTHORIZED LABS ONLY
        </span>
      </div>
      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onOpen={() => onProject(p)}
            onReport={onReport}
          />
        ))}
      </div>
    </section>
  );
}
export function FindingCard() {
  return (
    <article className="finding-card">
      <div className="finding-top">
        <span>FINDING TEMPLATE / WEB-001</span>
        <span className="severity high">HIGH · EXAMPLE</span>
      </div>
      <h3>Broken Access Control</h3>
      <div className="finding-status">
        <span>
          Status: <strong>Placeholder — not validated</strong>
        </span>
        <span>Affected asset: Placeholder Lab Application</span>
      </div>
      <p className="template-warning">
        Illustrative report component. Severity and finding title are examples,
        not a claim of a discovered vulnerability.
      </p>
      <dl>
        {[
          [
            'Description',
            'Placeholder: describe the observed access-control weakness after authorized lab validation.',
          ],
          [
            'Evidence',
            'No evidence added. Include sanitized requests, responses, screenshots, and reproducible steps.',
          ],
          [
            'Impact',
            'Placeholder: document demonstrated access and the resulting security or business impact.',
          ],
          [
            'Remediation',
            'Placeholder: specify server-side authorization checks and verification steps appropriate to the actual finding.',
          ],
          [
            'CVSS / CWE / CVE',
            'Not assigned. Add only when applicable and supported.',
          ],
          ['Retest status', 'Not performed.'],
        ].map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="severity-key" aria-label="Severity style examples">
        {['Critical', 'High', 'Medium', 'Low', 'Informational'].map((s) => (
          <span key={s} className={'severity ' + s.toLowerCase()}>
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}
export function ExperienceTimeline() {
  return (
    <section id="experience" className="section wrap experience-grid">
      <Heading
        number="06"
        label="EXPERIENCE"
        title="Learning through practice."
        description="A foundation in security monitoring, growing into offensive security and vulnerability assessment."
      />
      <div className="experience-timeline">
        {experience.map((e) => (
          <article key={e.org} className="experience-item">
            <p className="date-label">{e.date}</p>
            <h3>{e.title}</h3>
            <p className="org">
              {e.org} <span>/ {e.role}</span>
            </p>
            <p className="body-copy">{e.description}</p>
            <Tags items={e.items} />
            {e.note && <p className="micro-copy">{e.note}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
export function Training() {
  return (
    <div className="section-band">
      <section id="training" className="section wrap">
        <Heading
          number="07"
          label="TRAINING & CERTIFICATIONS"
          title="Always building the foundation."
          description="Current training and completed foundational cybersecurity certifications."
        />
        <div className="training-grid">
          {training.map((t) => (
            <article key={t.provider} className="training-card">
              <div className="training-monogram">
                {t.provider.charAt(0)}
              </div>
              <div>
                <p>{t.provider}</p>
                <h3>{t.title}</h3>
              </div>
              <span className="status-pill">{t.status}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
export function ReportPreview({ onReport }: { onReport: () => void }) {
  return (
    <section id="reports" className="section wrap report-section">
      <div>
        <Heading
          number="08"
          label="REPORTING & DELIVERABLES"
          title="Sample Penetration Testing Report"
        />
        <p className="body-copy">
          A professional security assessment is more than a list of scanner
          results. Findings are validated, documented, prioritized, and
          translated into actionable remediation recommendations.
        </p>
        <div className="report-points">
          <p>
            <CheckCheck /> Executive clarity. Technical depth.
          </p>
          <p>
            <CheckCheck /> Evidence-backed, reproducible findings.
          </p>
          <p>
            <CheckCheck /> Prioritized remediation and retesting.
          </p>
        </div>
        <Button className="large-button" onClick={onReport}>
          View Sample Report <ArrowUpRight />
        </Button>
        <p className="micro-copy">
          Illustrative template · Placeholder data · No client information
        </p>
      </div>
      <button
        className="report-cover"
        onClick={onReport}
        aria-label="Open sample penetration testing report"
      >
        <div className="report-cover-header">
          <span>
            AA<span className="cyan">.</span>
          </span>
          <span>
            SECURITY ASSESSMENT
            <br />
            SAMPLE / 001
          </span>
        </div>
        <p className="eyebrow">ILLUSTRATIVE REPORT TEMPLATE</p>
        <h3>
          Penetration
          <br />
          Testing Report<span className="cyan">.</span>
        </h3>
        <p>
          From technical findings
          <br />
          to actionable recommendations.
        </p>
        <div className="report-cover-line" />
        <div className="report-cover-toc">
          {reportSections.slice(0, 4).map((s, i) => (
            <div key={s}>
              <span>0{i + 1}</span>
              {s}
              <span>—</span>
            </div>
          ))}
        </div>
        <div className="report-cover-footer">
          <span>AUTHORIZED LAB ENVIRONMENT</span>
          <ArrowUpRight size={17} />
        </div>
      </button>
    </section>
  );
}
export function WhyWork() {
  return (
    <section className="wrap why-section">
      <p className="eyebrow">WHY WORK WITH ME</p>
      <h2>Thoughtful testing. Useful outcomes.</h2>
      <div className="why-grid">
        {[
          [
            Layers,
            'Structured Testing',
            'Testing follows a clear VAPT methodology.',
          ],
          [
            ScanLine,
            'Manual Validation',
            'Important findings are investigated instead of blindly trusting automated scanner output.',
          ],
          [
            Search,
            'Clear Evidence',
            'Security issues are documented with reproducible technical evidence.',
          ],
          [
            FileText,
            'Actionable Reporting',
            'Findings include practical remediation recommendations.',
          ],
        ].map(([Icon, title, description]) => (
          <article key={String(title)}>
            {typeof Icon !== 'string' && <Icon size={21} />}
            <h3>{String(title)}</h3>
            <p>{String(description)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
const contactEmail = 'abdelrahman.a.moustfa@gmail.com';
export function Contact() {
  const [message, setMessage] = useState('');
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('Name') || 'Portfolio visitor');
    const subject = 'Security assessment inquiry from ' + name;
    const body = Array.from(data.entries())
      .map(([key, value]) => key + ': ' + value)
      .join('\n');
    window.location.href =
      'mailto:' +
      contactEmail +
      '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(body);
    setMessage(
      'Your email app should open with the inquiry prepared. Review it before sending.',
    );
  }
  return (
    <section id="contact" className="section wrap contact-grid">
      <div>
        <Heading
          number="09"
          label="LET’S WORK TOGETHER"
          title="Let’s Secure Your Systems"
        />
        <p className="body-copy">
          Need a security assessment for your web application or network
          environment? Let’s discuss the scope and security requirements.
        </p>
        <span className="availability">
          <i />
          Available for internships & authorized projects
        </span>
        <div className="contact-links">
          {[
            {
              Icon: Mail,
              label: 'Email',
              value: contactEmail,
              href: 'mailto:' + contactEmail,
            },
            {
              Icon: ExternalLink,
              label: 'LinkedIn',
              value: 'abdelrahman-ashraf1',
              href: 'https://www.linkedin.com/in/abdelrahman-ashraf1/',
            },
            {
              Icon: GitBranch,
              label: 'GitHub',
              value: 'abdelrahman-ashraf2',
              href: 'https://github.com/abdelrahman-ashraf2',
            },
          ].map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <Icon size={18} />
              <span>{label}</span>
              <small>{value}</small>
            </a>
          ))}
        </div>
        <p className="micro-copy">
          Based in Cairo, Egypt · Available for internships and authorized
          security projects.
        </p>
      </div>
      <form onSubmit={submit} className="contact-form">
        <div className="form-notice">
          <FileText size={17} />
          <p>
            <strong>Prepare an assessment inquiry</strong>
            <br />
            Submitting opens your email app with a prepared message. Nothing is
            sent until you review and send it.
          </p>
        </div>
        <div className="form-row">
          <label htmlFor="name">
            Name <span>*</span>
            <Input
              id="name"
              name="Name"
              placeholder="Your name"
              autoComplete="name"
              required
              maxLength={100}
            />
          </label>
          <label htmlFor="email">
            Email <span>*</span>
            <Input
              id="email"
              name="Email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
        </div>
        <div className="form-row">
          <label htmlFor="company">
            Company <small>(optional)</small>
            <Input
              id="company"
              name="Company"
              placeholder="Company name"
              autoComplete="organization"
              maxLength={150}
            />
          </label>
          <label htmlFor="service">
            Service Needed <span>*</span>
            <NativeSelect
              id="service"
              name="Service Needed"
              required
              defaultValue=""
            >
              <NativeSelectOption value="" disabled>
                Select a service
              </NativeSelectOption>
              {[
                'Web Application Security Assessment',
                'Network Vulnerability Assessment',
                'Vulnerability Assessment',
                'Security Reporting',
                'Other',
              ].map((s) => (
                <NativeSelectOption value={s} key={s}>
                  {s}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </label>
        </div>
        <label htmlFor="details">
          Project Details <span>*</span>
          <Textarea
            id="details"
            name="Project Details"
            placeholder="Tell me about your application or network, goals, timeline, and assessment scope. Please do not include credentials or sensitive information."
            required
            minLength={20}
            maxLength={5000}
            rows={5}
          />
        </label>
        <Button type="submit" className="large-button form-submit">
          Prepare Email Inquiry <ArrowUpRight />
        </Button>
        <p className="micro-copy">
          Opens your email app · Review before sending
        </p>
        <p role="status" className="form-status">
          {message}
        </p>
      </form>
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div>
            <a className="brand" href="#home">
              AA<span>.</span>
            </a>
            <strong>Abdelrahman Ashraf</strong>
            <p>Penetration Tester & Vulnerability Analyst</p>
          </div>
          <nav aria-label="Footer navigation">
            {['Home', 'Services', 'Projects', 'Reports', 'Contact'].map((n) => (
              <a href={'#' + n.toLowerCase()} key={n}>
                {n}
              </a>
            ))}
          </nav>
          <div className="footer-social">
            <a href={'mailto:' + contactEmail}>Email</a>
            <a
              href="https://www.linkedin.com/in/abdelrahman-ashraf1/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/abdelrahman-ashraf2"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Abdelrahman Ashraf</span>
          <p>
            <ShieldCheck size={13} />
            All security testing showcased in this portfolio is performed in
            authorized, controlled, or intentionally vulnerable environments.
          </p>
          <a href="#home" aria-label="Back to top">
            ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
export default function Portfolio() {
  const [project, setProject] = useState<Project | null>(null),
    [report, setReport] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll('.reveal').forEach((e) => {
      e.classList.add('reveal-ready');
      obs.observe(e);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <div className="focus-strip wrap">
          WEB APPLICATION SECURITY <span>+</span> NETWORK VAPT <span>+</span>{' '}
          VULNERABILITY ASSESSMENT <span>+</span> SECURITY REPORTING
        </div>
        <About />
        <Services />
        <Skills />
        <Methodology />
        <Projects onProject={setProject} onReport={() => setReport(true)} />
        <ExperienceTimeline />
        <Training />
        <ReportPreview onReport={() => setReport(true)} />
        <WhyWork />
        <Contact />
      </main>
      <Footer />
      <Dialog
        open={!!project}
        onOpenChange={(open) => {
          if (!open) setProject(null);
        }}
      >
        <DialogContent className="portfolio-dialog">
          {project && (
            <>
              <DialogTitle className="dialog-title">
                {project.title}
              </DialogTitle>
              <DialogDescription>
                Completed Lab Project · {project.type}. High-level details are
                based on the supplied CV and sanitized for public display.
              </DialogDescription>
              <div className="dialog-body">
                <span className="status-pill">
                  Completed Lab Project / {project.id}
                </span>
                <h3>Assessment summary</h3>
                <p>{project.objective}</p>
                <h3>Assessment workflow</h3>
                <div className="workflow-chips">
                  {project.workflow.map((w, i) => (
                    <span key={w}>
                      {w}
                      {i < project.workflow.length - 1 && (
                        <ArrowRight size={12} />
                      )}
                    </span>
                  ))}
                </div>
                <h3>Documented outcomes</h3>
                <ul>
                  {project.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <h3>Tools & focus</h3>
                <Tags items={project.tools} />
                <div className="empty-evidence">
                  <ShieldCheck />
                  <strong>Completed in authorized lab environments.</strong>
                  <p>
                    Only high-level, sanitized details are published. Credentials
                    and sensitive lab evidence remain private.
                  </p>
                </div>
                {project.report && (
                  <Button
                    className="large-button"
                    onClick={() => {
                      setProject(null);
                      setReport(true);
                    }}
                  >
                    Open Sample Report <FileText />
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={report} onOpenChange={setReport}>
        <DialogContent className="portfolio-dialog report-dialog">
          <DialogTitle className="dialog-title">
            Sample Penetration Testing Report
          </DialogTitle>
          <DialogDescription>
            Illustrative template only. No completed assessment, validated
            finding, or real client data is represented.
          </DialogDescription>
          <div className="dialog-body">
            <div className="report-actions">
              <a className="secondary-link" href="./sample-report.txt" download>
                <Download size={15} /> Download Report Template
              </a>
              <span className="outline-label">PLACEHOLDER DATA</span>
            </div>
            {reportSections.map((s, i) => (
              <section className="report-chapter" key={s}>
                <h3>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {s}
                </h3>
                <p>{reportCopy[i]}</p>
                {i === 5 && <FindingCard />}
              </section>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
