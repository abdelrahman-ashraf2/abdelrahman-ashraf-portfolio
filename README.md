# Abdelrahman Ashraf — Personal Cybersecurity Lab

Personal portfolio for a cybersecurity student and VAPT trainee. Built with React, TypeScript, and Vite. It foregrounds actual projects and lab practice, with direct contact links and a future Writeups section. There is no contact form, backend, tracking, or pretend live scanner.

Primary site: [abdelrahman-ashraf2.github.io](https://abdelrahman-ashraf2.github.io/)

The previous [project URL](https://abdelrahman-ashraf2.github.io/abdelrahman-ashraf-portfolio/) remains available.

## Development

```bash
npm ci
npm run dev
npm run build
```

Production files are generated in `dist/`. Relative asset URLs support both GitHub Pages addresses.

## Identity

The existing TRACE colors remain: graphite `#10120f`, bone `#e7e4d8`, copper `#bf815d`, and sage `#aab590`. The cyber lab identity uses monospaced labels, file tabs, precise corner marks, and scroll-driven evidence paths. The console is an interactive portfolio explorer with factual project notes, not a terminal connected to another system. There is no personal portrait.

Native anchors, keyboard-accessible tabs and disclosure buttons, mobile navigation, and reduced-motion fallbacks are supported.

## Content

Edit `lib/identity-data.ts` for projects, training, contact details, and writeups. Education and training descriptions use the supplied CV; the public LinkedIn excerpt confirms the DEPI VAPT headline, but the full profile was behind sign-in during this update. Training is not presented as employment, and lab practice is not presented as client work.

The featured [Applied Cryptography Lab](https://github.com/abdelrahman-ashraf2/applied-cryptography-lab) is a runnable educational Python project. No unpublished article or report is presented as publicly available.

## Adding writeups

The `writeups` array starts empty and renders a clear unpublished state. To publish an article:

1. Add a complete, sanitized article page to `public/writeups/`, or publish it at another public URL.
2. Add an entry to `writeups` in `lib/identity-data.ts`:

```ts
{
  title: 'Your article title',
  category: 'Web security',
  date: '2026-11-01',
  summary: 'A short description of what the article demonstrates.',
  href: './writeups/your-article.html',
}
```

3. Build and verify the article and link before publishing. Never include credentials, tokens, private targets, or sensitive evidence. Use only authorized lab work and respect platform writeup policies.

## Deployment

`.github/workflows/pages.yml` builds and deploys `dist/` when `main` changes. The primary repository is `abdelrahman-ashraf2.github.io`; the original project repository is preserved as a working mirror. Push verified changes to both remotes to keep the two addresses synchronized.

## Contact

- [Email](mailto:abdelrahman.a.moustfa@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/abdelrahman-ashraf1/)
- [GitHub](https://github.com/abdelrahman-ashraf2)
