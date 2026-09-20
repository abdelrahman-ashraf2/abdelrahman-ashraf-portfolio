import { Globe, Network, ScanLine, FileText } from 'lucide-react';
export const navItems = [
  'Home',
  'About',
  'Services',
  'Skills',
  'Projects',
  'Experience',
  'Training',
  'Reports',
  'Contact',
];
export const services = [
  {
    icon: Globe,
    title: 'Web Application Security Assessment',
    description:
      'Assessment of authentication, sessions, access control, input validation, common OWASP vulnerabilities, security misconfigurations, and application-level weaknesses.',
    tags: ['Authentication & sessions', 'Access control', 'OWASP fundamentals'],
  },
  {
    icon: Network,
    title: 'Network Vulnerability Assessment',
    description:
      'Network reconnaissance, service discovery, enumeration, vulnerability identification, validation, attack-surface analysis, and risk documentation.',
    tags: [
      'Service discovery',
      'Attack-surface analysis',
      'Risk documentation',
    ],
  },
  {
    icon: ScanLine,
    title: 'Vulnerability Assessment & Validation',
    description:
      'Identify potential vulnerabilities and manually investigate important findings to reduce false positives and understand actual security impact.',
    tags: ['Manual investigation', 'Impact analysis', 'Finding validation'],
  },
  {
    icon: FileText,
    title: 'Security Reporting',
    description:
      'Professional security reports with executive summaries, technical findings, evidence, severity, impact, reproducible steps, and remediation recommendations.',
    tags: ['Technical evidence', 'Executive summaries', 'Remediation guidance'],
  },
];
export const skillGroups = [
  {
    title: 'VAPT',
    items: [
      'Reconnaissance',
      'Scanning',
      'Enumeration',
      'Vulnerability Assessment',
      'Vulnerability Validation',
      'Exploitation Basics',
      'Privilege Escalation',
      'Security Reporting',
    ],
  },
  {
    title: 'Web Security',
    items: [
      'HTTP / HTTPS',
      'Request / Response Analysis',
      'Authentication Testing Basics',
      'Cookies & Sessions',
      'OWASP Top 10 Fundamentals',
      'Web Vulnerability Assessment',
    ],
  },
  {
    title: 'Security Tools',
    items: [
      'Kali Linux',
      'Nmap',
      'Wireshark',
      'Metasploit',
      'Burp Suite',
      'LinPEAS',
      'WinPEAS',
      'Nessus',
    ],
  },
  {
    title: 'Operating Systems',
    items: ['Linux', 'Windows', 'Windows Server', 'Ubuntu'],
  },
  {
    title: 'Programming & Scripting',
    items: ['Python', 'Bash Basics', 'PowerShell Basics', 'C', 'C++'],
  },
];
export const methodology = [
  'Reconnaissance',
  'Scanning',
  'Enumeration',
  'Vulnerability Assessment',
  'Validation',
  'Exploitation',
  'Privilege Escalation',
  'Reporting',
  'Remediation / Retesting',
];
export const projects = [
  {
    id: '01',
    title: 'Internal Penetration Testing — Project Ban-Win7',
    type: 'Windows 7 Lab',
    category: 'Internal penetration testing',
    icon: Network,
    description:
      'A completed controlled internal assessment documented in a five-page penetration testing report with scope, technical walkthrough, evidence, severity, impact, and remediation.',
    workflow: [
      'Scope',
      'Discovery',
      'Enumeration',
      'Validation',
      'Evidence',
      'Risk Rating',
      'Remediation',
    ],
    objective:
      'Conducted a controlled Windows 7 lab assessment and documented five findings, including full system compromise, plaintext credential disclosure, spyware persistence, offensive tooling, and information leakage.',
    deliverables: [
      'Five-page penetration testing report',
      'Five documented findings with evidence and severity',
      'Impact analysis and remediation recommendations',
    ],
    tools: ['Windows 7 Lab', 'Evidence Collection', 'Technical Reporting'],
    report: false,
  },
  {
    id: '02',
    title: 'Selected Vulnerable-Machine Labs',
    type: 'Controlled Vulnerable-Machine Labs',
    category: 'Network & host security',
    icon: Network,
    description:
      'Four completed vulnerable-machine labs covering host discovery, port scanning, service enumeration, vulnerability validation, exploitation, and privilege escalation.',
    workflow: [
      'Discovery',
      'Port Scan',
      'Enumeration',
      'Validation',
      'Exploitation',
      'Privilege Escalation',
    ],
    objective:
      'Completed Kioptrix Level 1, Metasploitable 2, Moria 1.1, and Tomghost in isolated, intentionally vulnerable environments while following a structured assessment workflow.',
    deliverables: [
      'Four completed vulnerable-machine labs',
      'Documented attack paths and validation steps',
      'Privilege-escalation practice in controlled environments',
    ],
    tools: ['Kioptrix Level 1', 'Metasploitable 2', 'Moria 1.1', 'Tomghost'],
    report: false,
  },
  {
    id: '03',
    title: 'Web Security Practice',
    type: 'Legal Lab Environments',
    category: 'Web security',
    icon: Globe,
    description:
      'Hands-on practice intercepting and modifying HTTP requests, reviewing parameters and cookies or sessions, and testing basic authentication and input handling.',
    workflow: [
      'Intercept',
      'Inspect',
      'Modify',
      'Validate',
      'Document',
    ],
    objective:
      'Used Burp Suite, HTTP fundamentals, and browser developer tools to practice request and response analysis in legal lab environments.',
    deliverables: [
      'HTTP request and response analysis',
      'Cookie and session review',
      'Basic authentication and input-handling tests',
    ],
    tools: ['Burp Suite', 'HTTP', 'Browser DevTools'],
    report: false,
  },
];
export const experience = [
  {
    date: 'JUL 2026 — PRESENT',
    title: 'Vulnerability Analyst and Penetration Tester',
    org: 'DEPI',
    role: 'Trainee',
    description:
      'Currently enrolled in the DEPI VAPT track, developing practical offensive security skills through a structured curriculum.',
    items: [
      'Network Penetration Testing',
      'Active Directory Security',
      'Web Vulnerability Assessment',
      'Mobile Application Security',
    ],
  },
  {
    date: 'JAN 2026 — PRESENT',
    title: 'Cybersecurity & Penetration Testing Diploma',
    org: 'Instant',
    role: 'Student / Trainee',
    description:
      'Hands-on training in network penetration testing, Linux/Windows privilege escalation, web application security, and broader VAPT methodology. Practice includes reconnaissance, scanning, enumeration, vulnerability validation, attack-surface mapping, and security documentation.',
    items: [
      'Kali Linux',
      'Nmap',
      'Wireshark',
      'Nessus',
      'Metasploit',
      'Burp Suite',
    ],
    note: 'Documentation: scope, reproducible steps, evidence, impact, and remediation recommendations.',
  },
  {
    date: 'NOV 2025 — DEC 2025',
    title: 'SOC Analyst Internship',
    org: 'Archon Security',
    role: 'Intern',
    description:
      'Triaged security alerts and reviewed suspicious endpoint and network activity. Created basic IOC documentation and incident notes.',
    items: [
      'Sysmon',
      'ProcMon',
      'Process Explorer',
      'TCPView',
      'Netstat',
      'Tasklist',
      'Wireshark',
    ],
  },
];
export const training = [
  { title: 'VAPT Track', provider: 'DEPI', status: 'In progress' },
  {
    title: 'Cybersecurity & Penetration Testing Diploma',
    provider: 'Instant',
    status: 'In progress',
  },
  {
    title: 'SOC Analyst',
    provider: 'Archon Security',
    status: 'Completed · 2025',
  },
  {
    title: 'Cybersecurity for Beginners',
    provider: 'Mahara-Tech',
    status: 'Completed',
  },
];
export const reportSections = [
  'Executive Summary',
  'Scope',
  'Methodology',
  'Risk Rating',
  'Findings Summary',
  'Technical Findings',
  'Evidence',
  'Remediation Recommendations',
  'Retesting Results',
];
export const reportCopy = [
  'Illustrative template only. No completed assessment or confirmed security findings are represented. Replace this section with business context, assessed scope, verified risks, and prioritized recommendations after authorized testing.',
  'Placeholder: list authorized assets, exclusions, test dates, rules of engagement, permitted techniques, and the assessment owner. Written authorization is required before testing.',
  'Document reconnaissance, scanning, enumeration, assessment, manual validation, controlled exploitation where permitted, reporting, remediation, and retesting. Record testing limitations.',
  'Assign severity using demonstrated impact, likelihood, and business context. Add a CVSS score and vector only when applicable and justified. No score has been assigned in this template.',
  'No validated findings have been added. Track each future finding by identifier, title, affected asset, severity, validation status, and remediation owner.',
  'Use the finding component below. Every field remains a placeholder until supported by real, authorized lab evidence. CWE / CVE references should only be added when applicable.',
  'Placeholder: include sanitized requests and responses, screenshots, timestamps, and reproducible steps. Remove credentials, tokens, personal information, and other sensitive data.',
  'Placeholder: provide specific corrective actions, affected configuration or code, responsible owners, priorities, and verification steps for each validated finding.',
  'Not performed. After fixes are applied, repeat the relevant test within authorized scope and record the retest date, evidence, and whether each finding is resolved.',
];
