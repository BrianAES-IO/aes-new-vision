# Aesurus Limited website

The company website for Aesurus Limited: AI automation, software development, cybersecurity and AESURUS OS.

It's a static site with no build step and no dependencies.

| Page | File |
| --- | --- |
| Home | `index.html` |
| Services | `services.html` |
| AESURUS OS | `aesurus-os.html` |
| Contact | `contact.html` |

Shared files are in `assets/`: `styles.css`, `main.js`, images (`img/`), OS icons (`icons/`) and fonts (`fonts/`: Lexend and Michroma, under the SIL Open Font License).

Every page repeats the same header and footer. If you edit them, change all four pages.

## Preview locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000

## Publish with GitHub Pages

1. Push this repository to GitHub.
2. In the repository, go to **Settings → Pages**, set **Source** to *Deploy from a branch*, then pick `main` and `/ (root)`.
3. The site goes live at `https://<user>.github.io/<repo>/`. To use your own domain (such as aesurus.io), enter it under **Custom domain** and add the DNS records GitHub shows you.

`.nojekyll` tells GitHub Pages to serve the files exactly as they are.

## Contact form

The site has no server, so the form opens the visitor's email app with the message ready to send to info@aesurus.io. To receive submissions directly, point the form at a form service (for example Formspree) or at your own backend.

## Contact

info@aesurus.io · (876) 283-2127 · St. Catherine, Jamaica
