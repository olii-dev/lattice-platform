/* Lattice platform - shared helpers */
window.Lat = (() => {
  async function api(path, { method = "GET", body } = {}) {
    const res = await fetch(path, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "same-origin",
    });
    let data = {};
    try { data = await res.json(); } catch (e) { /* empty */ }
    if (!res.ok) {
      const msg = data.error && data.error.message ? data.error.message : (data.error || `Request failed (${res.status})`);
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return data;
  }

  async function me() {
    try { return (await api("/api/auth/me")).user; } catch (e) { return null; }
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function toast(msg) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }

  function fmtNum(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "k";
    return String(n == null ? 0 : n);
  }

  function fmtTime(iso) {
    if (!iso) return "-";
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    if (diff < 60e3) return "just now";
    if (diff < 3600e3) return Math.floor(diff / 60e3) + "m ago";
    if (diff < 86400e3) return Math.floor(diff / 3600e3) + "h ago";
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  /* SVG bar chart.
     data = [{bucket|day, requests, errors, ...}]; options control fill + metric. */
  function barChart(el, data, { height = 140, color = "#6366f1", valueKey = "requests", buckets = 30, bucketKind = "day", label = "requests" } = {}) {
    if (!el) return;
    const byKey = {};
    (data || []).forEach((d) => { byKey[d.bucket || d.day] = d; });
    const keys = [];
    for (let i = buckets - 1; i >= 0; i--) {
      keys.push(new Date(Date.now() - i * (bucketKind === "hour" ? 3600e3 : 86400e3)).toISOString().slice(0, bucketKind === "hour" ? 13 : 10));
    }
    const rows = keys.map((k) => ({ key: k, value: (byKey[k] && byKey[k][valueKey]) || 0, errors: (byKey[k] && byKey[k].errors) || 0 }));
    const max = Math.max(1, ...rows.map((d) => d.value));
    const w = el.clientWidth || 600;
    const bw = Math.max(2, Math.floor(w / rows.length) - 3);
    const gap = (w - bw * rows.length) / (rows.length + 1);
    const fmtKey = (k) => bucketKind === "hour" ? k.slice(11) + ":00" : k.slice(5);
    let bars = "";
    rows.forEach((d, i) => {
      const h = Math.max(d.value ? 3 : 1, (d.value / max) * (height - 24));
      const x = gap + i * (bw + gap);
      const y = height - h;
      bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" rx="2" fill="${d.errors > d.value / 2 && d.value ? "#f87171" : color}" opacity="${d.value ? 0.9 : 0.25}"><title>${fmtKey(d.key)}: ${fmtNum(d.value)} ${label}${d.errors ? ", " + d.errors + " errors" : ""}</title></rect>`;
    });
    el.innerHTML = `<svg width="100%" height="${height}" viewBox="0 0 ${w} ${height}" preserveAspectRatio="none" style="display:block">${bars}</svg>
      <div style="display:flex;justify-content:space-between;font-size:0.7rem;color:var(--muted);margin-top:0.25rem">
        <span>${fmtKey(rows[0].key)}</span><span>${label}</span><span>${fmtKey(rows[rows.length - 1].key)}</span>
      </div>`;
  }

  /* horizontal split bars: data = [{name, value, color}] */
  function splitBars(el, data, { unit = "" } = {}) {
    if (!el) return;
    const total = data.reduce((a, d) => a + d.value, 0) || 1;
    el.innerHTML = data.map((d) => {
      const pct = Math.round((d.value / total) * 100);
      return `<div style="margin-bottom:0.8rem">
        <div style="display:flex;justify-content:space-between;font-size:0.82rem;margin-bottom:0.3rem">
          <span>${esc(d.name)}</span><span class="dim">${fmtNum(d.value)}${unit} · ${pct}%</span>
        </div>
        <div style="height:8px;background:var(--bg-elev);border-radius:99px;overflow:hidden">
          <div style="height:100%;width:${Math.max(pct, d.value ? 2 : 0)}%;background:${d.color || "var(--accent)"};border-radius:99px"></div>
        </div>
      </div>`;
    }).join("") || `<p class="dim" style="margin:0;font-size:0.85rem">No data yet.</p>`;
  }

  /* range pill selector; onPick(range) */
  function rangePicker(el, current, onPick) {
    if (!el) return;
    const ranges = [["24h", "24h"], ["7d", "7 days"], ["30d", "30 days"], ["all", "All time"]];
    el.innerHTML = ranges.map(([r, l]) =>
      `<button class="btn btn-sm ${r === current ? "btn-primary" : "btn-ghost"}" data-range="${r}">${l}</button>`
    ).join("");
    el.style.cssText = "display:flex;gap:0.4rem;flex-wrap:wrap";
    el.querySelectorAll("[data-range]").forEach((b) => b.onclick = () => onPick(b.dataset.range));
  }

  async function renderNav(active) {
    const user = await me();
    const nav = document.getElementById("nav");
    if (!nav) return user;
    let html = `<a href="/chat">Chat</a><a href="/docs">Docs</a><a href="/blog/">Blog</a><a href="/benchmarks/">Benchmarks</a>`;
    if (user && user.is_admin) html += `<a href="/admin">Admin</a>`;
    if (user) html += `<a class="nav-cta profile-link" href="/profile" title="${esc(user.email)}">Profile</a>`;
    else html += `<a href="/auth">Sign in</a><a class="nav-cta" href="/auth?mode=signup">Get a key</a>`;
    nav.innerHTML = html;
    return user;
  }

  function header(active) {
    return `<header class="header">
      <a href="/" class="logo"><img src="/assets/logo.png" alt="Lattice logo" />Lattice</a>
      <nav class="nav" id="nav"></nav>
    </header>`;
  }

  function footer() {
    return `<footer class="footer">
      <a href="/faq">FAQ</a> · <a href="/contact">Contact</a> · <a href="https://ko-fi.com/latticeai" target="_blank" rel="noopener">Fund the next model</a> ·
      Built by <a href="https://github.com/olii-dev" target="_blank" rel="noopener">oli</a> ·
      <a href="https://huggingface.co/lattice-research" target="_blank" rel="noopener">Hugging Face</a> ·
      <a href="https://github.com/olii-dev/lattice-site" target="_blank" rel="noopener">GitHub</a>
    </footer>`;
  }

  return { api, me, esc, toast, fmtNum, fmtTime, barChart, splitBars, rangePicker, renderNav, header, footer };
})();
