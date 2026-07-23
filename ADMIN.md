# Content Admin Guide

The website content (hero text, service times, about, leadership, contact
details, and events/announcements) can be edited through a web-based admin
console at **`/admin/`** — for example:

`https://tesvm.github.io/christian-community-fellowship-aoh-church/admin/`

It uses [Decap CMS](https://decapcms.org). When you publish a change, Decap
commits the update to this GitHub repository, which automatically re-deploys the
site through the existing GitHub Pages workflow. Changes appear on the live site
within a minute or two.

There is no separate server or database — everything stays in this repo.

---

## How editing works (day to day)

1. Go to `/admin/` on the site and click **Login with GitHub**.
2. Open **Website Content → Homepage Content**.
3. Edit any field (for example, change the Sunday service time or add an event).
4. Click **Publish**. That's it — the live site updates shortly after.

Editable content lives in [`content/site.json`](content/site.json). The page
also keeps a copy of the current text in the HTML itself, so if the JSON is ever
missing the site still shows real content (it never goes blank).

---

## One-time setup (required before login works)

GitHub Pages is a static host and cannot perform the GitHub sign-in handshake by
itself, so Decap needs a tiny, free **OAuth helper** deployed once. Pick ONE of
the options below, then update [`admin/config.yml`](admin/config.yml).

### Option A — Netlify OAuth helper (simplest, free)

1. Register a **GitHub OAuth App**: GitHub → Settings → Developer settings →
   OAuth Apps → **New OAuth App**.
   - Homepage URL: your site URL.
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Save the **Client ID** and **Client Secret**.
2. Create a free Netlify account and a new site (it can be an empty placeholder).
   Under **Site settings → Access control → OAuth → Install provider**, add
   **GitHub** with the Client ID and Secret from step 1.
3. In `admin/config.yml`, set:
   ```yaml
   backend:
     name: github
     repo: TESVM/christian-community-fellowship-aoh-church
     branch: main
     base_url: https://api.netlify.com
   ```
   (Remove the `auth_endpoint` line, since Netlify uses its default.)

### Option B — Cloudflare Worker OAuth proxy (no Netlify account)

1. Register a **GitHub OAuth App** as in Option A, but set the callback URL to
   your Worker's `/callback` URL.
2. Deploy a known Decap OAuth Worker (for example
   [`decap-cms-oauth`-style workers](https://decapcms.org/docs/external-oauth-clients/))
   with your GitHub Client ID and Secret as environment variables.
3. In `admin/config.yml`, set `base_url` to your Worker's origin and keep
   `auth_endpoint: auth`.

### Who can edit

Only GitHub accounts with **write access** to this repository can publish. Add
editors as repository collaborators in GitHub → Settings → Collaborators. Keep
that list small — anyone on it can change the live site.

---

## Test the editor locally (optional, no GitHub needed)

```bash
# Terminal 1 — Decap's local git proxy
npx decap-server

# Terminal 2 — serve the site
python3 -m http.server 4173
```

Then uncomment `local_backend: true` in `admin/config.yml`, open
`http://localhost:4173/admin/`, and edits will be written straight to your local
`content/site.json`. Re-comment `local_backend` before deploying.

---

## Security notes

- No passwords, tokens, or secrets are stored in this repository. The GitHub
  OAuth Client Secret lives only in Netlify/Cloudflare, never in the site code.
- The `/admin/` page is marked `noindex` so search engines don't list it, but it
  is not itself a secret — access is controlled by GitHub login + repo
  permissions, which is what actually protects publishing.
- Editors sign in with their own GitHub accounts; revoke access by removing them
  as repository collaborators.
