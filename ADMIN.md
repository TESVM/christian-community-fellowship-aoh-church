# Content Admin Guide

Church staff edit the website at **`/admin/`** using a simple **email and
password** — no GitHub account required. It uses [Decap CMS](https://decapcms.org)
with **Netlify Identity + Git Gateway**: when staff publish a change, it commits
to this repository and Netlify redeploys the site automatically (live in a
minute or two).

Editable content lives in [`content/site.json`](content/site.json). The page
also keeps a copy of the text in the HTML, so the site never shows blank content
if the JSON is missing.

---

## Day-to-day editing

1. Go to `https://YOUR-SITE.netlify.app/admin/`.
2. Log in with your email and password.
3. Open **Website Content → Homepage Content**, edit any field, click **Publish**.

---

## One-time setup (deploy + turn on logins)

### 1. Deploy the site to Netlify
- In Netlify: **Add new project → Import an existing project → GitHub**, authorize,
  and choose `christian-community-fellowship-aoh-church`.
- Build command: leave **empty**. Publish directory: leave **empty** (or `.`).
- Click **Deploy**. You'll get a `something.netlify.app` URL.

### 2. Turn on email/password logins (Netlify Identity)
- Open the site in Netlify → **Identity** (or **Site configuration → Identity**)
  → **Enable Identity**.
- Under **Registration**, choose **Invite only** (recommended, so only invited
  staff can sign in).

### 3. Let the editor save changes (Git Gateway)
- Still under Identity → **Services → Git Gateway → Enable Git Gateway**.

### 4. Invite the church staff
- Identity → **Invite users** → enter each person's email.
- They get an email, click the link, set a password, and can then edit at
  `/admin/`.

That's it. The GitHub OAuth App created earlier is **not** used by this flow and
can be deleted.

---

## Notes

- Uploading a new hero photo: use the **Background image** field in the admin
  (it uploads into `images/uploads/`).
- If Netlify ever retires Identity on your plan, the alternative is Decap with a
  GitHub OAuth proxy (staff would then log in with GitHub). Ask before switching.
- Only invited emails can log in; remove someone by deleting them under Identity.
