# Server 504 Anonymous Feedback Backend

This Worker receives public feedback from the Server 504 GitHub Pages site and stores submissions in Cloudflare D1. Readers do not need a GitHub account or any other login.

## Components

- Cloudflare Worker: `POST /feedback`
- Cloudflare D1: moderation inbox storage
- Optional Cloudflare Turnstile
- Privacy-friendly rate limiting using a salted hash of the visitor IP; raw IP addresses are never stored

## Deploy

1. Create a D1 database named `server-504-feedback`.
2. Apply `schema.sql` to the database.
3. Copy `wrangler.toml.example` to `wrangler.toml` and replace `REPLACE_WITH_D1_DATABASE_ID`.
4. Add a strong random `IP_HASH_SALT` secret.
5. Deploy the Worker.
6. Put the deployed Worker base URL in `assets/feedback-config.js`, for example:
   `window.SERVER504_CONFIG.feedbackApi = 'https://server-504-feedback.<subdomain>.workers.dev';`
7. Optional: create a Turnstile site, add `TURNSTILE_SECRET` to the Worker, and wire its site key into the frontend.

## Submission lifecycle

New records start with `status = pending`. Supported moderation states are:

- pending
- accepted
- rejected
- applied
- spam

The public site does not expose submissions. A moderator inbox can be added later without changing the public submission API.
