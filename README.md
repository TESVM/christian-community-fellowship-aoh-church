# Christian Community Fellowship AOH Church of God

Standalone church website for Christian Community Fellowship AOH Church of God in Adamsville, Alabama.

Expected GitHub Pages URL after Pages is enabled:

`https://tesvm.github.io/christian-community-fellowship-aoh-church/`

## Project structure

- `index.html` - main website markup
- `styles/main.css` - responsive site styling
- `scripts/main.js` - navigation and interaction enhancements
- `scripts/content.js` - loads editable content from `content/site.json` (progressive enhancement)
- `content/site.json` - editable site content (managed via the admin console)
- `admin/` - Decap CMS content editor (`/admin/`); see [ADMIN.md](ADMIN.md)
- `404.html` - branded not-found page
- `images/` - logo, favicon, and pastor photo

## Editing content

Content can be edited through the web admin console at `/admin/`. See
[ADMIN.md](ADMIN.md) for the day-to-day workflow and the one-time OAuth setup
required before login works.

## Local preview

Open `index.html` directly in a browser, or serve the folder with any static web server.

Example:

```bash
cd christian-community-fellowship-aoh-church
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## GitHub repository setup

Initialize the local repo if needed:

```bash
cd christian-community-fellowship-aoh-church
git init
git add .
git commit -m "Initial church website"
```

Create a GitHub repository, then connect and push:

```bash
git remote add origin https://github.com/<your-account>/christian-community-fellowship-aoh-church.git
git branch -M main
git push -u origin main
```

## Content source

Church details were assembled from the back-office church profile provided in the project request.

## Deployment

The repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that deploys the site to GitHub Pages on every push to `main`.
