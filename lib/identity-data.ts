export const profile = {
  name: 'Abdelrahman Ashraf',
  email: 'abdelrahman.a.moustfa@gmail.com',
  github: 'https://github.com/abdelrahman-ashraf2',
  linkedin: 'https://www.linkedin.com/in/abdelrahman-ashraf1/',
  cv: './Abdelrahman_Ashraf_CV.pdf',
};

export const selectedWork = [
  {
    id: 'crypto',
    number: '01',
    title: 'Applied Cryptography Lab',
    category: 'Python / University project',
    description:
      'Turning my information-security coursework into a usable Python lab: explore encryption, key exchange, digital signatures, and what happens when their assumptions fail.',
    tags: ['Python', 'Cryptography', 'Image encryption'],
    details: [
      [
        'Build',
        'A command-line lab bringing four cryptography demonstrations into one project.',
      ],
      [
        'Explore',
        'Feistel rounds, a Diffie–Hellman man-in-the-middle demonstration, AES image modes, and DSA signature tampering.',
      ],
      [
        'Try',
        'Use your own image to compare block-cipher modes, then verify that decryption restores the original data.',
      ],
      [
        'Context',
        'Developed from university coursework. Educational demonstrations, not a production cryptography library.',
      ],
    ],
    repository:
      'https://github.com/abdelrahman-ashraf2/applied-cryptography-lab',
  },
  {
    id: 'network',
    number: '02',
    title: 'Network & host security labs',
    category: 'Penetration testing / Lab practice',
    description:
      'Working from host discovery and service enumeration through validation and privilege escalation in intentionally vulnerable machines.',
    tags: ['Enumeration', 'Linux & Windows', 'Validation'],
    details: [
      [
        'Environments',
        'Kioptrix Level 1, Metasploitable 2, Moria 1.1, and Tomghost.',
      ],
      [
        'Practice',
        'Connect exposed services to a testable attack path, validate it in scope, and record the steps.',
      ],
      [
        'Documentation',
        'Includes the Ban-Win7 internal assessment documented in my CV. Public walkthroughs will be added to Writeups.',
      ],
      [
        'Scope',
        'Isolated, intentionally vulnerable environments. No client or production assessment is represented.',
      ],
    ],
    repository: null,
  },
  {
    id: 'web',
    number: '03',
    title: 'Web application security practice',
    category: 'Web security / Training labs',
    description:
      'Using Burp Suite and HTTP analysis to understand how authentication, access control, and input handling can fail—and how to reproduce the result.',
    tags: ['Burp Suite', 'HTTP', 'Web security'],
    details: [
      [
        'Workflow',
        'Intercept a request, understand its behavior, change one assumption, and compare the response.',
      ],
      [
        'Topics',
        'Authentication and JWT, SQL injection, XSS, SSRF, file uploads, and other web-security topics from my training.',
      ],
      [
        'Evidence',
        'Practice focuses on reproducible steps and remediation notes, rather than scanner output alone.',
      ],
      [
        'Scope',
        'Authorized training labs. Individual public writeups are not published yet.',
      ],
    ],
    repository: null,
  },
];

export const toolkit = [
  {
    title: 'Web & network testing',
    description:
      'The tools I use to inspect requests, enumerate services, and understand traffic.',
    tools: ['Burp Suite', 'Nmap', 'Wireshark', 'Metasploit'],
  },
  {
    title: 'Systems & investigation',
    description:
      'A Linux and Windows foundation, with endpoint investigation from my SOC internship.',
    tools: ['Kali Linux', 'Windows', 'Sysmon', 'ProcMon'],
  },
  {
    title: 'Code & automation',
    description:
      'Python projects backed by programming fundamentals and shell scripting practice.',
    tools: ['Python', 'Bash', 'PowerShell', 'C / C++'],
  },
];

export const learningJourney = [
  {
    date: 'JUL 2026 — PRESENT',
    title: 'Vulnerability Analysis & Penetration Testing',
    org: 'Digital Egypt Pioneers Initiative · Trainee',
    description:
      'Network penetration-testing practice, vulnerability validation, and Active Directory security fundamentals.',
  },
  {
    date: 'JAN 2026 — PRESENT',
    title: 'Cybersecurity & Penetration Testing Diploma',
    org: 'Instant · Student / Trainee',
    description:
      'Hands-on web-security training using HTTP analysis, Burp Suite, and controlled vulnerability labs.',
  },
  {
    date: 'NOV — DEC 2025',
    title: 'SOC Analyst Internship',
    org: 'Archon Security · Intern',
    description:
      'Alert triage, suspicious endpoint and network activity, IOC documentation, and incident notes.',
  },
];

export type Writeup = {
  title: string;
  category: string;
  date: string;
  summary: string;
  href: string;
};
// Add only completed, sanitized articles. Empty renders an honest unpublished state.
export const writeups: Writeup[] = [];
