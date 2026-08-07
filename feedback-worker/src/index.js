const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' };

function corsHeaders(origin, env) {
  const allowed = env.ALLOWED_ORIGIN || 'https://jeffreychen0604.github.io';
  const isAllowed = origin === allowed || origin === `${allowed}/`;
  return {
    'access-control-allow-origin': isAllowed ? origin : allowed,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
    'vary': 'Origin'
  };
}

function response(body, status, origin, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...corsHeaders(origin, env) }
  });
}

function clean(value, max = 1000) {
  return String(value || '').trim().slice(0, max);
}

async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(x => x.toString(16).padStart(2, '0')).join('');
}

async function verifyTurnstile(token, remoteip, env) {
  if (!env.TURNSTILE_SECRET) return true;
  if (!token) return false;

  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET);
  form.append('response', token);
  if (remoteip) form.append('remoteip', remoteip);

  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form
  }).then(r => r.json());

  return Boolean(result.success);
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin, env) });
    }

    const url = new URL(request.url);
    if (request.method !== 'POST' || url.pathname !== '/feedback') {
      return response({ ok: false, error: 'Not found' }, 404, origin, env);
    }

    const expectedOrigin = env.ALLOWED_ORIGIN || 'https://jeffreychen0604.github.io';
    if (origin && origin !== expectedOrigin && origin !== `${expectedOrigin}/`) {
      return response({ ok: false, error: 'Origin not allowed' }, 403, origin, env);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return response({ ok: false, error: 'Invalid JSON' }, 400, origin, env);
    }

    // Honeypot. Real users never fill this field.
    if (clean(payload.website, 200)) {
      return response({ ok: true }, 200, origin, env);
    }

    const type = clean(payload.type, 80);
    const title = clean(payload.title, 120);
    const details = clean(payload.details, 6000);
    const identity = clean(payload.identity, 80);
    const contact = clean(payload.contact, 160);
    const locale = clean(payload.locale, 8).toLowerCase();
    const page = clean(payload.page, 240);
    const turnstileToken = clean(payload.turnstileToken, 2048);

    if (!type || !title || details.length < 10) {
      return response({ ok: false, error: 'Type, title and details are required.' }, 400, origin, env);
    }

    const allowedTypes = new Set([
      'Game Wiki correction',
      'New Wiki information',
      'Charter proposal',
      'Operational Codex proposal',
      'Translation correction',
      'Server operation suggestion',
      'Other'
    ]);
    if (!allowedTypes.has(type)) {
      return response({ ok: false, error: 'Invalid feedback type.' }, 400, origin, env);
    }

    const remoteIp = request.headers.get('CF-Connecting-IP') || '';
    const turnstileOk = await verifyTurnstile(turnstileToken, remoteIp, env);
    if (!turnstileOk) {
      return response({ ok: false, error: 'Human verification failed.' }, 403, origin, env);
    }

    // Never store the raw IP. A salted hash is used only for basic abuse throttling.
    const salt = env.IP_HASH_SALT || 'server-504-feedback';
    const ipHash = await sha256(`${salt}:${remoteIp || 'unknown'}`);

    const recent = await env.DB.prepare(
      `SELECT COUNT(*) AS count
       FROM feedback
       WHERE ip_hash = ?1 AND created_at >= datetime('now', '-1 hour')`
    ).bind(ipHash).first();

    if ((recent?.count || 0) >= 8) {
      return response({ ok: false, error: 'Too many submissions. Please try again later.' }, 429, origin, env);
    }

    const id = crypto.randomUUID();
    await env.DB.prepare(
      `INSERT INTO feedback
       (id, type, title, details, identity, contact, locale, page, status, ip_hash, user_agent)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, 'pending', ?9, ?10)`
    ).bind(
      id,
      type,
      title,
      details,
      identity || null,
      contact || null,
      locale || 'en',
      page || '#/home',
      ipHash,
      clean(request.headers.get('User-Agent'), 300) || null
    ).run();

    return response({ ok: true, id, status: 'pending' }, 201, origin, env);
  }
};
