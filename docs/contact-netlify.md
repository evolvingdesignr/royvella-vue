# Contact form · Netlify Forms

The Vue/Nuxt `/contact` page submits to Netlify Forms using a static form blueprint and a URL-encoded AJAX request. This is part of the **v0.0.0.1 — Hello, World.** release baseline; it does not change the displayed version.

## How it works

- `app/pages/contact.vue` validates required fields and email format before submission, prevents duplicate requests, gives sending/success/error feedback, preserves text when submission fails, and focuses the success heading for keyboard and screen-reader users.
- `public/__forms.html` lets Netlify discover the form during deployment. The form name is `contact`, and its submitted fields are `form-name`, `bot-field`, `name`, `email`, and `message`. Keep both definitions synchronized.
- The AJAX POST goes to `/__forms.html` with `application/x-www-form-urlencoded`. Posting to the Nuxt SSR root instead can bypass form processing.
- A hidden honeypot field helps with spam filtering. The browser never sees an email-service API key.

## Required Netlify checks before claiming mail delivery works

These dashboard steps require authenticated Netlify access and have **not been verified** by the repository edits alone.

1. Open [Vue Netlify Forms](https://app.netlify.com/projects/royvella-vue/forms). Enable **form detection** if needed.
2. Build and publish the latest GitHub `main` revision on the existing Vue project. Verify the deploy commit SHA matches GitHub. Do not change DNS or domain assignments.
3. Verify the **contact** form appears in the Forms dashboard. If it does not, inspect deployment form-detection logs and confirm the static `/__forms.html` file is published.
4. Under form submission notifications, configure an email notification for `contact` to **roy@royvella.com**.
5. Submit **one** realistic, uniquely identifiable message using an email address you control on https://www.royvella.com/contact. Confirm that exact message appears in **Verified submissions**. Check Netlify's Spam view if missing.
6. Confirm the notification actually arrives at roy@royvella.com, including Spam/Junk. An on-page success message alone does not prove delivery.
7. Check an invalid required field and a simulated/offline network failure. Inputs should remain populated on failure; successful submissions should show a confirmation.

**Autoreply:** This Vue implementation intentionally does **not** claim or implement an automatic email back to visitors. That would require separately approving and configuring a server-side mail integration. The Next.js experiment already has separate Netlify/Resend plumbing, which is not automatically shared with the Vue site.

## Local verification

```sh
npm ci
npm test
npm run validate:gallery
npm run typecheck
npm run build
```

The local Nuxt server cannot prove Netlify's form registration or email notification delivery. Netlify detection, end-to-end submission, and notification tests must happen against the published Vue project.
