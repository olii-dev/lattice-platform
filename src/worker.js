var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var __defProp22 = Object.defineProperty;
var __name22 = /* @__PURE__ */ __name2((target, value) => __defProp22(target, "name", { value, configurable: true }), "__name");
var __defProp222 = Object.defineProperty;
var __name222 = /* @__PURE__ */ __name22((target, value) => __defProp222(target, "name", { value, configurable: true }), "__name");
var __defProp2222 = Object.defineProperty;
var __name2222 = /* @__PURE__ */ __name222((target, value) => __defProp2222(target, "name", { value, configurable: true }), "__name");
var __defProp22222 = Object.defineProperty;
var __name22222 = /* @__PURE__ */ __name2222((target, value) => __defProp22222(target, "name", { value, configurable: true }), "__name");
var __defProp222222 = Object.defineProperty;
var __name222222 = /* @__PURE__ */ __name22222((target, value) => __defProp222222(target, "name", { value, configurable: true }), "__name");
var __defProp2222222 = Object.defineProperty;
var __name2222222 = /* @__PURE__ */ __name222222((target, value) => __defProp2222222(target, "name", { value, configurable: true }), "__name");
var __defProp22222222 = Object.defineProperty;
var __name22222222 = /* @__PURE__ */ __name2222222((target, value) => __defProp22222222(target, "name", { value, configurable: true }), "__name");
var SESSION_COOKIE = "lat_sess";
var SESSION_DAYS = 30;
var PBKDF2_ITERATIONS = 1e5;
var KEY_PREFIX = "lq_";
var MAX_KEYS_PER_USER = 5;
var API_ACCOUNT_RPM_LIMIT = 50;
var API_ACCOUNT_DAILY_LIMIT = 1e3;
var WEB_CHAT_HOURLY_LIMIT = 40;
var LOG_KEEP_DAYS = 14;
function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers }
  });
}
__name(json, "json");
__name2(json, "json");
__name22(json, "json");
__name222(json, "json");
__name2222(json, "json");
__name22222(json, "json");
__name222222(json, "json");
__name2222222(json, "json");
__name22222222(json, "json");
function now() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(now, "now");
__name2(now, "now");
__name22(now, "now");
__name222(now, "now");
__name2222(now, "now");
__name22222(now, "now");
__name222222(now, "now");
__name2222222(now, "now");
__name22222222(now, "now");
function dayKey(d = /* @__PURE__ */ new Date()) {
  return d.toISOString().slice(0, 10);
}
__name(dayKey, "dayKey");
__name2(dayKey, "dayKey");
__name22(dayKey, "dayKey");
__name222(dayKey, "dayKey");
__name2222(dayKey, "dayKey");
__name22222(dayKey, "dayKey");
__name222222(dayKey, "dayKey");
__name2222222(dayKey, "dayKey");
__name22222222(dayKey, "dayKey");
function randomHex(bytes) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return [...arr].map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(randomHex, "randomHex");
__name2(randomHex, "randomHex");
__name22(randomHex, "randomHex");
__name222(randomHex, "randomHex");
__name2222(randomHex, "randomHex");
__name22222(randomHex, "randomHex");
__name222222(randomHex, "randomHex");
__name2222222(randomHex, "randomHex");
__name22222222(randomHex, "randomHex");
function randomKey() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return KEY_PREFIX + [...arr].map((b) => alphabet[b % alphabet.length]).join("");
}
__name(randomKey, "randomKey");
__name2(randomKey, "randomKey");
__name22(randomKey, "randomKey");
__name222(randomKey, "randomKey");
__name2222(randomKey, "randomKey");
__name22222(randomKey, "randomKey");
__name222222(randomKey, "randomKey");
__name2222222(randomKey, "randomKey");
__name22222222(randomKey, "randomKey");
async function sha256hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(sha256hex, "sha256hex");
__name2(sha256hex, "sha256hex");
__name22(sha256hex, "sha256hex");
__name222(sha256hex, "sha256hex");
__name2222(sha256hex, "sha256hex");
__name22222(sha256hex, "sha256hex");
__name222222(sha256hex, "sha256hex");
__name2222222(sha256hex, "sha256hex");
__name22222222(sha256hex, "sha256hex");
async function hashPassword(password, saltHex, iterations = PBKDF2_ITERATIONS) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const salt = new Uint8Array(saltHex.match(/../g).map((h) => parseInt(h, 16)));
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    key,
    256
  );
  const hashHex = [...new Uint8Array(bits)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `v1:${iterations}:${saltHex}:${hashHex}`;
}
__name(hashPassword, "hashPassword");
__name2(hashPassword, "hashPassword");
__name22(hashPassword, "hashPassword");
__name222(hashPassword, "hashPassword");
__name2222(hashPassword, "hashPassword");
__name22222(hashPassword, "hashPassword");
__name222222(hashPassword, "hashPassword");
__name2222222(hashPassword, "hashPassword");
__name22222222(hashPassword, "hashPassword");
async function verifyPassword(password, stored) {
  const [v, iter, salt, hash] = (stored || "").split(":");
  if (v !== "v1" || !iter || !salt || !hash) return false;
  const candidate = await hashPassword(password, salt, parseInt(iter, 10));
  const a = candidate.split(":")[3];
  if (a.length !== hash.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ hash.charCodeAt(i);
  return diff === 0;
}
__name(verifyPassword, "verifyPassword");
__name2(verifyPassword, "verifyPassword");
__name22(verifyPassword, "verifyPassword");
__name222(verifyPassword, "verifyPassword");
__name2222(verifyPassword, "verifyPassword");
__name22222(verifyPassword, "verifyPassword");
__name222222(verifyPassword, "verifyPassword");
__name2222222(verifyPassword, "verifyPassword");
__name22222222(verifyPassword, "verifyPassword");
function cookieHeader(token, maxAgeSec) {
  const parts = [
    `${SESSION_COOKIE}=${token}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax"
  ];
  if (maxAgeSec !== void 0) parts.push(`Max-Age=${maxAgeSec}`);
  return parts.join("; ");
}
__name(cookieHeader, "cookieHeader");
__name2(cookieHeader, "cookieHeader");
__name22(cookieHeader, "cookieHeader");
__name222(cookieHeader, "cookieHeader");
__name2222(cookieHeader, "cookieHeader");
__name22222(cookieHeader, "cookieHeader");
__name222222(cookieHeader, "cookieHeader");
__name2222222(cookieHeader, "cookieHeader");
__name22222222(cookieHeader, "cookieHeader");
function getCookie(request, name) {
  const raw = request.headers.get("Cookie") || "";
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}
__name(getCookie, "getCookie");
__name2(getCookie, "getCookie");
__name22(getCookie, "getCookie");
__name222(getCookie, "getCookie");
__name2222(getCookie, "getCookie");
__name22222(getCookie, "getCookie");
__name222222(getCookie, "getCookie");
__name2222222(getCookie, "getCookie");
__name22222222(getCookie, "getCookie");
function adminEmails(env) {
  return (env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
__name(adminEmails, "adminEmails");
__name2(adminEmails, "adminEmails");
__name22(adminEmails, "adminEmails");
__name222(adminEmails, "adminEmails");
__name2222(adminEmails, "adminEmails");
__name22222(adminEmails, "adminEmails");
__name222222(adminEmails, "adminEmails");
__name2222222(adminEmails, "adminEmails");
__name22222222(adminEmails, "adminEmails");
function publicUser(u) {
  return {
    id: u.id,
    email: u.email,
    username: u.username,
    is_admin: !!u.is_admin,
    created_at: u.created_at,
    verified: !!u.verified_at
  };
}
__name(publicUser, "publicUser");
__name2(publicUser, "publicUser");
__name22(publicUser, "publicUser");
__name222(publicUser, "publicUser");
__name2222(publicUser, "publicUser");
__name22222(publicUser, "publicUser");
__name222222(publicUser, "publicUser");
__name2222222(publicUser, "publicUser");
__name22222222(publicUser, "publicUser");
async function callBackend(env, path, body, { method = "POST", timeoutMs = 6e4 } = {}) {
  const base = (env.BACKEND_URL || "").replace(/\/+$/, "");
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const res = await fetch(base + path, {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-Lattice-Secret": env.LATTICE_API_SECRET
      },
      body: method === "POST" ? JSON.stringify(body || {}) : void 0,
      signal: ctl.signal
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.detail || data.error || `Backend error ${res.status}`);
      err.status = res.status;
      throw err;
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}
__name(callBackend, "callBackend");
__name2(callBackend, "callBackend");
__name22(callBackend, "callBackend");
__name222(callBackend, "callBackend");
__name2222(callBackend, "callBackend");
__name22222(callBackend, "callBackend");
__name222222(callBackend, "callBackend");
__name2222222(callBackend, "callBackend");
__name22222222(callBackend, "callBackend");
async function createSession(env, userId) {
  const token = randomHex(32);
  const tokenHash = await sha256hex(token);
  const expires = new Date(Date.now() + SESSION_DAYS * 864e5).toISOString();
  await env.DB.prepare(
    "INSERT INTO sessions (token_hash, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)"
  ).bind(tokenHash, userId, now(), expires).run();
  return token;
}
__name(createSession, "createSession");
__name2(createSession, "createSession");
__name22(createSession, "createSession");
__name222(createSession, "createSession");
__name2222(createSession, "createSession");
__name22222(createSession, "createSession");
__name222222(createSession, "createSession");
__name2222222(createSession, "createSession");
__name22222222(createSession, "createSession");
async function getSessionUser(request, env) {
  const token = getCookie(request, SESSION_COOKIE);
  if (!token) return null;
  const tokenHash = await sha256hex(token);
  const row = await env.DB.prepare(
    `SELECT u.*, s.expires_at AS sess_expires FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = ?`
  ).bind(tokenHash).first();
  if (!row) return null;
  if (row.sess_expires < now() || row.banned_at) return null;
  return row;
}
__name(getSessionUser, "getSessionUser");
__name2(getSessionUser, "getSessionUser");
__name22(getSessionUser, "getSessionUser");
__name222(getSessionUser, "getSessionUser");
__name2222(getSessionUser, "getSessionUser");
__name22222(getSessionUser, "getSessionUser");
__name222222(getSessionUser, "getSessionUser");
__name2222222(getSessionUser, "getSessionUser");
__name22222222(getSessionUser, "getSessionUser");
function touchUser(env, userId) {
  return env.DB.prepare("UPDATE users SET last_active_at = ? WHERE id = ?").bind(now(), userId).run();
}
__name(touchUser, "touchUser");
__name2(touchUser, "touchUser");
__name22(touchUser, "touchUser");
__name222(touchUser, "touchUser");
__name2222(touchUser, "touchUser");
__name22222(touchUser, "touchUser");
__name222222(touchUser, "touchUser");
__name2222222(touchUser, "touchUser");
__name22222222(touchUser, "touchUser");
async function requireUser(request, env) {
  const user = await getSessionUser(request, env);
  if (!user) throw Object.assign(new Error("Not signed in"), { status: 401 });
  return user;
}
__name(requireUser, "requireUser");
__name2(requireUser, "requireUser");
__name22(requireUser, "requireUser");
__name222(requireUser, "requireUser");
__name2222(requireUser, "requireUser");
__name22222(requireUser, "requireUser");
__name222222(requireUser, "requireUser");
__name2222222(requireUser, "requireUser");
__name22222222(requireUser, "requireUser");
async function requireAdmin(request, env) {
  const user = await requireUser(request, env);
  if (!user.is_admin) throw Object.assign(new Error("Admin only"), { status: 403 });
  return user;
}
__name(requireAdmin, "requireAdmin");
__name2(requireAdmin, "requireAdmin");
__name22(requireAdmin, "requireAdmin");
__name222(requireAdmin, "requireAdmin");
__name2222(requireAdmin, "requireAdmin");
__name22222(requireAdmin, "requireAdmin");
__name222222(requireAdmin, "requireAdmin");
__name2222222(requireAdmin, "requireAdmin");
__name22222222(requireAdmin, "requireAdmin");
async function bumpWindow(env, subject, windowKey) {
  await env.DB.prepare(
    `INSERT INTO rate_windows (subject, window, count) VALUES (?, ?, 1)
     ON CONFLICT(subject, window) DO UPDATE SET count = count + 1`
  ).bind(subject, windowKey).run();
  const row = await env.DB.prepare(
    "SELECT count FROM rate_windows WHERE subject = ? AND window = ?"
  ).bind(subject, windowKey).first();
  return row ? row.count : 1;
}
__name(bumpWindow, "bumpWindow");
__name2(bumpWindow, "bumpWindow");
__name22(bumpWindow, "bumpWindow");
__name222(bumpWindow, "bumpWindow");
__name2222(bumpWindow, "bumpWindow");
__name22222(bumpWindow, "bumpWindow");
__name222222(bumpWindow, "bumpWindow");
__name2222222(bumpWindow, "bumpWindow");
__name22222222(bumpWindow, "bumpWindow");
async function checkMinuteLimit(env, subject, limit) {
  const windowKey = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16);
  const count = await bumpWindow(env, subject + ":m", windowKey);
  return count <= limit;
}
__name(checkMinuteLimit, "checkMinuteLimit");
__name2(checkMinuteLimit, "checkMinuteLimit");
__name22(checkMinuteLimit, "checkMinuteLimit");
__name222(checkMinuteLimit, "checkMinuteLimit");
__name2222(checkMinuteLimit, "checkMinuteLimit");
__name22222(checkMinuteLimit, "checkMinuteLimit");
__name222222(checkMinuteLimit, "checkMinuteLimit");
__name2222222(checkMinuteLimit, "checkMinuteLimit");
__name22222222(checkMinuteLimit, "checkMinuteLimit");
async function recordUsage(env, { userId, keyId = "", source, model, status, latencyMs, promptChars, completionChars, promptTokens, completionTokens, error }) {
  const day = dayKey();
  const isError = status >= 400 ? 1 : 0;
  if (promptTokens == null) promptTokens = Math.ceil(promptChars / 4);
  if (completionTokens == null) completionTokens = Math.ceil(completionChars / 4);
  const stmts = [
    env.DB.prepare(
      `INSERT INTO usage_daily (user_id, key_id, day, requests, errors, prompt_chars, completion_chars, prompt_tokens, completion_tokens)
       VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?)
       ON CONFLICT(user_id, key_id, day) DO UPDATE SET
         requests = requests + 1,
         errors = errors + excluded.errors,
         prompt_chars = prompt_chars + excluded.prompt_chars,
         completion_chars = completion_chars + excluded.completion_chars,
         prompt_tokens = prompt_tokens + excluded.prompt_tokens,
         completion_tokens = completion_tokens + excluded.completion_tokens`
    ).bind(userId, keyId, day, isError, promptChars, completionChars, promptTokens, completionTokens),
    env.DB.prepare(
      `INSERT INTO request_log (id, ts, user_id, key_id, source, model, status, latency_ms, prompt_chars, completion_chars, prompt_tokens, completion_tokens, error)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(randomHex(16), now(), userId, keyId, source, model, status, latencyMs, promptChars, completionChars, promptTokens, completionTokens, error || null),
    env.DB.prepare(
      `INSERT INTO usage_dims_daily (day, user_id, source, model, requests, errors, prompt_tokens, completion_tokens)
       VALUES (?, ?, ?, ?, 1, ?, ?, ?)
       ON CONFLICT(day, user_id, source, model) DO UPDATE SET
         requests = requests + 1,
         errors = errors + excluded.errors,
         prompt_tokens = prompt_tokens + excluded.prompt_tokens,
         completion_tokens = completion_tokens + excluded.completion_tokens`
    ).bind(day, userId, source, model, isError, promptTokens, completionTokens)
  ];
  if (keyId) {
    stmts.push(env.DB.prepare("UPDATE api_keys SET last_used_at = ? WHERE id = ?").bind(now(), keyId));
  }
  if (Math.random() < 0.02) {
    const cutoff = new Date(Date.now() - LOG_KEEP_DAYS * 864e5).toISOString();
    stmts.push(env.DB.prepare("DELETE FROM request_log WHERE ts < ?").bind(cutoff));
    stmts.push(env.DB.prepare("DELETE FROM rate_windows WHERE window < ?").bind(cutoff.slice(0, 16)));
  }
  await env.DB.batch(stmts);
}
__name(recordUsage, "recordUsage");
__name2(recordUsage, "recordUsage");
__name22(recordUsage, "recordUsage");
__name222(recordUsage, "recordUsage");
__name2222(recordUsage, "recordUsage");
__name22222(recordUsage, "recordUsage");
__name222222(recordUsage, "recordUsage");
__name2222222(recordUsage, "recordUsage");
__name22222222(recordUsage, "recordUsage");
async function sendVerificationEmail(env, to, code) {
  if (!env.RESEND_API_KEY) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Lattice <verify@mebbo.cloud>",
        to: [to],
        subject: "Your Lattice verification code",
        text: `Your Lattice verification code is: ${code}

It expires in 15 minutes. If you didn't sign up, ignore this email.`
      })
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}
__name(sendVerificationEmail, "sendVerificationEmail");
__name2(sendVerificationEmail, "sendVerificationEmail");
__name22(sendVerificationEmail, "sendVerificationEmail");
__name222(sendVerificationEmail, "sendVerificationEmail");
__name2222(sendVerificationEmail, "sendVerificationEmail");
__name22222(sendVerificationEmail, "sendVerificationEmail");
__name222222(sendVerificationEmail, "sendVerificationEmail");
__name2222222(sendVerificationEmail, "sendVerificationEmail");
__name22222222(sendVerificationEmail, "sendVerificationEmail");
async function issueEmailCode(env, userId, email) {
  const code = String(Math.floor(1e5 + Math.random() * 9e5));
  const codeHash = await sha256hex(code);
  const expires = new Date(Date.now() + 15 * 6e4).toISOString();
  await env.DB.prepare("DELETE FROM email_codes WHERE user_id = ?").bind(userId).run();
  await env.DB.prepare("INSERT INTO email_codes (user_id, code_hash, expires_at, created_at) VALUES (?, ?, ?, ?)").bind(userId, codeHash, expires, now()).run();
  return sendVerificationEmail(env, email, code);
}
__name(issueEmailCode, "issueEmailCode");
__name2(issueEmailCode, "issueEmailCode");
__name22(issueEmailCode, "issueEmailCode");
__name222(issueEmailCode, "issueEmailCode");
__name2222(issueEmailCode, "issueEmailCode");
__name22222(issueEmailCode, "issueEmailCode");
__name222222(issueEmailCode, "issueEmailCode");
__name2222222(issueEmailCode, "issueEmailCode");
__name22222222(issueEmailCode, "issueEmailCode");
async function handleVerifyEmail(request, env, user) {
  const { code } = await request.json().catch(() => ({}));
  const clean = String(code || "").trim();
  if (!/^\d{6}$/.test(clean)) return json({ error: "Enter the 6-digit code from your email" }, 400);
  const row = await env.DB.prepare("SELECT * FROM email_codes WHERE user_id = ?").bind(user.id).first();
  if (!row || row.expires_at < now()) return json({ error: "Code expired - request a new one" }, 400);
  if ((row.attempts || 0) >= 5) return json({ error: "Too many tries - request a new code" }, 429);
  const hash = await sha256hex(clean);
  if (hash !== row.code_hash) {
    await env.DB.prepare("UPDATE email_codes SET attempts = attempts + 1 WHERE user_id = ?").bind(user.id).run();
    return json({ error: "Wrong code - check the email and try again" }, 400);
  }
  await env.DB.prepare("UPDATE users SET verified_at = ? WHERE id = ?").bind(now(), user.id).run();
  await env.DB.prepare("DELETE FROM email_codes WHERE user_id = ?").bind(user.id).run();
  return json({ ok: true });
}
__name(handleVerifyEmail, "handleVerifyEmail");
__name2(handleVerifyEmail, "handleVerifyEmail");
__name22(handleVerifyEmail, "handleVerifyEmail");
__name222(handleVerifyEmail, "handleVerifyEmail");
__name2222(handleVerifyEmail, "handleVerifyEmail");
__name22222(handleVerifyEmail, "handleVerifyEmail");
__name222222(handleVerifyEmail, "handleVerifyEmail");
__name2222222(handleVerifyEmail, "handleVerifyEmail");
__name22222222(handleVerifyEmail, "handleVerifyEmail");
async function handleResendCode(env, user) {
  if (user.verified_at) return json({ ok: true, already: true });
  const sent = await issueEmailCode(env, user.id, user.email);
  if (!sent) return json({ error: "Couldn't send the email right now - try again in a minute" }, 502);
  return json({ ok: true });
}
__name(handleResendCode, "handleResendCode");
__name2(handleResendCode, "handleResendCode");
__name22(handleResendCode, "handleResendCode");
__name222(handleResendCode, "handleResendCode");
__name2222(handleResendCode, "handleResendCode");
__name22222(handleResendCode, "handleResendCode");
__name222222(handleResendCode, "handleResendCode");
__name2222222(handleResendCode, "handleResendCode");
__name22222222(handleResendCode, "handleResendCode");
async function handleSignup(request, env) {
  const { email, password } = await request.json().catch(() => ({}));
  const cleanEmail = String(email || "").trim().toLowerCase();
  const cleanName = cleanEmail.split("@")[0].replace(/[^A-Za-z0-9_.\-]/g, "").slice(0, 24) || "user";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return json({ error: "Enter a valid email address" }, 400);
  }
  if (typeof password !== "string" || password.length < 8) {
    return json({ error: "Password must be at least 8 characters" }, 400);
  }
  const existing = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(cleanEmail).first();
  if (existing) return json({ error: "An account with that email already exists" }, 409);
  const id = randomHex(16);
  const salt = randomHex(16);
  const passHash = await hashPassword(password, salt);
  const isAdmin = adminEmails(env).includes(cleanEmail) ? 1 : 0;
  try {
    await env.DB.prepare(
      "INSERT INTO users (id, email, username, pass_hash, is_admin, created_at, last_active_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(id, cleanEmail, cleanName, passHash, isAdmin, now(), now()).run();
  } catch (e) {
    if (String(e.message || "").includes("UNIQUE")) {
      return json({ error: "An account with that email already exists" }, 409);
    }
    throw e;
  }
  const token = await createSession(env, id);
  const sent = await issueEmailCode(env, id, cleanEmail);
  return json({ user: { id, email: cleanEmail, username: cleanName, is_admin: !!isAdmin, verified: false }, verification_sent: sent }, 201, {
    "Set-Cookie": cookieHeader(token, SESSION_DAYS * 86400)
  });
}
__name(handleSignup, "handleSignup");
__name2(handleSignup, "handleSignup");
__name22(handleSignup, "handleSignup");
__name222(handleSignup, "handleSignup");
__name2222(handleSignup, "handleSignup");
__name22222(handleSignup, "handleSignup");
__name222222(handleSignup, "handleSignup");
__name2222222(handleSignup, "handleSignup");
__name22222222(handleSignup, "handleSignup");
async function handleLogin(request, env) {
  const { email, password } = await request.json().catch(() => ({}));
  const cleanEmail = String(email || "").trim().toLowerCase();
  const user = await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(cleanEmail).first();
  if (!user || !await verifyPassword(String(password || ""), user.pass_hash)) {
    return json({ error: "Wrong email or password" }, 401);
  }
  if (user.banned_at) return json({ error: "This account is suspended" }, 403);
  if (!user.is_admin && adminEmails(env).includes(cleanEmail)) {
    await env.DB.prepare("UPDATE users SET is_admin = 1 WHERE id = ?").bind(user.id).run();
    user.is_admin = 1;
  }
  await touchUser(env, user.id);
  const token = await createSession(env, user.id);
  return json({ user: publicUser(user) }, 200, {
    "Set-Cookie": cookieHeader(token, SESSION_DAYS * 86400)
  });
}
__name(handleLogin, "handleLogin");
__name2(handleLogin, "handleLogin");
__name22(handleLogin, "handleLogin");
__name222(handleLogin, "handleLogin");
__name2222(handleLogin, "handleLogin");
__name22222(handleLogin, "handleLogin");
__name222222(handleLogin, "handleLogin");
__name2222222(handleLogin, "handleLogin");
__name22222222(handleLogin, "handleLogin");
async function handleLogout(request, env) {
  const token = getCookie(request, SESSION_COOKIE);
  if (token) {
    await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await sha256hex(token)).run();
  }
  return json({ ok: true }, 200, { "Set-Cookie": cookieHeader("deleted", 0) });
}
__name(handleLogout, "handleLogout");
__name2(handleLogout, "handleLogout");
__name22(handleLogout, "handleLogout");
__name222(handleLogout, "handleLogout");
__name2222(handleLogout, "handleLogout");
__name22222(handleLogout, "handleLogout");
__name222222(handleLogout, "handleLogout");
__name2222222(handleLogout, "handleLogout");
__name22222222(handleLogout, "handleLogout");
async function handleMe(request, env) {
  const user = await getSessionUser(request, env);
  if (!user) return json({ user: null }, 401);
  return json({ user: publicUser(user) });
}
__name(handleMe, "handleMe");
__name2(handleMe, "handleMe");
__name22(handleMe, "handleMe");
__name222(handleMe, "handleMe");
__name2222(handleMe, "handleMe");
__name22222(handleMe, "handleMe");
__name222222(handleMe, "handleMe");
__name2222222(handleMe, "handleMe");
__name22222222(handleMe, "handleMe");
var jwksCache = { keys: null, fetchedAt: 0 };
function b64urlToBytes(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
__name(b64urlToBytes, "b64urlToBytes");
__name2(b64urlToBytes, "b64urlToBytes");
__name22(b64urlToBytes, "b64urlToBytes");
__name222(b64urlToBytes, "b64urlToBytes");
__name2222(b64urlToBytes, "b64urlToBytes");
__name22222(b64urlToBytes, "b64urlToBytes");
__name222222(b64urlToBytes, "b64urlToBytes");
__name2222222(b64urlToBytes, "b64urlToBytes");
async function clerkJwks(env) {
  if (jwksCache.keys && Date.now() - jwksCache.fetchedAt < 36e5) return jwksCache.keys;
  const url = env.CLERK_JWKS_URL || "https://clerk.mebbo.cloud/.well-known/jwks.json";
  const res = await fetch(url);
  if (!res.ok) throw Object.assign(new Error("Could not reach Clerk"), { status: 502 });
  const data = await res.json();
  jwksCache = { keys: data.keys || [], fetchedAt: Date.now() };
  return jwksCache.keys;
}
__name(clerkJwks, "clerkJwks");
__name2(clerkJwks, "clerkJwks");
__name22(clerkJwks, "clerkJwks");
__name222(clerkJwks, "clerkJwks");
__name2222(clerkJwks, "clerkJwks");
__name22222(clerkJwks, "clerkJwks");
__name222222(clerkJwks, "clerkJwks");
__name2222222(clerkJwks, "clerkJwks");
async function verifyClerkToken(token, env) {
  const parts = (token || "").split(".");
  if (parts.length !== 3) throw Object.assign(new Error("Bad token"), { status: 401 });
  const header = JSON.parse(new TextDecoder().decode(b64urlToBytes(parts[0])));
  const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(parts[1])));
  if (!payload.sub || !payload.exp) throw Object.assign(new Error("Bad token"), { status: 401 });
  if (payload.exp * 1e3 < Date.now() - 6e4) throw Object.assign(new Error("Session expired - sign in again"), { status: 401 });
  const keys = await clerkJwks(env);
  let jwk = keys.find((k) => k.kid === header.kid && k.kty === "RSA");
  if (!jwk) {
    jwksCache = { keys: null, fetchedAt: 0 };
    const retry = await clerkJwks(env);
    jwk = retry.find((k) => k.kid === header.kid && k.kty === "RSA");
    if (!jwk) throw Object.assign(new Error("Unknown signing key"), { status: 401 });
  }
  const key = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const ok = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    b64urlToBytes(parts[2]),
    new TextEncoder().encode(parts[0] + "." + parts[1])
  );
  if (!ok) throw Object.assign(new Error("Bad token signature"), { status: 401 });
  return payload;
}
__name(verifyClerkToken, "verifyClerkToken");
__name2(verifyClerkToken, "verifyClerkToken");
__name22(verifyClerkToken, "verifyClerkToken");
__name222(verifyClerkToken, "verifyClerkToken");
__name2222(verifyClerkToken, "verifyClerkToken");
__name22222(verifyClerkToken, "verifyClerkToken");
__name222222(verifyClerkToken, "verifyClerkToken");
__name2222222(verifyClerkToken, "verifyClerkToken");
async function handleClerkAuth(request, env) {
  const { token } = await request.json().catch(() => ({}));
  if (!token) return json({ error: "Missing token" }, 400);
  if (!env.CLERK_SECRET_KEY) return json({ error: "Clerk is not configured" }, 503);
  const payload = await verifyClerkToken(token, env);
  const res = await fetch("https://api.clerk.com/v1/users/" + encodeURIComponent(payload.sub), {
    headers: { Authorization: "Bearer " + env.CLERK_SECRET_KEY }
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return json({ error: `Could not load your Clerk account (${res.status})`, detail: detail.slice(0, 300) }, 502);
  }
  const cu = await res.json();
  const addrs = cu.email_addresses || [];
  const primary = addrs.find((a) => a.id === cu.primary_email_address_id) || addrs[0];
  if (!primary || !primary.email_address) return json({ error: "No email on your Clerk account" }, 400);
  if (primary.verification && primary.verification.status !== "verified") {
    return json({ error: "Verify your email with Clerk first" }, 403);
  }
  const email = primary.email_address.toLowerCase();
  let user = await env.DB.prepare("SELECT * FROM users WHERE clerk_id = ?").bind(cu.id).first();
  if (!user) user = await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
  const isAdmin = adminEmails(env).includes(email) ? 1 : 0;
  if (user) {
    if (user.banned_at) return json({ error: "This account is banned" }, 403);
    await env.DB.prepare(
      "UPDATE users SET clerk_id = ?, verified_at = COALESCE(verified_at, ?), is_admin = MAX(is_admin, ?), last_active_at = ? WHERE id = ?"
    ).bind(cu.id, now(), isAdmin, now(), user.id).run();
    user = await env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(user.id).first();
  } else {
    const id = randomHex(8);
    await env.DB.prepare(
      "INSERT INTO users (id, email, username, pass_hash, is_admin, created_at, last_active_at, verified_at, clerk_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(id, email, email.split("@")[0].slice(0, 32), "clerk-managed", isAdmin, now(), now(), now(), cu.id).run();
    user = await env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(id).first();
  }
  const sessionToken = await createSession(env, user.id);
  return json({ user: publicUser(user) }, 200, {
    "Set-Cookie": cookieHeader(sessionToken, SESSION_DAYS * 86400)
  });
}
__name(handleClerkAuth, "handleClerkAuth");
__name2(handleClerkAuth, "handleClerkAuth");
__name22(handleClerkAuth, "handleClerkAuth");
__name222(handleClerkAuth, "handleClerkAuth");
__name2222(handleClerkAuth, "handleClerkAuth");
__name22222(handleClerkAuth, "handleClerkAuth");
__name222222(handleClerkAuth, "handleClerkAuth");
__name2222222(handleClerkAuth, "handleClerkAuth");
async function handleListKeys(env, user) {
  const { results } = await env.DB.prepare(
    `SELECT k.id, k.name, k.prefix, k.rpm_limit, k.daily_limit, k.created_at, k.last_used_at, k.revoked_at,
            COALESCE(u.requests, 0) AS requests_today
     FROM api_keys k
     LEFT JOIN usage_daily u ON u.key_id = k.id AND u.day = ?
     WHERE k.user_id = ? ORDER BY k.created_at DESC`
  ).bind(dayKey(), user.id).all();
  return json({ keys: results });
}
__name(handleListKeys, "handleListKeys");
__name2(handleListKeys, "handleListKeys");
__name22(handleListKeys, "handleListKeys");
__name222(handleListKeys, "handleListKeys");
__name2222(handleListKeys, "handleListKeys");
__name22222(handleListKeys, "handleListKeys");
__name222222(handleListKeys, "handleListKeys");
__name2222222(handleListKeys, "handleListKeys");
__name22222222(handleListKeys, "handleListKeys");
async function handleCreateKey(request, env, user) {
  const { name } = await request.json().catch(() => ({}));
  const cleanName = String(name || "").trim().slice(0, 40) || "Default key";
  if (!user.verified_at) {
    return json({ error: "Verify your email first - check your inbox for the 6-digit code", needs_verification: true }, 403);
  }
  const active = await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM api_keys WHERE user_id = ? AND revoked_at IS NULL"
  ).bind(user.id).first();
  if ((active?.n || 0) >= MAX_KEYS_PER_USER) {
    return json({ error: `You can have at most ${MAX_KEYS_PER_USER} active keys - revoke one first` }, 400);
  }
  const id = randomHex(16);
  const key = randomKey();
  const keyHash = await sha256hex(key);
  await env.DB.prepare(
    "INSERT INTO api_keys (id, user_id, name, prefix, key_hash, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(id, user.id, cleanName, key.slice(0, 12), keyHash, now()).run();
  return json({
    key,
    record: { id, name: cleanName, prefix: key.slice(0, 12), created_at: now() },
    note: "This is the only time the full key is shown. Store it somewhere safe."
  }, 201);
}
__name(handleCreateKey, "handleCreateKey");
__name2(handleCreateKey, "handleCreateKey");
__name22(handleCreateKey, "handleCreateKey");
__name222(handleCreateKey, "handleCreateKey");
__name2222(handleCreateKey, "handleCreateKey");
__name22222(handleCreateKey, "handleCreateKey");
__name222222(handleCreateKey, "handleCreateKey");
__name2222222(handleCreateKey, "handleCreateKey");
__name22222222(handleCreateKey, "handleCreateKey");
async function handleRevokeKey(env, user, keyId) {
  const res = await env.DB.prepare(
    "UPDATE api_keys SET revoked_at = ? WHERE id = ? AND user_id = ? AND revoked_at IS NULL"
  ).bind(now(), keyId, user.id).run();
  if (!res.meta.changes) return json({ error: "Key not found" }, 404);
  return json({ ok: true });
}
__name(handleRevokeKey, "handleRevokeKey");
__name2(handleRevokeKey, "handleRevokeKey");
__name22(handleRevokeKey, "handleRevokeKey");
__name222(handleRevokeKey, "handleRevokeKey");
__name2222(handleRevokeKey, "handleRevokeKey");
__name22222(handleRevokeKey, "handleRevokeKey");
__name222222(handleRevokeKey, "handleRevokeKey");
__name2222222(handleRevokeKey, "handleRevokeKey");
__name22222222(handleRevokeKey, "handleRevokeKey");
async function handleMyUsage(env, user, url) {
  let range = (url.searchParams.get("range") || "").toLowerCase();
  if (!range) {
    const days = Math.min(parseInt(url.searchParams.get("days") || "30", 10) || 30, 90);
    range = days <= 1 ? "24h" : days <= 7 ? "7d" : days >= 3650 ? "all" : "30d";
  }
  if (!["24h", "7d", "30d", "all"].includes(range)) range = "30d";
  let series, totals;
  if (range === "24h") {
    const since = new Date(Date.now() - 24 * 36e5).toISOString();
    const { results } = await env.DB.prepare(
      `SELECT substr(ts, 1, 13) AS bucket, COUNT(*) AS requests,
              SUM(CASE WHEN status >= 400 THEN 1 ELSE 0 END) AS errors,
              SUM(prompt_tokens) AS prompt_tokens, SUM(completion_tokens) AS completion_tokens
       FROM request_log WHERE user_id = ? AND ts >= ? GROUP BY bucket ORDER BY bucket`
    ).bind(user.id, since).all();
    series = results;
    totals = results.reduce((a, d) => ({
      requests: a.requests + d.requests,
      errors: a.errors + d.errors,
      prompt_tokens: a.prompt_tokens + d.prompt_tokens,
      completion_tokens: a.completion_tokens + d.completion_tokens
    }), { requests: 0, errors: 0, prompt_tokens: 0, completion_tokens: 0 });
  } else {
    const days = range === "7d" ? 7 : range === "30d" ? 30 : null;
    const since = days ? dayKey(new Date(Date.now() - days * 864e5)) : "0000-00-00";
    const { results } = await env.DB.prepare(
      `SELECT day AS bucket, SUM(requests) AS requests, SUM(errors) AS errors,
              SUM(prompt_tokens) AS prompt_tokens, SUM(completion_tokens) AS completion_tokens
       FROM usage_daily WHERE user_id = ? AND day >= ? GROUP BY day ORDER BY day`
    ).bind(user.id, since).all();
    series = results;
    totals = results.reduce((a, d) => ({
      requests: a.requests + d.requests,
      errors: a.errors + d.errors,
      prompt_tokens: a.prompt_tokens + (d.prompt_tokens || 0),
      completion_tokens: a.completion_tokens + (d.completion_tokens || 0)
    }), { requests: 0, errors: 0, prompt_tokens: 0, completion_tokens: 0 });
  }
  let byModel;
  if (range === "24h") {
    const since = new Date(Date.now() - 24 * 36e5).toISOString();
    byModel = (await env.DB.prepare(
      `SELECT model, COUNT(*) AS requests, SUM(prompt_tokens) AS prompt_tokens, SUM(completion_tokens) AS completion_tokens
       FROM request_log WHERE user_id = ? AND ts >= ? GROUP BY model ORDER BY requests DESC`
    ).bind(user.id, since).all()).results;
  } else {
    const days = range === "7d" ? 7 : range === "30d" ? 30 : null;
    const since = days ? dayKey(new Date(Date.now() - days * 864e5)) : "0000-00-00";
    byModel = (await env.DB.prepare(
      `SELECT model, SUM(requests) AS requests, SUM(prompt_tokens) AS prompt_tokens, SUM(completion_tokens) AS completion_tokens
       FROM usage_dims_daily WHERE user_id = ? AND day >= ? GROUP BY model ORDER BY requests DESC`
    ).bind(user.id, since).all()).results;
  }
  const sinceKey = range === "24h" ? dayKey() : range === "7d" ? dayKey(new Date(Date.now() - 7 * 864e5)) : range === "30d" ? dayKey(new Date(Date.now() - 30 * 864e5)) : "0000-00-00";
  const { results: byKey } = await env.DB.prepare(
    `SELECT u.key_id, k.name, k.prefix, SUM(u.requests) AS requests, SUM(u.errors) AS errors,
            SUM(u.prompt_tokens) AS prompt_tokens, SUM(u.completion_tokens) AS completion_tokens
     FROM usage_daily u LEFT JOIN api_keys k ON k.id = u.key_id
     WHERE u.user_id = ? AND u.day >= ? GROUP BY u.key_id`
  ).bind(user.id, sinceKey).all();
  return json({ range, totals, series, by_key: byKey, by_model: byModel });
}
__name(handleMyUsage, "handleMyUsage");
__name2(handleMyUsage, "handleMyUsage");
__name22(handleMyUsage, "handleMyUsage");
__name222(handleMyUsage, "handleMyUsage");
__name2222(handleMyUsage, "handleMyUsage");
__name22222(handleMyUsage, "handleMyUsage");
__name222222(handleMyUsage, "handleMyUsage");
__name2222222(handleMyUsage, "handleMyUsage");
__name22222222(handleMyUsage, "handleMyUsage");
async function guestIdFor(request, ip) {
  const ua = request.headers.get("User-Agent") || "unknown";
  const hash = await sha256hex(`lattice-guest|${ip}|${ua}`);
  return "guest-" + hash.slice(0, 10);
}
__name(guestIdFor, "guestIdFor");
__name2(guestIdFor, "guestIdFor");
__name22(guestIdFor, "guestIdFor");
__name222(guestIdFor, "guestIdFor");
__name2222(guestIdFor, "guestIdFor");
__name22222(guestIdFor, "guestIdFor");
__name222222(guestIdFor, "guestIdFor");
__name2222222(guestIdFor, "guestIdFor");
async function handleWebChat(request, env, user, ctx, ip) {
  const { message, history, model } = await request.json().catch(() => ({}));
  const text = String(message || "").trim();
  if (!text) return json({ error: "message is required" }, 400);
  if (text.length > 4e3) return json({ error: "message too long (4000 chars max)" }, 400);
  const modelId = model === "quark" ? "quark" : "spark";
  const hist = Array.isArray(history) ? history.slice(-12).map((m) => ({
    role: m && m.role === "assistant" ? "assistant" : "user",
    content: String(m && m.content || "").slice(0, 2e3)
  })) : [];
  if (user) {
    const allowed = await checkMinuteLimit(env, `web:${user.id}`, Math.ceil(WEB_CHAT_HOURLY_LIMIT / 60) + 2);
    if (!allowed) return json({ error: "Slow down a little - too many messages this minute" }, 429);
  } else {
    const minuteOk = await checkMinuteLimit(env, `gip:${ip}`, 2);
    if (!minuteOk) return json({ error: "Guest limit: 2 messages a minute - make a free account for way more", guest_limited: true }, 429);
    const hourKey = "h" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 13);
    const hourCount = await bumpWindow(env, `gip:${ip}:h`, hourKey);
    if (hourCount > 10) return json({ error: "Guest limit reached (10 messages/hour) - sign up free to keep chatting", guest_limited: true }, 429);
  }
  const guestId = user ? null : await guestIdFor(request, ip);
  const started = Date.now();
  let status = 200, reply = "", errMsg = null;
  try {
    const data = await callBackend(env, "/chat", { message: text, history: hist, model: modelId });
    reply = String(data.reply ?? data.response ?? "");
  } catch (e) {
    status = e.status && e.status < 600 ? e.status : 502;
    errMsg = e.name === "AbortError" ? "The model took too long - try again" : e.message || "Chat failed";
  }
  const wPromptTok = Math.ceil(text.length / 4), wCompTok = Math.ceil(reply.length / 4);
  ctx.waitUntil(recordUsage(env, {
    userId: user ? user.id : guestId,
    keyId: "",
    source: user ? "web" : "guest",
    model: modelId,
    status,
    latencyMs: Date.now() - started,
    promptChars: text.length,
    completionChars: reply.length,
    promptTokens: wPromptTok,
    completionTokens: wCompTok,
    error: errMsg
  }));
  if (errMsg) return json({ error: errMsg, warming: status === 502 }, status === 429 ? 429 : 502);
  return json({ reply, model: modelId });
}
__name(handleWebChat, "handleWebChat");
__name2(handleWebChat, "handleWebChat");
__name22(handleWebChat, "handleWebChat");
__name222(handleWebChat, "handleWebChat");
__name2222(handleWebChat, "handleWebChat");
__name22222(handleWebChat, "handleWebChat");
__name222222(handleWebChat, "handleWebChat");
__name2222222(handleWebChat, "handleWebChat");
__name22222222(handleWebChat, "handleWebChat");
var V1_MODELS = {
  "lattice-quark-1.5b": "quark",
  "lattice-spark-1.5b": "spark",
  quark: "quark",
  spark: "spark"
};
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  };
}
__name(corsHeaders, "corsHeaders");
__name2(corsHeaders, "corsHeaders");
__name22(corsHeaders, "corsHeaders");
__name222(corsHeaders, "corsHeaders");
__name2222(corsHeaders, "corsHeaders");
__name22222(corsHeaders, "corsHeaders");
__name222222(corsHeaders, "corsHeaders");
__name2222222(corsHeaders, "corsHeaders");
__name22222222(corsHeaders, "corsHeaders");
async function resolveApiKey(request, env) {
  const auth = request.headers.get("Authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (!m) return { error: json({ error: { message: "Missing API key. Send Authorization: Bearer <key>", type: "auth_error" } }, 401, corsHeaders()) };
  const key = m[1].trim();
  const keyHash = await sha256hex(key);
  const row = await env.DB.prepare(
    `SELECT k.*, u.banned_at AS user_banned, u.id AS uid FROM api_keys k
     JOIN users u ON u.id = k.user_id WHERE k.key_hash = ?`
  ).bind(keyHash).first();
  if (!row) return { error: json({ error: { message: "Invalid API key", type: "auth_error" } }, 401, corsHeaders()) };
  if (row.revoked_at) return { error: json({ error: { message: "This API key has been revoked", type: "auth_error" } }, 401, corsHeaders()) };
  if (row.user_banned) return { error: json({ error: { message: "This account is suspended", type: "auth_error" } }, 403, corsHeaders()) };
  return { keyRow: row };
}
__name(resolveApiKey, "resolveApiKey");
__name2(resolveApiKey, "resolveApiKey");
__name22(resolveApiKey, "resolveApiKey");
__name222(resolveApiKey, "resolveApiKey");
__name2222(resolveApiKey, "resolveApiKey");
__name22222(resolveApiKey, "resolveApiKey");
__name222222(resolveApiKey, "resolveApiKey");
__name2222222(resolveApiKey, "resolveApiKey");
__name22222222(resolveApiKey, "resolveApiKey");
async function handleV1Models(env) {
  return json({
    object: "list",
    data: [
      { id: "lattice-quark-1.5b", object: "model", owned_by: "lattice", description: "Quark 1.5B - pretrained + instruction tuned from scratch" },
      { id: "lattice-spark-1.5b", object: "model", owned_by: "lattice", description: "Spark 1.5B - Qwen2.5-1.5B identity fine-tune" }
    ]
  }, 200, corsHeaders());
}
__name(handleV1Models, "handleV1Models");
__name2(handleV1Models, "handleV1Models");
__name22(handleV1Models, "handleV1Models");
__name222(handleV1Models, "handleV1Models");
__name2222(handleV1Models, "handleV1Models");
__name22222(handleV1Models, "handleV1Models");
__name222222(handleV1Models, "handleV1Models");
__name2222222(handleV1Models, "handleV1Models");
__name22222222(handleV1Models, "handleV1Models");
async function handleV1Chat(request, env, ctx) {
  const auth = await resolveApiKey(request, env);
  if (auth.error) return auth.error;
  const keyRow = auth.keyRow;
  const body = await request.json().catch(() => null);
  if (!body) return json({ error: { message: "Invalid JSON body", type: "invalid_request_error" } }, 400, corsHeaders());
  const modelId = V1_MODELS[String(body.model || "").toLowerCase()] || "quark";
  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (!messages.length) return json({ error: { message: "messages is required", type: "invalid_request_error" } }, 400, corsHeaders());
  const minuteOk = await checkMinuteLimit(env, `acct:${keyRow.uid}`, API_ACCOUNT_RPM_LIMIT);
  if (!minuteOk) {
    return json({ error: { message: `Rate limit: ${API_ACCOUNT_RPM_LIMIT} requests/minute per account`, type: "rate_limit_error" } }, 429, corsHeaders());
  }
  const todayRow = await env.DB.prepare(
    "SELECT COALESCE(SUM(requests), 0) AS requests FROM usage_daily WHERE user_id = ? AND day = ?"
  ).bind(keyRow.uid, dayKey()).first();
  if ((todayRow?.requests || 0) >= API_ACCOUNT_DAILY_LIMIT) {
    return json({ error: { message: `Daily limit reached (${API_ACCOUNT_DAILY_LIMIT} requests/day per account)`, type: "rate_limit_error" } }, 429, corsHeaders());
  }
  let systemBits = [];
  const convo = [];
  for (const msg of messages) {
    const role = msg && msg.role;
    const content = String(msg && msg.content || "").slice(0, 4e3);
    if (role === "system") systemBits.push(content);
    else if (role === "assistant") convo.push({ role: "assistant", content });
    else convo.push({ role: "user", content });
  }
  let lastUser = null;
  while (convo.length) {
    const m = convo.pop();
    if (m.role === "user" && m.content.trim()) {
      lastUser = m.content;
      break;
    }
  }
  if (!lastUser) return json({ error: { message: "No user message supplied", type: "invalid_request_error" } }, 400, corsHeaders());
  const promptText = systemBits.length ? systemBits.join("\n\n") + "\n\n" + lastUser : lastUser;
  const hist = convo.slice(-12);
  const started = Date.now();
  let status = 200, reply = "", errMsg = null;
  try {
    const data = await callBackend(env, "/chat", { message: promptText, history: hist, model: modelId });
    reply = String(data.reply ?? data.response ?? "");
  } catch (e) {
    status = e.status && e.status < 600 ? e.status : 502;
    errMsg = e.name === "AbortError" ? "Upstream timeout" : e.message || "Chat failed";
  }
  const promptTok = Math.ceil(promptText.length / 4), compTok = Math.ceil(reply.length / 4);
  ctx.waitUntil(recordUsage(env, {
    userId: keyRow.uid,
    keyId: keyRow.id,
    source: "api",
    model: modelId,
    status,
    latencyMs: Date.now() - started,
    promptChars: promptText.length,
    completionChars: reply.length,
    promptTokens: promptTok,
    completionTokens: compTok,
    error: errMsg
  }));
  if (errMsg) {
    return json({ error: { message: errMsg, type: "upstream_error" } }, 502, corsHeaders());
  }
  const completionId = "chatcmpl-" + randomHex(12);
  const created = Math.floor(Date.now() / 1e3);
  const usage = {
    prompt_tokens: promptTok,
    completion_tokens: compTok,
    total_tokens: promptTok + compTok
  };
  if (body.stream) {
    const chunk = {
      id: completionId,
      object: "chat.completion.chunk",
      created,
      model: body.model || modelId,
      choices: [{ index: 0, delta: { role: "assistant", content: reply }, finish_reason: "stop" }]
    };
    const sse = `data: ${JSON.stringify(chunk)}

data: [DONE]

`;
    return new Response(sse, {
      status: 200,
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", ...corsHeaders() }
    });
  }
  return json({
    id: completionId,
    object: "chat.completion",
    created,
    model: body.model || modelId,
    choices: [{ index: 0, message: { role: "assistant", content: reply }, finish_reason: "stop" }],
    usage
  }, 200, corsHeaders());
}
__name(handleV1Chat, "handleV1Chat");
__name2(handleV1Chat, "handleV1Chat");
__name22(handleV1Chat, "handleV1Chat");
__name222(handleV1Chat, "handleV1Chat");
__name2222(handleV1Chat, "handleV1Chat");
__name22222(handleV1Chat, "handleV1Chat");
__name222222(handleV1Chat, "handleV1Chat");
__name2222222(handleV1Chat, "handleV1Chat");
__name22222222(handleV1Chat, "handleV1Chat");
async function handleAdminOverview(env, url) {
  const model = ["quark", "spark"].includes((url?.searchParams.get("model") || "").toLowerCase()) ? url.searchParams.get("model").toLowerCase() : "all";
  const range = ["7d", "30d", "all"].includes((url?.searchParams.get("range") || "").toLowerCase()) ? url.searchParams.get("range").toLowerCase() : "30d";
  const today = dayKey();
  const since = range === "7d" ? dayKey(new Date(Date.now() - 7 * 864e5)) : range === "30d" ? dayKey(new Date(Date.now() - 30 * 864e5)) : "0000-00-00";
  const filter = model === "all" ? "" : " AND model = ?";
  const bind = /* @__PURE__ */ __name2((stmt, ...args) => model === "all" ? stmt.bind(...args) : stmt.bind(...args, model), "bind");
  const totals = {};
  totals.users = (await env.DB.prepare("SELECT COUNT(*) n FROM users").first())?.n || 0;
  totals.keys_active = (await env.DB.prepare("SELECT COUNT(*) n FROM api_keys WHERE revoked_at IS NULL").first())?.n || 0;
  const todayRow = await bind(env.DB.prepare(`SELECT COALESCE(SUM(requests),0) req, COALESCE(SUM(errors),0) err, COALESCE(SUM(prompt_tokens),0) pin, COALESCE(SUM(completion_tokens),0) pout FROM usage_dims_daily WHERE day = ?${filter}`), today).first();
  const allRow = await bind(env.DB.prepare(`SELECT COALESCE(SUM(requests),0) req, COALESCE(SUM(errors),0) err, COALESCE(SUM(prompt_tokens),0) pin, COALESCE(SUM(completion_tokens),0) pout FROM usage_dims_daily WHERE day >= ?${filter}`), since).first();
  Object.assign(totals, { requests_today: todayRow?.req || 0, tokens_today: (todayRow?.pin || 0) + (todayRow?.pout || 0), requests_total: allRow?.req || 0, tokens_total: (allRow?.pin || 0) + (allRow?.pout || 0), input_tokens: allRow?.pin || 0, output_tokens: allRow?.pout || 0, errors: allRow?.err || 0 });
  totals.active_7d = (await bind(env.DB.prepare(`SELECT COUNT(DISTINCT user_id) n FROM usage_dims_daily WHERE day >= ? AND user_id != 'guest' AND user_id NOT LIKE 'guest-%'${filter}`), dayKey(new Date(Date.now() - 7 * 864e5))).first())?.n || 0;
  totals.guests_today = (await bind(env.DB.prepare(`SELECT COUNT(DISTINCT user_id) n FROM usage_dims_daily WHERE day = ? AND user_id LIKE 'guest-%'${filter}`), today).first())?.n || 0;
  totals.guests_range = (await bind(env.DB.prepare(`SELECT COUNT(DISTINCT user_id) n FROM usage_dims_daily WHERE day >= ? AND user_id LIKE 'guest-%'${filter}`), since).first())?.n || 0;
  const { results: series } = await bind(env.DB.prepare(`SELECT day, SUM(requests) requests, SUM(errors) errors, SUM(prompt_tokens) prompt_tokens, SUM(completion_tokens) completion_tokens FROM usage_dims_daily WHERE day >= ?${filter} GROUP BY day ORDER BY day`), since).all();
  const { results: signups } = await env.DB.prepare(`SELECT substr(created_at,1,10) day, COUNT(*) signups FROM users WHERE created_at >= ? GROUP BY day ORDER BY day`).bind(since).all();
  const { results: byModel } = await env.DB.prepare(`SELECT model, SUM(requests) requests, SUM(prompt_tokens)+SUM(completion_tokens) tokens FROM usage_dims_daily WHERE day >= ? GROUP BY model ORDER BY requests DESC`).bind(since).all();
  const { results: bySource } = await bind(env.DB.prepare(`SELECT source, SUM(requests) requests, SUM(prompt_tokens)+SUM(completion_tokens) tokens FROM usage_dims_daily WHERE day >= ?${filter} GROUP BY source ORDER BY requests DESC`), since).all();
  const { results: topUsers } = await bind(env.DB.prepare(`SELECT COALESCE(u.id, d.user_id) id, COALESCE(u.email, CASE WHEN d.user_id LIKE 'guest-%' THEN 'hashed IP + browser' ELSE 'Guest traffic' END) email, COALESCE(u.username, CASE WHEN d.user_id LIKE 'guest-%' THEN d.user_id ELSE 'Guests' END) username, u.banned_at, u.last_active_at, SUM(d.requests) requests, SUM(d.prompt_tokens)+SUM(d.completion_tokens) tokens FROM usage_dims_daily d LEFT JOIN users u ON u.id=d.user_id WHERE d.day >= ?${filter} GROUP BY d.user_id ORDER BY tokens DESC LIMIT 12`), since).all();
  const { results: guests } = await bind(env.DB.prepare(`SELECT d.user_id id, SUM(d.requests) requests, SUM(d.errors) errors, SUM(d.prompt_tokens)+SUM(d.completion_tokens) tokens, MIN(d.day) first_day, MAX(d.day) last_day FROM usage_dims_daily d WHERE d.day >= ? AND d.user_id LIKE 'guest-%'${filter} GROUP BY d.user_id ORDER BY tokens DESC LIMIT 100`), since).all();
  const { results: modelDaily } = await env.DB.prepare(`SELECT day, model, SUM(requests) requests, SUM(prompt_tokens)+SUM(completion_tokens) tokens FROM usage_dims_daily WHERE day >= ? GROUP BY day,model ORDER BY day`).bind(since).all();
  return json({ model, range, totals, series, signups, by_model: byModel, by_source: bySource, top_users: topUsers, guests, model_daily: modelDaily });
}
__name(handleAdminOverview, "handleAdminOverview");
__name2(handleAdminOverview, "handleAdminOverview");
__name22(handleAdminOverview, "handleAdminOverview");
__name222(handleAdminOverview, "handleAdminOverview");
__name2222(handleAdminOverview, "handleAdminOverview");
__name22222(handleAdminOverview, "handleAdminOverview");
__name222222(handleAdminOverview, "handleAdminOverview");
__name2222222(handleAdminOverview, "handleAdminOverview");
__name22222222(handleAdminOverview, "handleAdminOverview");
async function handleAdminUsers(env) {
  const since = dayKey(new Date(Date.now() - 30 * 864e5));
  const { results } = await env.DB.prepare(
    `SELECT u.id, u.email, u.username, u.is_admin, u.banned_at, u.created_at, u.last_active_at,
            (SELECT COUNT(*) FROM api_keys k WHERE k.user_id = u.id AND k.revoked_at IS NULL) AS active_keys,
            COALESCE((SELECT SUM(d.requests) FROM usage_daily d WHERE d.user_id = u.id AND d.day >= ?), 0) AS requests_30d,
            COALESCE((SELECT SUM(d.prompt_tokens) + SUM(d.completion_tokens) FROM usage_daily d WHERE d.user_id = u.id AND d.day >= ?), 0) AS tokens_30d,
            COALESCE((SELECT SUM(d.requests) FROM usage_daily d WHERE d.user_id = u.id), 0) AS requests_total
     FROM users u ORDER BY u.created_at DESC LIMIT 500`
  ).bind(since, since).all();
  return json({ users: results });
}
__name(handleAdminUsers, "handleAdminUsers");
__name2(handleAdminUsers, "handleAdminUsers");
__name22(handleAdminUsers, "handleAdminUsers");
__name222(handleAdminUsers, "handleAdminUsers");
__name2222(handleAdminUsers, "handleAdminUsers");
__name22222(handleAdminUsers, "handleAdminUsers");
__name222222(handleAdminUsers, "handleAdminUsers");
__name2222222(handleAdminUsers, "handleAdminUsers");
__name22222222(handleAdminUsers, "handleAdminUsers");
async function handleAdminUserDetail(env, userId) {
  const user = await env.DB.prepare(
    "SELECT id, email, username, is_admin, banned_at, created_at, last_active_at FROM users WHERE id = ?"
  ).bind(userId).first();
  if (!user) return json({ error: "User not found" }, 404);
  const { results: keys } = await env.DB.prepare(
    `SELECT id, name, prefix, rpm_limit, daily_limit, created_at, last_used_at, revoked_at
     FROM api_keys WHERE user_id = ? ORDER BY created_at DESC`
  ).bind(userId).all();
  const since = dayKey(new Date(Date.now() - 30 * 864e5));
  const { results: daily } = await env.DB.prepare(
    `SELECT day, SUM(requests) AS requests, SUM(errors) AS errors,
            SUM(prompt_tokens) AS prompt_tokens, SUM(completion_tokens) AS completion_tokens
     FROM usage_daily
     WHERE user_id = ? AND day >= ? GROUP BY day ORDER BY day`
  ).bind(userId, since).all();
  const { results: recent } = await env.DB.prepare(
    `SELECT ts, source, model, status, latency_ms, prompt_chars, completion_chars, error
     FROM request_log WHERE user_id = ? ORDER BY ts DESC LIMIT 50`
  ).bind(userId).all();
  const { results: dimensions } = await env.DB.prepare(
    `SELECT day, model, source, SUM(requests) AS requests, SUM(errors) AS errors,
            SUM(prompt_tokens) AS prompt_tokens, SUM(completion_tokens) AS completion_tokens
     FROM usage_dims_daily WHERE user_id = ? AND day >= ? GROUP BY day, model, source ORDER BY day`
  ).bind(userId, since).all();
  return json({ user, keys, daily, dimensions, recent });
}
__name(handleAdminUserDetail, "handleAdminUserDetail");
__name2(handleAdminUserDetail, "handleAdminUserDetail");
__name22(handleAdminUserDetail, "handleAdminUserDetail");
__name222(handleAdminUserDetail, "handleAdminUserDetail");
__name2222(handleAdminUserDetail, "handleAdminUserDetail");
__name22222(handleAdminUserDetail, "handleAdminUserDetail");
__name222222(handleAdminUserDetail, "handleAdminUserDetail");
__name2222222(handleAdminUserDetail, "handleAdminUserDetail");
__name22222222(handleAdminUserDetail, "handleAdminUserDetail");
async function handleAdminBan(env, admin, userId, request) {
  const { banned } = await request.json().catch(() => ({}));
  if (userId === admin.id) return json({ error: "You can't ban yourself" }, 400);
  const target = await env.DB.prepare("SELECT is_admin FROM users WHERE id = ?").bind(userId).first();
  if (!target) return json({ error: "User not found" }, 404);
  if (target.is_admin) return json({ error: "Can't ban an admin" }, 400);
  await env.DB.prepare("UPDATE users SET banned_at = ? WHERE id = ?").bind(banned ? now() : null, userId).run();
  if (banned) {
    await env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(userId).run();
  }
  return json({ ok: true, banned: !!banned });
}
__name(handleAdminBan, "handleAdminBan");
__name2(handleAdminBan, "handleAdminBan");
__name22(handleAdminBan, "handleAdminBan");
__name222(handleAdminBan, "handleAdminBan");
__name2222(handleAdminBan, "handleAdminBan");
__name22222(handleAdminBan, "handleAdminBan");
__name222222(handleAdminBan, "handleAdminBan");
__name2222222(handleAdminBan, "handleAdminBan");
__name22222222(handleAdminBan, "handleAdminBan");
async function handleAdminKeyRevoke(env, keyId, request) {
  const { revoked } = await request.json().catch(() => ({}));
  const res = await env.DB.prepare("UPDATE api_keys SET revoked_at = ? WHERE id = ?").bind(revoked === false ? null : now(), keyId).run();
  if (!res.meta.changes) return json({ error: "Key not found" }, 404);
  return json({ ok: true });
}
__name(handleAdminKeyRevoke, "handleAdminKeyRevoke");
__name2(handleAdminKeyRevoke, "handleAdminKeyRevoke");
__name22(handleAdminKeyRevoke, "handleAdminKeyRevoke");
__name222(handleAdminKeyRevoke, "handleAdminKeyRevoke");
__name2222(handleAdminKeyRevoke, "handleAdminKeyRevoke");
__name22222(handleAdminKeyRevoke, "handleAdminKeyRevoke");
__name222222(handleAdminKeyRevoke, "handleAdminKeyRevoke");
__name2222222(handleAdminKeyRevoke, "handleAdminKeyRevoke");
__name22222222(handleAdminKeyRevoke, "handleAdminKeyRevoke");
async function handleAdminRequests(env) {
  const { results } = await env.DB.prepare(
    `SELECT r.ts, r.source, r.model, r.status, r.latency_ms, r.prompt_chars, r.completion_chars, r.error,
            u.email, u.username
     FROM request_log r LEFT JOIN users u ON u.id = r.user_id
     ORDER BY r.ts DESC LIMIT 100`
  ).all();
  return json({ requests: results });
}
__name(handleAdminRequests, "handleAdminRequests");
__name2(handleAdminRequests, "handleAdminRequests");
__name22(handleAdminRequests, "handleAdminRequests");
__name222(handleAdminRequests, "handleAdminRequests");
__name2222(handleAdminRequests, "handleAdminRequests");
__name22222(handleAdminRequests, "handleAdminRequests");
__name222222(handleAdminRequests, "handleAdminRequests");
__name2222222(handleAdminRequests, "handleAdminRequests");
__name22222222(handleAdminRequests, "handleAdminRequests");
async function handleStatus(env) {
  try {
    const data = await callBackend(env, "/health", null, { method: "GET", timeoutMs: 8e3 });
    return json({ ok: true, backend: data });
  } catch (e) {
    return json({ ok: false, error: "Models are warming up or offline" }, 200);
  }
}
__name(handleStatus, "handleStatus");
__name2(handleStatus, "handleStatus");
__name22(handleStatus, "handleStatus");
__name222(handleStatus, "handleStatus");
__name2222(handleStatus, "handleStatus");
__name22222(handleStatus, "handleStatus");
__name222222(handleStatus, "handleStatus");
__name2222222(handleStatus, "handleStatus");
__name22222222(handleStatus, "handleStatus");
async function handleApi(request, env, ctx, url) {
  const path = url.pathname;
  const method = request.method;
  if (path.startsWith("/v1/")) {
    if (method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders() });
    if (path === "/v1/models" && method === "GET") return handleV1Models(env);
    if (path === "/v1/chat/completions" && method === "POST") return handleV1Chat(request, env, ctx);
    return json({ error: { message: "Not found", type: "invalid_request_error" } }, 404, corsHeaders());
  }
  if (path === "/api/status" && method === "GET") return handleStatus(env);
  if (path === "/api/auth/signup" && method === "POST") return handleSignup(request, env);
  if (path === "/api/auth/login" && method === "POST") return handleLogin(request, env);
  if (path === "/api/auth/logout" && method === "POST") return handleLogout(request, env);
  if (path === "/api/auth/me" && method === "GET") return handleMe(request, env);
  if (path === "/api/auth/clerk" && method === "POST") return handleClerkAuth(request, env);
  if (path.startsWith("/api/admin/")) {
    const admin = await requireAdmin(request, env);
    if (path === "/api/admin/overview" && method === "GET") return handleAdminOverview(env, url);
    if (path === "/api/admin/users" && method === "GET") return handleAdminUsers(env);
    let m = path.match(/^\/api\/admin\/users\/([a-f0-9]+)$/);
    if (m && method === "GET") return handleAdminUserDetail(env, m[1]);
    m = path.match(/^\/api\/admin\/users\/([a-f0-9]+)\/ban$/);
    if (m && method === "POST") return handleAdminBan(env, admin, m[1], request);
    m = path.match(/^\/api\/admin\/keys\/([a-f0-9]+)\/revoke$/);
    if (m && method === "POST") return handleAdminKeyRevoke(env, m[1], request);
    if (path === "/api/admin/requests" && method === "GET") return handleAdminRequests(env);
    return json({ error: "Not found" }, 404);
  }
  if (path === "/api/chat" && method === "POST") {
    const guestUser = await getSessionUser(request, env);
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (guestUser) ctx.waitUntil(touchUser(env, guestUser.id));
    return handleWebChat(request, env, guestUser, ctx, ip);
  }
  const user = await requireUser(request, env);
  ctx.waitUntil(touchUser(env, user.id));
  if (path === "/api/keys" && method === "GET") return handleListKeys(env, user);
  if (path === "/api/auth/verify" && method === "POST") return handleVerifyEmail(request, env, user);
  if (path === "/api/auth/resend-code" && method === "POST") return handleResendCode(env, user);
  if (path === "/api/keys" && method === "POST") return handleCreateKey(request, env, user);
  const km = path.match(/^\/api\/keys\/([a-f0-9]+)\/revoke$/);
  if (km && method === "POST") return handleRevokeKey(env, user, km[1]);
  if (path === "/api/usage" && method === "GET") return handleMyUsage(env, user, url);
  return json({ error: "Not found" }, 404);
}
__name(handleApi, "handleApi");
__name2(handleApi, "handleApi");
__name22(handleApi, "handleApi");
__name222(handleApi, "handleApi");
__name2222(handleApi, "handleApi");
__name22222(handleApi, "handleApi");
__name222222(handleApi, "handleApi");
__name2222222(handleApi, "handleApi");
__name22222222(handleApi, "handleApi");
var AUTH_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign in - Lattice</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="icon" type="image/png" href="/assets/favicon.png" />
  <link rel="stylesheet" href="/app.css" />
  <script src="/app.js"><\/script>
  <script defer crossorigin="anonymous"
    data-clerk-publishable-key="pk_live_Y2xlcmsubWViYm8uY2xvdWQk"
    src="https://clerk.mebbo.cloud/npm/@clerk/clerk-js@5/dist/clerk.browser.js"><\/script>
</head>
<body>
  <script>document.write(Lat.header());<\/script>
  <main style="display:flex;justify-content:center;align-items:flex-start;padding-top:2rem">
    <div class="card" style="width:100%;max-width:420px">
      <h2 style="margin:0 0 0.3rem;font-size:1.3rem" id="form-title">Welcome back</h2>
      <p class="dim" style="margin:0 0 1.4rem;font-size:0.9rem" id="form-sub">Sign in to your Lattice account.</p>
      <div id="clerk-mount" style="min-height:320px;display:flex;align-items:center;justify-content:center">
        <p class="dim" id="clerk-loading">Loading sign-in\u2026</p>
      </div>
      <p class="form-note" id="auth-switch"></p>
    </div>
  </main>
  <script>document.write(Lat.footer());<\/script>
  <script>
    const mount = document.getElementById("clerk-mount");
    const title = document.getElementById("form-title");
    const sub = document.getElementById("form-sub");
    const switchEl = document.getElementById("auth-switch");
    const params = new URLSearchParams(location.search);
    const next = params.get("next") || "/dashboard";
    let mode = params.get("mode") === "signup" ? "signup" : "login";
    let exchanging = false;

    const appearance = {
      variables: {
        colorBackground: "#12121a",
        colorText: "#e8e8ed",
        colorTextSecondary: "#8b8b9e",
        colorPrimary: "#6366f1",
        colorInputBackground: "#171724",
        colorInputText: "#e8e8ed",
        colorNeutral: "#e8e8ed",
        colorDanger: "#f87171",
        borderRadius: "12px",
        fontFamily: "Inter, sans-serif",
      },
      elements: {
        card: { boxShadow: "none", border: "1px solid #1f1f2e", background: "transparent" },
        footer: { display: "none" },
      },
    };

    function setMode(m) {
      mode = m;
      title.textContent = m === "login" ? "Welcome back" : "Create your account";
      sub.textContent = m === "login" ? "Sign in to your Lattice account." : "Free forever. Keys, chat history, higher limits.";
      switchEl.innerHTML = m === "login"
        ? 'Don\\'t have an account? <a href="/auth?mode=signup">Create one</a>'
        : 'Already have an account? <a href="/auth">Sign in</a>';
      renderClerk();
    }

    function renderClerk() {
      if (!window.Clerk || !Clerk.loaded) return;
      mount.innerHTML = "";
      const el = document.createElement("div");
      mount.appendChild(el);
      if (mode === "login") {
        Clerk.mountSignIn(el, { appearance, fallbackRedirectUrl: location.origin + "/auth", signUpUrl: "/auth?mode=signup" });
      } else {
        Clerk.mountSignUp(el, { appearance, fallbackRedirectUrl: location.origin + "/auth", signInUrl: "/auth" });
      }
    }

    async function exchange(session) {
      if (exchanging) return;
      exchanging = true;
      try {
        const token = await session.getToken();
        const res = await fetch("/api/auth/clerk", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) { Lat.toast(data.error || "Sign-in failed", true); exchanging = false; return; }
        location.href = next;
      } catch (e) {
        Lat.toast("Sign-in failed", true);
        exchanging = false;
      }
    }

    async function startAuth() {
      const loading = document.getElementById("clerk-loading");
      try {
        const me = await Promise.race([Lat.me(), new Promise((resolve) => setTimeout(() => resolve(null), 2500))]);
        if (me) { location.replace(next); return; }
        if (!window.Clerk) throw new Error("auth library unavailable");
        await Promise.race([Clerk.load(), new Promise((_, reject) => setTimeout(() => reject(new Error("auth timed out")), 12000))]);
        setMode(mode);
        if (Clerk.session) { exchange(Clerk.session); return; }
        Clerk.addListener(({ session }) => { if (session) exchange(session); });
      } catch (e) {
        loading.textContent = "Sign-in couldn't load.";
        const retry = document.createElement("button");
        retry.className = "btn btn-primary";
        retry.textContent = "Try again";
        retry.onclick = () => location.reload();
        mount.appendChild(retry);
      }
    }
    if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", startAuth, { once: true });
    else startAuth();
  <\/script>
</body>
</html>
`;
var worker_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    try {
      if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/v1/")) {
        return await handleApi(request, env, ctx, url);
      }
      if ((url.pathname === "/auth" || url.pathname === "/auth/") && request.method === "GET") {
        const next = url.searchParams.get("next");
        const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
        const clearCookies = [];
        let user = null;
        try {
          user = await getSessionUser(request, env);
        } catch (e) {
          user = null;
        }
        if (user) return Response.redirect(new URL(safeNext, url.origin).toString(), 302);
        if (getCookie(request, SESSION_COOKIE)) {
          clearCookies.push(`${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
        }
        const clerkToken = getCookie(request, "__session") || getCookie(request, "__session_NoYrhTCV");
        if (clerkToken) {
          try {
            const exchangeRequest = new Request(request.url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: clerkToken })
            });
            const exchange = await handleClerkAuth(exchangeRequest, env);
            if (exchange.ok) {
              const headers = new Headers({ Location: new URL(safeNext, url.origin).toString() });
              const setCookie = exchange.headers.get("Set-Cookie");
              if (setCookie) headers.set("Set-Cookie", setCookie);
              headers.set("Cache-Control", "no-store");
              return new Response(null, { status: 302, headers });
            }
          } catch (e) {
            if (e && e.status === 401) {
              clearCookies.push("__session=; Path=/; Secure; SameSite=Lax; Max-Age=0");
              clearCookies.push("__session_NoYrhTCV=; Path=/; Secure; SameSite=Lax; Max-Age=0");
            }
          }
        }
        const formHeaders = new Headers({
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "Pragma": "no-cache"
        });
        for (const c of clearCookies) formHeaders.append("Set-Cookie", c);
        return new Response(AUTH_HTML, { headers: formHeaders });
      }
      const asset = await env.ASSETS.fetch(request);
      const type = asset.headers.get("Content-Type") || "";
      const isHtml = type.includes("text/html");
      const isCode = type.includes("text/css") || type.includes("javascript");
      if (request.method === "GET" && (isHtml || isCode)) {
        const headers = new Headers(asset.headers);
        headers.set("Cache-Control", isHtml ? "no-store, no-cache, must-revalidate" : "no-cache");
        if (isHtml) headers.set("Pragma", "no-cache");
        return new Response(asset.body, { status: asset.status, statusText: asset.statusText, headers });
      }
      return asset;
    } catch (e) {
      const status = e.status || 500;
      return json({ error: status === 500 ? "Something broke on our side" : e.message }, status);
    }
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map