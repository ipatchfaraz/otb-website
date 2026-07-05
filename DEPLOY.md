# Deploying OTB Website — one-time production setup

This walks through the extra steps needed on Vercel to turn on the CMS,
lead capture, and admin panel. Do them in this order.

The site is **already deployed** — every step below is what you do
_after_ the Git integration works.

---

## 1. Attach a Postgres database

In your Vercel dashboard:

1. Open the `otb-website` project → **Storage** tab
2. Click **Create Database** → **Postgres** (Neon-backed)
3. Region: pick the one closest to you (Singapore or Frankfurt for KL)
4. Click **Create** — Vercel auto-injects `DATABASE_URL` and related
   env vars into the project.

Then apply the schema:

- Locally, with `DATABASE_URL` set: `npx prisma db push`
- Or via Vercel: **Storage → Postgres → Query** and paste the SQL from
  `prisma/migrations/` (if you use migrations)

For a first run, `npx prisma db push` is the quick option.

## 2. Set the auth env vars

Under **Settings → Environment Variables** add these (Production + Preview):

| Name                     | Value                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `NEXTAUTH_SECRET`        | run `openssl rand -base64 32` and paste the output                                       |
| `ADMIN_EMAIL`            | `outtatheboxhq@gmail.com` (or any email you want to log in with)                         |
| `ADMIN_PASSWORD_HASH`    | bcrypt hash of your admin password — see below                                            |

Generate the hash locally:

```sh
node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 10))" 'YourStrongPassword!'
```

Paste the string that starts with `$2a$` or `$2b$` into
`ADMIN_PASSWORD_HASH`.

> First login: use `ADMIN_EMAIL` + your plaintext password. On success the
> app creates the `AdminUser` row automatically. From then on that row is
> the source of truth — you can rotate `ADMIN_PASSWORD_HASH` and it will
> only matter for future bootstraps.

## 3. Set the Resend env vars (lead magnet)

1. Sign up at [resend.com](https://resend.com) — free tier is 3k emails/mo.
2. **API Keys → Create API Key** → copy the value.
3. **Audiences → Create Audience** → name it "OTB Kit Downloads" (or similar) → copy the audience ID.

Add to Vercel env vars:

| Name                 | Value                        |
| -------------------- | ---------------------------- |
| `RESEND_API_KEY`     | `re_...`                     |
| `RESEND_AUDIENCE_ID` | `xxxxxxxx-xxxx-xxxx-xxxx-…`  |

> Without these two vars set, the kit form still works — leads go into
> the Postgres `Lead` table, they just don't sync to Resend.

## 4. Redeploy

Env vars added under **Settings** only affect _new_ deploys. Trigger one
by pushing any commit, or from the **Deployments** tab click the latest
deploy → **⋯** → **Redeploy**.

## 5. First run — populate the database

1. Visit `https://<your-url>/admin/login` in your browser.
2. Sign in with `ADMIN_EMAIL` + your plaintext password.
3. On the dashboard you'll see a yellow banner:
   **DB IS EMPTY — SEED FROM STATIC**. Click it.
4. This copies the 13 case studies + 3 journal entries from the
   compiled code into Postgres so you can edit them.

Now you're live. Every save from `/admin/projects` or `/admin/journal`
triggers a `revalidatePath` so the public site updates within seconds.

---

## Content editing quick reference

### Projects (`/admin/projects`)

Every row is one project. The sidebar shows the Work grid order. The
editor lets you edit:

- **Grid card:** client name, title, one-liner (Work grid), tagline
  (case-study hero), discipline, tags, cover image URL, case file label
- **Case study:** sector, scope, year, brief, all five chapters,
  hero image, and the gallery (as JSON — an array of
  `{img, alt, col, tag, caption}` objects)

Toggle **PUBLISHED** to hide a project from the public site while you
finish it.

### Journal (`/admin/journal`)

- Meta: log number, category, read time, date, author info, thumbnail URL
- Copy: title, dek, and the body as a JSON array of blocks.
  Block types: `{"t":"p","v":"…"}`, `{"t":"h","v":"…"}`,
  `{"t":"quote","v":"…"}`, `{"t":"list","v":["…","…"]}`

### Leads (`/admin/leads`)

Every kit download. Click **EXPORT CSV** to grab everything. If Resend
sync failed for a row, the error shows in the RESEND column.

---

## Troubleshooting

**"DATABASE_URL is not configured"** on the admin panel — Vercel didn't
finish attaching the DB. Re-check Storage → Postgres → **Connected
projects** and redeploy.

**Login says "INVALID CREDENTIALS"** — the bcrypt hash in
`ADMIN_PASSWORD_HASH` doesn't match the password you're typing.
Regenerate the hash and update the env var.

**Emails aren't reaching Resend** — check `/admin/leads`. If rows are
present but the RESEND column shows an error, your API key or audience
ID is wrong. If rows aren't appearing at all, `DATABASE_URL` isn't set
or the API POST is failing (check the browser console on the homepage
after submitting).
