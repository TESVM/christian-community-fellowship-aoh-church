# Content Admin Guide

Church staff edit the website at **`/admin/`** using a simple **email and
password** — no GitHub account required. It uses [Decap CMS](https://decapcms.org)
for the editor and [DecapBridge](https://decapbridge.com) for email/password
login (DecapBridge replaced the old, now-retired Netlify Identity). When staff
publish a change, DecapBridge commits it to this repository and Netlify
redeploys the site (live in a minute or two).

Editable content lives in [`content/site.json`](content/site.json). The page
also keeps a copy of the text in the HTML, so the site never shows blank content
if the JSON is missing.

---

## Day-to-day editing

1. Go to `https://ccfaohc.netlify.app/admin/`.
2. Log in with your email and password.
3. Open **Website Content → Homepage Content**, edit any field, click **Publish**.

---

## One-time setup (connect DecapBridge)

The site is already deployed to Netlify at `https://ccfaohc.netlify.app`. To turn
on email/password logins:

### 1. Create a GitHub access token (DecapBridge uses it to save changes)
- Go to https://github.com/settings/tokens (fine-grained token).
- Resource owner: your account. Repository access: only
  `christian-community-fellowship-aoh-church`.
- Repository permissions: **Contents → Read and write** (and **Pull requests →
  Read and write** if you later enable draft/editorial workflow).
- Generate and copy the token.

### 2. Create a DecapBridge account and add the site
- Sign up at https://decapbridge.com.
- **Add site** with:
  - Git provider: **GitHub**
  - Repository: `TESVM/christian-community-fellowship-aoh-church`
  - Git access token: the token from step 1
  - CMS login URL: `https://ccfaohc.netlify.app/admin/index.html`
  - Auth type: **Classic** (email + password)

### 3. Paste the generated backend into `admin/config.yml`
- DecapBridge shows a generated `backend:` block with your site's
  `gateway_url` and `identity_url`.
- In [`admin/config.yml`](admin/config.yml), replace the placeholder
  `identity_url` line (the `REPLACE-WITH-YOUR-DECAPBRIDGE-SITE-ID` one) with the
  value DecapBridge gives you. Commit the change (or send me the value and I'll
  commit it — these URLs are not secret).

### 4. Invite the church staff
- In DecapBridge → **Manage collaborators** → invite by email.
- They get an email, set a password, and can edit at `/admin/`.

---

## Notes

- Uploading a new hero photo: use the **Background image** field in the editor.
- The GitHub OAuth App created during earlier setup is **not** used and can be
  deleted.
- Free tier covers basic editing; managing admin-level users may require a paid
  DecapBridge plan — see their pricing.
- Only invited emails can log in; remove someone in DecapBridge's collaborators.
